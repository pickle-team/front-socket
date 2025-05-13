import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type MessageHandler<T = unknown> = (message: T) => void;

class WebSocketService {
  private client: Client | null = null;
  private handlers: Map<string, MessageHandler<unknown>[]> = new Map();

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS("/ws"),
        onConnect: () => {
          console.log("WebSocket 연결 성공!");
          resolve();
        },
        onStompError: (frame) => {
          console.error("WebSocket 에러: ", frame);
          reject(frame);
        },
        onDisconnect: () => {
          console.log("WebSocket 연결 종료");
        },
      });

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }

  subscribe<T = unknown>(topic: string, callback: MessageHandler<T>) {
    if (!this.client || !this.client.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, []);
      this.client.subscribe(topic, (message: IMessage) => {
        try {
          const parsedBody = JSON.parse(message.body);
          const handlers = this.handlers.get(topic) || [];
          handlers.forEach((handler) => handler(parsedBody));
        } catch (error) {
          console.error("메시지 처리 중 오류 발생:", error);
        }
      });
    }

    const handlers = this.handlers.get(topic) || [];
    handlers.push(callback as MessageHandler<unknown>);
    this.handlers.set(topic, handlers);
  }

  unsubscribe(topic: string, callback?: MessageHandler<unknown>) {
    if (!this.handlers.has(topic)) {
      return;
    }

    if (callback) {
      const handlers = this.handlers.get(topic) || [];
      const updatedHandlers = handlers.filter(
        (handler) => handler !== callback
      );
      this.handlers.set(topic, updatedHandlers);
    } else {
      this.handlers.delete(topic);
    }
  }

  send(destination: string, body: Record<string, unknown>) {
    if (!this.client || !this.client.connected) {
      console.error("WebSocket이 연결되지 않았습니다.");
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export default new WebSocketService();
