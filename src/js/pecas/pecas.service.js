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

  movimentosPeao(tabuleiro, { posicaoX, posicaoY, jogada, tipo}) {
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;
    let possibilidades = [];
    const multiX = tipo === 'peca-preta' ? 1 : -1;

    const proxX = posicaoX + 1 * multiX;

    for (let i = 0; i < 2; i++) {
      const multiY = i % 2 ? 1 : -1;
      const proxY = posicaoY + 1 * multiY;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (peca && peca.tipo !== tipo) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    if (!tabuleiro[`${proxX}${posicaoY}`]) {
      possibilidades = [...possibilidades, [proxX, posicaoY]];
    }

    const proxXInicial = posicaoX + 2 * multiX

    if (!jogada && !tabuleiro[`${proxX}${posicaoY}`] && !tabuleiro[`${proxXInicial}${posicaoY}`]) {
      possibilidades = [...possibilidades, [proxXInicial, posicaoY]];
    }

    return this._validarPossibilidades(possibilidades);
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

  movimentosBispo(tabuleiro, peca) {
    const movimentos = this._movimentosDiagonais(tabuleiro, peca);

    let possibilidades = [];
    
    for (const movimento of movimentos) {
      possibilidades = [...possibilidades, ...movimento]
    }

    return possibilidades;
  }

  movimentosTorre(tabuleiro, peca){
    const movimentos = this._movimentosPerpendiculares(tabuleiro, peca);

    let possibilidades = [];
    
    for (const movimento of movimentos) {
      possibilidades = [...possibilidades, ...movimento]
    }

    return possibilidades;
  }

  movimentosRainha(tabuleiro, peca) {
    const movimentosDiagonais = this._movimentosDiagonais(tabuleiro, peca);
    const movimentosPerpendiculares = this._movimentosPerpendiculares(tabuleiro, peca);

    let possibilidades = [];

    for (const movimento of movimentosDiagonais) {
      possibilidades = [...possibilidades, ...movimento]
    }

    for (const movimento of movimentosPerpendiculares) {
      possibilidades = [...possibilidades, ...movimento]
    }

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

  _validarPossibilidades(possibilidades) {
    return possibilidades.filter(p => 
      this.validarPossibilidade(p[0]) && this.validarPossibilidade(p[1])
    );
  }

  validarPossibilidade(possibilidade) {
    return !(possibilidade < 0 || possibilidade > 7);
  }

  *_movimentosDiagonais(tabuleiro, {posicaoX, posicaoY, tipo}){
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for (let i = 0; i < 4; i++) {
      const multiX = i < 2 ? 1 : -1;
      const multiY = i % 2 ? 1 : -1;

      for(let m = 1; m <= 8; m++) {
        
        const proxX = posicaoX - m * multiX;
        const proxY = posicaoY - m * multiY;
        const peca = tabuleiro[`${proxX}${proxY}`];
        
        if (
          !(this.validarPossibilidade(proxX) && this.validarPossibilidade(proxY)) ||
          (peca && peca.tipo === tipo)
        ) {
          break;
        }

        possibilidades = [...possibilidades, [proxX, proxY]];

        if (peca && peca.tipo !== tipo) { break; }
      }

      yield possibilidades;
    }
  }

  *_movimentosPerpendiculares(tabuleiro, {posicaoX, posicaoY, tipo}){
    posicaoX = +posicaoX;
    posicaoY = +posicaoY;

    let possibilidades = [];

    for (let i = 0; i < 4; i++) {
      const multiplicador = i % 2 ? -1 : 1;
      const multiX = i < 2 ? 0 : multiplicador;
      const multiY = i < 2 ? multiplicador : 0;

      for(let m = 1; m <= 8; m++) {
        
        const proxX = posicaoX - m * multiX;
        const proxY = posicaoY - m * multiY;
        const peca = tabuleiro[`${proxX}${proxY}`];

        if (
          !(this.validarPossibilidade(proxX) && this.validarPossibilidade(proxY)) ||
          (peca && peca.tipo === tipo)
        ) {
          break;
        }

        possibilidades = [...possibilidades, [proxX, proxY]];

        if (peca && peca.tipo !== tipo) { break; }
      }

      yield possibilidades;
    }
  }
}