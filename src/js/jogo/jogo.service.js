export class JogoService {

  movimentoPeao(pecas, { posicaoX, posicaoY, jogada, tipo}) {
    posicaoX = parseInt(posicaoX);
    posicaoY = parseInt(posicaoY);
    let possibilidades = [];
    const multiplicador = tipo === 'peca-preta' ? 1 : -1;

    const novaPosicaoX = posicaoX + 1 * multiplicador;

    if (pecas[`${novaPosicaoX}${posicaoY + 1}`] && pecas[`${novaPosicaoX}${posicaoY + 1}`].tipo !== tipo) {
      possibilidades = [...possibilidades, [novaPosicaoX, posicaoY + 1]];
    }

    if (pecas[`${novaPosicaoX}${posicaoY - 1}`] && pecas[`${novaPosicaoX}${posicaoY - 1}`].tipo !== tipo) {
      possibilidades = [...possibilidades, [novaPosicaoX, posicaoY - 1]];
    }

    if (!pecas[`${novaPosicaoX}${posicaoY}`]) {
      possibilidades = [...possibilidades, [novaPosicaoX, posicaoY]];
    }

    if (!pecas[`${novaPosicaoX}${posicaoY}`] && !jogada) {
      possibilidades = [...possibilidades, [posicaoX + 2 * multiplicador, posicaoY]];
    }

    return this.validarPossibilidades(possibilidades);
  }
    
  movimentoCavalo({posicaoX, posicaoY}) {
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

  movimentoBispo({posicaoX, posicaoY}) {
    let possibilidades = [];

    for (let i = 1; i <= 8; i++) {
      if (posicaoX - i >= 0 && posicaoY - i >= 0) {
        possibilidades = [...possibilidades, [posicaoX - i, posicaoY - i]];
      }
      if (posicaoX - i >= 0 && posicaoY + i < 8) {
        possibilidades = [...possibilidades, [posicaoX - i, posicaoY + i]];
      }
      if (posicaoX + i < 8 && posicaoY - i >= 0) {
        possibilidades = [...possibilidades, [posicaoX + i, posicaoY - i]];
      }
      if (posicaoX + i < 8 && posicaoY + i < 8) {
        possibilidades = [...possibilidades, [posicaoX + i, posicaoY + i]];
      }
    }

    console.table(possibilidades);
    console.log(possibilidades.length, this.validarPossibilidades(possibilidades).length);

    return this.validarPossibilidades(possibilidades);
  }

  validarPossibilidades(possibilidades) {
    return possibilidades.filter(p => !(p[0] < 0 || p[0] > 7) && !(p[1] < 0 || p[1] > 7));
  }
}