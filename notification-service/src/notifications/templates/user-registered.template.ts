import { TemplateStrategy } from './template-resolver.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRegisteredTemplate implements TemplateStrategy {
  supports(event: string): boolean {
    return event === 'USER_REGISTERED';
  }

  resolve(data: any): { title: string; body: string } {
    return {
      title: 'Welcome!',
      body: `Hi ${data.userName}, thanks for signing up.`,
    };
  }
}