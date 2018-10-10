export class TabuleiroController {
  constructor() { }

  criarTabuleiro() {
    const tabuleiro = document.querySelector('.tabuleiro');
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const n = i % 2 ? 0 : 1;
        const className = `casa-${(j - n) % 2 ? 'branca' : 'preta'}`;
        const casa = document.createElement('div');
        casa.id = `c${i}${j}`;
        casa.classList.add(className);
        tabuleiro.appendChild(casa);
      }
    }
  }

  posicionarPecas(x, y, className) {
    const casa = document.querySelector(`#c${x}${y}`);
    casa.classList.add(className);
    casa.dataset.posicaoX = x;
    casa.dataset.posicaoY = y;
  }
}