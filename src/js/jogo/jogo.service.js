import { PecaTabuleiro } from '../models/peca-tabuleiro';

export class JogoService {
  constructor() {
  }

  gerarPecas() {
    const pecasTabuleiro = {};
    const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre'];
    const totalCasas = 8;

    for (let posicaoX = 0; posicaoX < totalCasas; posicaoX++) {
      for (let posicaoY = 0; posicaoY < totalCasas; posicaoY++) {
        const tipoPeca =  posicaoX < 2 ? 'peca-preta' : 'peca-branca';
        let peca = null;
        
        if (posicaoX < 2 || posicaoX > 5) {
          const nomePeca = posicaoX === 1 || posicaoX === 6 ? 'peao' : pecas[posicaoY];
          peca = new PecaTabuleiro(posicaoX, posicaoY, nomePeca, tipoPeca);
        }
        pecasTabuleiro[`${posicaoX}${posicaoY}`] = peca;
      }
    }
    return pecasTabuleiro;
  }

  validarMovimento(posicao, movimentosPossiveis) {
    return !!movimentosPossiveis.find(movimento => (
      movimento[0] === posicao[0] && movimento[1] === posicao[1]
    ));
  }
}