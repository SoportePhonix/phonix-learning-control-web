import { Socket } from 'socket.io-client';

export interface NotificationContextValue {
  socket: Socket | null;
}
