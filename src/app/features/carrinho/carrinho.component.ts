import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Produto } from '../../interface/produto';
import { Caixa } from '../../interface/caixa';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  produtos!: Produto[];
  caixas: Caixa[] = [
    { id: 1, altura: 30, largura: 40, comprimento: 80 },
    { id: 2, altura: 80, largura: 50, comprimento: 40 },
    { id: 3, altura: 50, largura: 80, comprimento: 60 },
  ];
  alocacao: Map<number, Produto[]> = new Map();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.produtos$.subscribe((produtos) => {
      this.produtos = produtos;
      this.alocacao = this.alocarProdutosEmCaixas(this.produtos, this.caixas);
    });
  }

  cabeNaCaixa(produto: Produto, caixa: Caixa): boolean {
    return (
      produto.altura <= caixa.altura &&
      produto.largura <= caixa.largura &&
      produto.comprimento <= caixa.comprimento
    );
  }
  retornaDimensao(id: number): string {
    switch (id) {
      case 1:
        return '30x40x80';
      case 2:
        return '80x50x40';
      case 3:
        return '50x80x60';
      default:
        return '';
    }
  }
  alocarProdutosEmCaixas(
    produtos: Produto[],
    caixas: Caixa[]
  ): Map<number, Produto[]> {
    const caixasOrdenadas = caixas
      .slice()
      .sort(
        (a, b) =>
          a.altura * a.largura * a.comprimento -
          b.altura * b.largura * b.comprimento
      );
    const alocacao = new Map<number, Produto[]>();

    produtos.forEach((produto: Produto) => {
      const caixaAdequada = caixasOrdenadas.find((caixa: Caixa) =>
        this.cabeNaCaixa(produto, caixa)
      );
      if (caixaAdequada) {
        const caixaId = caixaAdequada.id;
        if (!alocacao.has(caixaId)) {
          alocacao.set(caixaId, []);
        }
        alocacao.get(caixaId)?.push(produto);
      }
    });

    return alocacao;
  }
}
