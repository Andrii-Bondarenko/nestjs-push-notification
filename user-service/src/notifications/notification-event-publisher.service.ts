// notification-event-publisher.service.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationEventPublisher {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  async publish(
    type: 'push',
    payload: any,
    delayOverride?: number,
  ) {
    const exchange = this.configService.get<string>('RABBITMQ_EXCHANGE_NAME', 'notification.exchange');
    const routingKey = this.configService.get<string>('RABBITMQ_RESOURCE_KEY', 'notification.push');
    const delay = delayOverride ?? this.configService.get<number>('NOTIFICATION_DELAY', 1000 * 60 * 60 * 12);

    await this.amqpConnection.publish(
      exchange,
      routingKey,
      { type, payload },
      { headers: { 'x-delay': delay } },
    );
  }
}
