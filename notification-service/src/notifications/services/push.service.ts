import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);
  private readonly webhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.webhookUrl = this.configService.get<string>('PUSH_WEBHOOK_URL', 'https://webhook.site');
  }

  async send(userId: string, title: string, body: string): Promise<void> {
    const payload = {
      userId,
      title,
      body,
      sentAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(this.webhookUrl, payload);
      this.logger.log(`Push notification sent for user ${userId}: status ${response.status}`, payload);
    } catch (error) {
      this.logger.error(`Failed to send push notification for user ${userId}`, payload);
    }
  }
}