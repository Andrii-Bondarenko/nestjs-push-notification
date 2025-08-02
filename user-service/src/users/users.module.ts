import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { NotificationProducerModule } from 'src/notifications/notification-event-publisher.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotificationProducerModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
