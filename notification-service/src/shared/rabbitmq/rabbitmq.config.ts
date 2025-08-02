function getRabbitMQConfig() {
  return {
    exchange: process.env.RABBITMQ_EXCHANGE_NAME || 'notification.exchange',
    routingKey: process.env.RABBITMQ_RESOURCE_KEY || 'notification.push',
    queue: process.env.RABBITMQ_RESOURCE_KEY || 'notification.push',
  };
}

export const RABBITMQ_SETTINGS = getRabbitMQConfig();