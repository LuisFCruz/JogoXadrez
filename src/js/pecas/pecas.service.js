export class PecaService {

  obterMovimentos(tabuleiro, pecaSelecionada) {
    switch(pecaSelecionada.peca) {
      case 'peao':
      return this.movimentosPeao(tabuleiro, pecaSelecionada);
      case 'cavalo':
      return this.movimentosCavalo(tabuleiro, pecaSelecionada);
      case 'bispo':
      return this.movimentosBispo(tabuleiro, pecaSelecionada);
      case 'torre':
      return this.movimentosTorre(tabuleiro, pecaSelecionada);
      case 'rainha':
      return this.movimentosRainha(tabuleiro, pecaSelecionada);
      case 'rei':
      return this.movimentosRei(tabuleiro, pecaSelecionada);
      default:
      return [];
    }
  }

  movimentosPeao(pecas, { posicaoX, posicaoY, jogada, tipo}) {
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;
    let possibilidades = [];
    const multiYplicador = tipo === 'peca-preta' ? 1 : -1;

    const novaPosicaoX = posicaoX + 1 * multiYplicador;

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
      possibilidades = [...possibilidades, [posicaoX + 2 * multiYplicador, posicaoY]];
    }

    return this.validarPossibilidades(possibilidades);
  }
    
  movimentosCavalo(tabuleiro, {posicaoX, posicaoY, tipo}) {
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for(let i = 0; i < 8; i++) {
      const operadorX = i < 4 ? (i < 2 ? -2 : 2) : (i < 6 ? -1 : 1);
      const operadorY = i < 4 ? (i % 2 ? -1 : 1) : (i % 2 ? -2 : 2);
      const proxX = posicaoX + operadorX;
      const proxY = posicaoY + operadorY;
      const peca = tabuleiro[`${proxX}${proxY}`] || {}

      if (
        this.validarPossibilidade(proxX) && 
        this.validarPossibilidade(proxY) &&
        peca.tipo !== tipo
      ) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    return possibilidades;
  }

  movimentosBispo(tabuleiro, {posicaoX, posicaoY, tipo}) {
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

  movimentosTorre(tabuleiro, {posicaoX, posicaoY, tipo}){
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for (let i = 1; (posicaoY + i < 8); i++) {
      const proxX = posicaoX;
      const proxY = posicaoY + i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }
      
      possibilidades = [...possibilidades, [proxX, proxY]];
      
      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoY - i >= 0); i++) {
      const proxX = posicaoX;
      const proxY = posicaoY - i;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoX + i < 8); i++) {
      const proxX = posicaoX + i;
      const proxY = posicaoY;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    for (let i = 1; (posicaoX - i >= 0); i++) {
      const proxX = posicaoX - i;
      const proxY = posicaoY;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo === tipo) { break; }

      possibilidades = [...possibilidades, [proxX, proxY]];

      if (peca && peca.tipo !== tipo) { break; }
    }

    return possibilidades;
  }

  movimentosRainha(tabuleiro, peca) {
    const movimentosBispo = this.movimentosBispo(tabuleiro, peca);
    const movimentosTorre = this.movimentosTorre(tabuleiro, peca);
    const possibilidades = [...movimentosBispo, ...movimentosTorre];

    return possibilidades;
  }

  movimentosRei(tabuleiro, {posicaoX, posicaoY, tipo}) {
    let possibilidades = [];

    for (let i = 1; i <= 8; i++) {
      const multiX = i < 5 ? 1 : -1;
      const multiY = i < 5 ? (i % 2 ? -1 : 1) : (i % 2 ? 1 : -1);

      const proxX = i % 4 ? posicaoX - 1 * multiX : posicaoX;
      const proxY = (i -1) % 4 ? posicaoY - 1 * multiY : posicaoY;
      const peca = tabuleiro[`${proxX}${proxY}`] || {};

      if (
        this.validarPossibilidade(proxX) && 
        this.validarPossibilidade(proxY) &&
        peca.tipo !== tipo
      ) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    return possibilidades;
  }

  validarPossibilidades(possibilidades) {
    return possibilidades.filter(p => 
      this.validarPossibilidade(p[0]) && this.validarPossibilidade(p[1])
    );
  }

  validarPossibilidade(possibilidade) {
    return !(possibilidade < 0 || possibilidade > 7);
  }
}