FROM rabbitmq:4.1-management-alpine

RUN apk add curl

RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v4.1.0/rabbitmq_delayed_message_exchange-4.1.0.ez > rabbitmq_delayed_message_exchange-4.1.0.ez && \
mv rabbitmq_delayed_message_exchange-4.1.0.ez plugins/

RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange