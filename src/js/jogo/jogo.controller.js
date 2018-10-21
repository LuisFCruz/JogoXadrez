import { TabuleiroController } from '../tabuleiro/tabuleiro.controller';
import { PecaTabuleiro } from '../models/peca-tabuleiro';

export class JogoController {
  constructor() {
    this._pecas = [];
    this._pecaSelecionada;
    this.tabuleiroController = new TabuleiroController();
    this.inicializar();
  }

  peca(posicaoX, posicaoY) {
    return this._pecas[posicaoX][posicaoY];
  } 

  inicializar() {
    this.gerarPecas();
    this.tabuleiroController.criarTabuleiro();
    this.posicionarPecas();
    this.selecionarPeca();
  }

  gerarPecas() {
    const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre'];
    const totalCasas = 8;

    for (let i = 0; i < totalCasas; i++) {
      let pecasPorLinha = [];
      for (let j = 0; j < totalCasas; j++) {
        const posicaoX = i;
        const posicaoY = j;
        const tipoPeca =  i < 2 ? 'peca-preta' : 'peca-branca';
        let peca = null;
        
        if (i < 2 || i > 5) {
          const nomePeca = i === 1 || i === 6 ? 'peao' : pecas[posicaoY];
          peca = new PecaTabuleiro(posicaoX, posicaoY, nomePeca, tipoPeca);
        }
        pecasPorLinha = [...pecasPorLinha, peca];
      }
      this._pecas = [...this._pecas, pecasPorLinha];
    }
  }

  posicionarPecas() {
    this._pecas.forEach(pcs => {
      pcs.forEach(this.tabuleiroController.posicionarPeca);
    });
  }

  selecionarPeca() {
    this.tabuleiroController.tabuleiro.addEventListener('click', ({ target }) => {
      if (target.nodeName !== 'DIV') {
        return;
      }

      const { posicaoX, posicaoY } = target.dataset;

      if (this._pecaSelecionada) {
        this.moverPeca(posicaoX, posicaoY);
        return;
      }

      this._pecaSelecionada = this.peca(posicaoX, posicaoY);
    });
  }

  moverPeca(posicaoXDestino, posicaoYDestino) {
    if (!this._pecaSelecionada) {
      return;
    }
    
    const { posicaoX, posicaoY, peca, tipo, jogada} = this._pecaSelecionada;

    const novaPeca = new PecaTabuleiro(posicaoXDestino, posicaoYDestino, peca, tipo, jogada + 1);

    this.tabuleiroController.posicionarPeca(novaPeca)
    this.tabuleiroController.removerPeca(this._pecaSelecionada);
    
    this._pecas[posicaoX][posicaoY] = null;
    this._pecas[posicaoXDestino][posicaoYDestino] = novaPeca;

    this._pecaSelecionada = null;
  }
}