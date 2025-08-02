# Notification & User Services

This project contains two microservices: **User Service** and **Notification Service**. They communicate via **RabbitMQ** to handle user-related events and send notifications (email, push, SMS). PostgreSQL is used for data storage in the User Service.

---

## 🚀 Overview

- **User Service:** Manages user operations and publishes notification events.
- **Notification Service:** Listens to events and sends notifications.
- **RabbitMQ:** Message broker for asynchronous event communication.
- **PostgreSQL:** Database for User Service.

---

## 🛠️ Technologies

- NestJS (TypeScript)
- RabbitMQ
- PostgreSQL 16
- Docker & Docker Compose
- Axios (used in Notification Service to simulate push notifications)

---

## ⚙️ Running Locally with Docker Compose

### Services

| Service               | Description                              | Ports               |
|-----------------------|----------------------------------------|---------------------|
| `postgres`            | PostgreSQL database                     | `5432:5432`         |
| `rabbitmq`            | RabbitMQ broker and management UI      | `5672:5672`, `15672:15672` |
| `user-service`        | User microservice API and event publisher | `3000:3000`         |
| `notification-service`| Notification microservice (consumer and sender) | `5000:5000`         |

---

### Setup and Start

1. Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd <your-repo>
    ```
2. Create .env files:

    ```bash
    cp ./user-service/.env.example ./user-service/.env
    ```

    ```bash
    cp ./notification-service/.env.example ./notification-service/.env
    ```

3. Start all services:

    ```bash
    docker-compose up --build
    ```

4. Access the services:

    - User Service API: [http://localhost:3000](http://localhost:3000)
    - Notification Service API: [http://localhost:5000](http://localhost:5000)
    - RabbitMQ Management UI: [http://localhost:15672](http://localhost:15672)

---

## 🧪 Example API Request (User Service)

```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Andrii"
}
```
---

## 📡 How It Works

1. The **User Service** performs user actions (e.g., registration).
2. It publishes a notification event with type and payload to RabbitMQ.
3. The **Notification Service** listens for events from RabbitMQ.
4. When an event is received:
   - It selects the right notification channel (push).
   - Uses a **Message Template Resolver** to create a title and body for the notification based on event type.
   - Sends the notification via the corresponding service (e.g., `PushService` sends an HTTP POST to the webhook URL).
5. Notifications are logged for monitoring.

