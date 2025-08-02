import { Module } from '@nestjs/common';
import { RabbitMQClientModule } from '../shared/rabbitmg/rabbitmg.module';
import { NotificationEventPublisher } from './notification-event-publisher.service';

@Module({
  imports: [RabbitMQClientModule],
  providers: [NotificationEventPublisher],
  exports: [NotificationEventPublisher],
})
export class NotificationProducerModule {}