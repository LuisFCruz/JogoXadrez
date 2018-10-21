export class TabuleiroController {
  constructor() {
    this.tabuleiro = document.querySelector('.tabuleiro');
  }

  criarTabuleiro() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const n = i % 2 ? 0 : 1;
        const className = `casa-${(j - n) % 2 ? 'branca' : 'preta'}`;
        const casa = document.createElement('div');
        casa.id = `c${i}${j}`;
        casa.dataset.posicaoX = i;
        casa.dataset.posicaoY = j;
        casa.classList.add(className);
        this.tabuleiro.appendChild(casa);
      }
    }
  }

  posicionarPeca(peca) {
    if (!peca) return;
    const { posicaoX, posicaoY, nomePeca: className} = peca;
    const casa = document.querySelector(`#c${posicaoX}${posicaoY}`);
    casa.classList.add(className);
  }

  removerPeca(peca) {
    if (!peca) return;
    const { posicaoX, posicaoY, nomePeca: className} = peca;
    const casa = document.querySelector(`#c${posicaoX}${posicaoY}`);
    casa.classList.remove(className);
  }
}