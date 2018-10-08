import { TabuleiroController } from "../tabuleiro/tabuleiro.controller";
import { PecaTabuleiro } from "../models/peca-tabuleiro";

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

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        const posicaoX = i < 2 ? i : i + 4;
        const tipoPeca =  i < 2 ? 'peca-preta' : 'peca-branca';
        if (i === 0 || i === 3) {
          const peca = new PecaTabuleiro(posicaoX, j, pecas[j], tipoPeca);
          this.pecas.push(peca);
        } else if (i === 1 || i === 2) {
          const peca = new PecaTabuleiro(posicaoX, j, 'peao', tipoPeca);
          this.pecas.push(peca);
        } 
      }
    }
  }

  posicionarPecas() {
    this.pecas.forEach(pc => {
      const className = `${pc.tipo}--${pc.peca}`
      this.tabuleiro.posicionarPecas(pc.posicaoX, pc.posicaoY, className);
    });
  }
}