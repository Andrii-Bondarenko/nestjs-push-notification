import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RabbitMQClientModule } from '../shared/rabbitmg/rabbitmg.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RabbitMQClientModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
