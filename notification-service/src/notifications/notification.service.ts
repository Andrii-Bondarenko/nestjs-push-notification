import { Injectable, Inject, Logger } from '@nestjs/common';
import { NotificationChannel } from './channels/notification-channel.interface';
import { NotificationEventDto } from './dto/notification-event.dto';

@Injectable()
export class NotificationService {
   private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject('CHANNELS') private readonly channels: NotificationChannel[],
  ) {}

  async handleEvent(event: NotificationEventDto) {
    const channel = this.channels.find((ch) => ch.supports(event.type));
    if (!channel) throw new Error(`No channel for type: ${event.type}`);
    
    this.logger.log(`Sending ${event.type} notification: ${JSON.stringify(event.payload)}`);
    await channel.send(event.payload);
  
  }
}