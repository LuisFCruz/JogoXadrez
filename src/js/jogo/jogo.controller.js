import { TabuleiroController } from '../tabuleiro/tabuleiro.controller';
import { PecaTabuleiro } from '../models/peca-tabuleiro';

export class JogoController {
  constructor() {
    this.pecas = [];
    this.gerarPecas();
    this.tabuleiro = new TabuleiroController();
    this.tabuleiro.criarTabuleiro();
    this.posicionarPecas();
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
      this.pecas = [...this.pecas, pecasPorLinha];
    }
  }

  posicionarPecas() {
    this.pecas.forEach(pcs => {
      pcs.forEach(pc => {
        if (!pc) return;
        const {tipo, peca, posicaoX, posicaoY} = pc;
        const className = `${tipo}--${peca}`;
        this.tabuleiro.posicionarPecas(posicaoX, posicaoY, className);
      });
    });
  }
}