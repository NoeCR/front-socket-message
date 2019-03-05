import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string;
  public mensajesSubscription: Subscription;
  public mensajes: any[] = [];
  public elemento: HTMLElement;

  constructor(
    private chatService: ChatService
  ) {
      this.texto = '';
   }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatService.getMessage('mensaje-nuevo').subscribe(
      msg =>{
        this.mensajes.push(msg);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }

  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }
  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage('Noe CR', this.texto);
    this.texto = '';
  }

}
