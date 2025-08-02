import { Module } from '@nestjs/common';
import { NotificationModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NotificationModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
  ],
})

export class AppModule {}
