import { Module } from '@nestjs/common';
import { RABBITMQ_SETTINGS } from 'src/shared/rabbitmq/rabbitmq.config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('RABBITMQ_USERNAME');
        const password = configService.get<string>('RABBITMQ_PASSWORD');
        const host = configService.get<string>('RABBITMQ_HOST');
        const port = configService.get<string>('RABBITMQ_PORT'); 
        const uri = `amqp://${username}:${password}@${host}:${port}`;
        const exchangeName = configService.get<string>('RABBITMQ_EXCHANGE_NAME', 'notification.exchange');
        const resourseKey = configService.get<string>('RABBITMQ_RESOURCE_KEY', 'notification.push');

        return {
          connectionInitOptions: {
            wait: false
          },
          uri,
          exchanges: [
            {
              name: exchangeName,              
              type: 'x-delayed-message',
              durable: true,
              options: {
                arguments: {
                  'x-delayed-type': 'direct',
                },
              },
            },
          ],
          queues: [
            {
              name: resourseKey,
              routingKey: resourseKey,
              exchange: exchangeName,
              createQueueIfNotExists: true,
              queueOptions: {
                durable: true,
              },
            },
          ],
        };
      },
    })  
  ],
  exports: [RabbitMQModule]
})

export class RabbitMQClientModule {}