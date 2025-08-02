import { Injectable } from '@nestjs/common';
import { TemplateStrategy } from './template-resolver.interface';

@Injectable()
export class MessageTemplateResolver {
  constructor(private readonly strategies: TemplateStrategy[]) {}

  resolve(event: string, data: any): { title: string; body: string } {
    const strategy = this.strategies.find((s) => s.supports(event));
    if (!strategy) {
      throw new Error(`No template found for event: ${event}`);
    }
    return strategy.resolve(data);
  }
}