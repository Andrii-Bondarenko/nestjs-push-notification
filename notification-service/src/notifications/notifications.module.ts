import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationHandler } from './notification.handler';
import { PushChannel } from './channels/push.channel';
import { RabbitMQClientModule } from '../shared/rabbitmq/rabbitmq.module';
import { MessageTemplateResolver } from './templates/message-template-resolver';
import { UserRegisteredTemplate } from './templates/user-registered.template';
import { PushService } from './services/push.service';

@Module({
  imports: [RabbitMQClientModule],
  providers: [
    NotificationService,
    NotificationHandler,
    PushChannel,
    PushService,
    UserRegisteredTemplate,
    {
      provide: 'CHANNELS',
      useFactory: (push: PushChannel) => {
        return [push];
      },
      inject: [PushChannel],
    },
    {
      provide: MessageTemplateResolver,
      useFactory: (
        userRegistered: UserRegisteredTemplate,
      ) => {
        return new MessageTemplateResolver([
          userRegistered,
        ]);
      },
      inject: [UserRegisteredTemplate],
    },
  ],
})
export class NotificationModule {}