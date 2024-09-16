import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StageEnum } from './enum/stage.enum';
import { CarrinhoComponent } from './features/carrinho/carrinho.component';
import { FormularioJogoComponent } from './features/formulario-jogo/formulario-jogo.component';
import { ListagemComponent } from './features/listagem/listagem.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CarrinhoComponent,
    FormularioJogoComponent,
    ListagemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  stage: StageEnum = StageEnum.FORMULARIO;

  isList(): boolean {
    return this.stage === StageEnum.LISTAGEM;
  }
  isForm(): boolean {
    return this.stage === StageEnum.FORMULARIO;
  }
  isCart(): boolean {
    return this.stage === StageEnum.CARRINHO;
  }
}
