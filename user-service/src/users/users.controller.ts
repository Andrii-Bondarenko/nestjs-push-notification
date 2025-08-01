import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RoutingKey } from '../shared/rabbitmg/rabbitmq.common';
import  { ConfigService } from "@nestjs/config"

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    await this.amqpConnection.publish(
      this.configService.get<string>('RABBITMQ_EXCHANGE_NAME', 'users'),
      RoutingKey.CREATED_USER_NOTIFICATION,
      user,
      { 
        headers: { 
          'x-delay': this.configService.get<number>('NOTIFICATION_DELAY', 1000 * 60 * 60 * 12) 
        }
      },
    );

    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
