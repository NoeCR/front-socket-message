import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
      this.checkStatus();
    }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function){
    // emit('EVENTO', payload, callback?)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string): Observable<any> {
    return this.socket.fromEvent(evento);
  }
}
