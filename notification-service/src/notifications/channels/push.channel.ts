import { Injectable } from '@nestjs/common';
import { NotificationChannel } from './notification-channel.interface';
import { MessageTemplateResolver } from '../templates/message-template-resolver';
import { PushService } from '../services/push.service';

@Injectable()
export class PushChannel implements NotificationChannel {
  constructor(
    private readonly pushService: PushService,
    private readonly templateResolver: MessageTemplateResolver,
  ) {}

  supports(type: string): boolean {
    return type === 'push';
  }

  async send(payload: any): Promise<void> {
   const { userId, event, data } = payload;

    const message = this.templateResolver.resolve(event, data);
  
    await this.pushService.send(userId, message.title, message.body);;
  }
}