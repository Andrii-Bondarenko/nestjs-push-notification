import { NotificationService } from './notification.service';
import { NotificationEventDto } from './dto/notification-event.dto';
import { RABBITMQ_SETTINGS } from 'src/shared/rabbitmq/rabbitmq.config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class NotificationHandler {
  constructor(private readonly notificationService: NotificationService) {}

  @RabbitSubscribe({
    exchange: RABBITMQ_SETTINGS.exchange,
    routingKey: RABBITMQ_SETTINGS.routingKey,
    queue: RABBITMQ_SETTINGS.queue,
  })
  async onNotification(data: NotificationEventDto) {
    await this.notificationService.handleEvent(data);
  }
}