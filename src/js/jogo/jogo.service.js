export class JogoService {

  movimentoPeao(pecas, { posicaoX, posicaoY, jogada, tipo}) {
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;
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
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

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

  movimentoBispo(tabuleiro, {posicaoX, posicaoY, tipo}) {
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for (let i = 1; (posicaoX - i >= 0 && posicaoY - i >= 0); i++) {
      const proxX = posicaoX - i;
      const proxY = posicaoY - i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoX - i >= 0 && posicaoY + i < 8); i++) {
      const proxX = posicaoX - i;
      const proxY = posicaoY + i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoX + i < 8 && posicaoY - i >= 0); i++) {
      const proxX = posicaoX + i;
      const proxY = posicaoY - i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoX + i < 8 && posicaoY + i < 8); i++) {
      const proxX = posicaoX + i;
      const proxY = posicaoY + i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }
      
      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    return possibilidades;
  }

  movimentoTorre(tabuleiro, {posicaoX, posicaoY, tipo}){
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for (let i = 1; i < 8; i++) {
      possibilidades = [...possibilidades, [posicaoX, posicaoY + i]];
      possibilidades = [...possibilidades, [posicaoX, posicaoY - i]];
      possibilidades = [...possibilidades, [posicaoX + i, posicaoY]];
      possibilidades = [...possibilidades, [posicaoX - i, posicaoY]];
    }

    console.table(this.validarPossibilidades(possibilidades));

    return this.validarPossibilidades(possibilidades);
  }

  validarPossibilidades(possibilidades) {
    return possibilidades.filter(p => !(p[0] < 0 || p[0] > 7) && !(p[1] < 0 || p[1] > 7));
  }
}