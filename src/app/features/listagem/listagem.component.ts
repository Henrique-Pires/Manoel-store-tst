import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Produto } from '../../interface/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {
  produtos!: Produto[];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.produtos$.subscribe((produtos) => {
      this.produtos = produtos;
    });
  }
  removerProduto(i: number): void {
    this.storeService.removerProduto(i);
  }
}
