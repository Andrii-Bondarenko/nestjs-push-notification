import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoutingKey } from './rabbitmq.common';

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
        const exchangeName = configService.get<string>('RABBITMQ_EXCHANGE_NAME', 'users');

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
              name: RoutingKey.CREATED_USER_NOTIFICATION,
              routingKey: RoutingKey.CREATED_USER_NOTIFICATION,
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
  exports: [RabbitMQModule],
})

export class RabbitMQClientModule {}