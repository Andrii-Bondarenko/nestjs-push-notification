export interface NotificationChannel {
  send(payload: any): Promise<void>;
  supports(type: string): boolean;
}