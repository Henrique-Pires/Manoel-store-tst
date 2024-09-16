import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from './interface/produto';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSubject.asObservable();

  adicionarProduto(novoProduto: Produto) {
    this.produtosSubject.next([
      ...this.produtosSubject.getValue(),
      novoProduto,
    ]);
  }

  removerProduto(index: number) {
    this.produtosSubject.next(
      this.produtosSubject.getValue().filter((_, i) => i !== index)
    );
  }

  getProdutos() {
    return this.produtosSubject.getValue();
  }
}
