export class JogoService {

  movimentoPeao(posicaoX, posicaoY, peca, ehPrimeroMovimento) {
    posicaoX = parseInt(posicaoX);
    posicaoY = parseInt(posicaoY);
    let possibilidades = [];
    const multiplicador = peca === 'preta' ? 1 : -1;

    possibilidades = [...possibilidades, [posicaoX + 1 * multiplicador, posicaoY + 1]];
    possibilidades = [...possibilidades, [posicaoX + 1 * multiplicador, posicaoY - 1]];

    possibilidades = [...possibilidades, [posicaoX + 1 * multiplicador, posicaoY]];

    if (ehPrimeroMovimento) {
      possibilidades = [...possibilidades, [posicaoX + 2 * multiplicador, posicaoY]];
    }

    possibilidades = this.validarPossibilidades(possibilidades);

    possibilidades.map((p) => {
      document.querySelector(`#c${p[0]}${p[1]}`).style.backgroundColor = 'red';
    });
  }
    
  movimentoCavalo(posicaoX, posicaoY) {
    posicaoX = parseInt(posicaoX);
    posicaoY = parseInt(posicaoY);

    let possibilidades = [];

    possibilidades = [...possibilidades, [posicaoX - 2, posicaoY - 1]];
    possibilidades = [...possibilidades, [posicaoX - 2, posicaoY + 1]];
    possibilidades = [...possibilidades, [posicaoX + 2, posicaoY - 1]];
    possibilidades = [...possibilidades, [posicaoX + 2, posicaoY + 1]];
    possibilidades = [...possibilidades, [posicaoX - 1, posicaoY - 2]];
    possibilidades = [...possibilidades, [posicaoX - 1, posicaoY + 2]];
    possibilidades = [...possibilidades, [posicaoX + 1, posicaoY - 2]];
    possibilidades = [...possibilidades, [posicaoX + 1, posicaoY + 2]];

    return this.validarPossibilidades(possibilidades);
  }

  validarPossibilidades(possibilidades) {
    return possibilidades.filter(p => !(p[0] < 0 || p[0] > 7) && !(p[1] < 0 || p[1] > 7));
  }
}