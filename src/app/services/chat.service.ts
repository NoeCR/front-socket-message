import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(user: string, mensaje: string) {
    const payload = {
      de: user,
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }

  getMessage(event: string) {
    return this.wsService.listen(event);
  }
}
