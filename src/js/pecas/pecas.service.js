import { PecaTabuleiro } from "../models/peca-tabuleiro";

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

  estaEmCheque(tabuleiro, peca) {
    return this._estaEmChequeDiagonal(tabuleiro, peca) ||
      this._estaEmChequePerpendicular(tabuleiro, peca) ||
      this._estaEmChequeL(tabuleiro, peca) ||
      this._estaEmChequeRotacao(tabuleiro, peca) ||
      this._estaEmChequeDiagonalSimples(tabuleiro, peca);
  }

  movimentosPeao(tabuleiro, peca) {
    const { posicaoX, posicaoY, jogada, tipo} = peca;
    const multiX = tipo === 'peca-preta' ? 1 : -1;
    const proxX = posicaoX + 1 * multiX;
    const captura = this._movimentoDiagonalSimples(tabuleiro, peca);
    
    let possibilidades = [...captura];

    const casa = tabuleiro[`${proxX}${posicaoY}`];

    if (
      this.validarPossibilidade(proxX) && 
      this.validarPossibilidade(posicaoY) &&
      !casa
    ) {
      possibilidades = [...possibilidades, [proxX, posicaoY]];
    }

    const proxXInicial = posicaoX + 2 * multiX

    if (!jogada && !tabuleiro[`${proxX}${posicaoY}`] && !tabuleiro[`${proxXInicial}${posicaoY}`]) {
      possibilidades = [...possibilidades, [proxXInicial, posicaoY]];
    }

    return possibilidades;
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
        peca.tipo !== tipo &&
        peca.peca !== 'rei'
      ) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    return possibilidades;
  }

  movimentosBispo(tabuleiro, peca) {
    return this._movimentosDiagonais(tabuleiro, peca);
  }

  movimentosTorre(tabuleiro, peca){
   return this._movimentosPerpendiculares(tabuleiro, peca);
  }

  movimentosRainha(tabuleiro, peca) {
    const movimentosDiagonais = this._movimentosDiagonais(tabuleiro, peca);
    const movimentosPerpendiculares = this._movimentosPerpendiculares(tabuleiro, peca);

    const possibilidades = [...movimentosDiagonais, ...movimentosPerpendiculares];

    return possibilidades;
  }

  movimentosRei(tabuleiro, peca) {
    const movimentos = this._movimentosRotacao(tabuleiro, peca);
    let possibilidades = [];

    movimentos.forEach((m) => {
      const [posicaoX, posicaoY] = m;
      const novaPeca = new PecaTabuleiro(posicaoX, posicaoY, peca.peca, peca.tipo);
      const cheque = !this.estaEmCheque(tabuleiro, novaPeca);

      if (cheque) {
        possibilidades = [...possibilidades, m]
      }
    });

    return possibilidades;
  }

  validarPossibilidade(possibilidade) {
    return !(possibilidade < 0 || possibilidade > 7);
  }

  _movimentosDiagonais(tabuleiro, {posicaoX, posicaoY, tipo}){
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
          (peca && (peca.tipo === tipo || peca.peca === 'rei'))
        ) {
          break;
        }

        possibilidades = [...possibilidades, [proxX, proxY]];

        if (peca && peca.tipo !== tipo) { break; }
      }
    }

    return possibilidades;
  }

  _movimentosPerpendiculares(tabuleiro, {posicaoX, posicaoY, tipo}){
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
          (peca && (peca.tipo === tipo || peca.peca === 'rei'))
        ) {
          break;
        }

        possibilidades = [...possibilidades, [proxX, proxY]];

        if (peca && peca.tipo !== tipo) { break; }
      }
    }

    return possibilidades;
  }

  _movimentosRotacao(tabuleiro, {posicaoX, posicaoY, tipo}) {
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
        peca.tipo !== tipo &&
        peca.peca !== 'rei'
      ) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    return possibilidades;
  }

  _movimentoDiagonalSimples(tabuleiro, {posicaoX, posicaoY, tipo}) {
    let possibilidades = [];
    const multiX = tipo === 'peca-preta' ? 1 : -1;

    const proxX = posicaoX + 1 * multiX;

    for (let i = 0; i < 2; i++) {
      const multiY = i % 2 ? 1 : -1;
      const proxY = posicaoY + 1 * multiY;
      const peca = tabuleiro[`${proxX}${proxY}`];

      if (
        this.validarPossibilidade(proxX) && 
        this.validarPossibilidade(proxY) &&
        peca &&
        peca.tipo !== tipo && 
        peca.peca !== 'rei'
      ) {
        possibilidades = [...possibilidades, [proxX, proxY]];
      }
    }

    return possibilidades;
  }

  _estaEmChequeDiagonal(tabuleiro, peca) {
    const movimentos = this._movimentosDiagonais(tabuleiro, peca);

    const pecasCheque = ['rainha', 'bispo'];

    return !!movimentos.find(m => {
      const casa = tabuleiro[`${m[0]}${m[1]}`];
      return casa && casa.tipo !== peca.tipo && pecasCheque.includes(casa.peca);
    });
  }

  _estaEmChequePerpendicular(tabuleiro, peca) {
    const movimentos = this._movimentosPerpendiculares(tabuleiro, peca);

    const pecasCheque = ['rainha', 'torre'];

    return !!movimentos.find(m => {
      const casa = tabuleiro[`${m[0]}${m[1]}`];
      return casa && pecasCheque.includes(casa.peca);
    });
  }

  _estaEmChequeRotacao(tabuleiro, peca) {
    const movimentos = this._movimentosRotacao(tabuleiro, peca);

    return !!movimentos.find(m => {
      const casa = tabuleiro[`${m[0]}${m[1]}`];
      return casa && casa.peca === 'rei';
    });
  }

  _estaEmChequeL(tabuleiro, peca){
    const movimentos = this.movimentosCavalo(tabuleiro, peca);
    
    return !!movimentos.find(m => {
      const casa = tabuleiro[`${m[0]}${m[1]}`];
      return casa && casa.peca === 'cavalo';
    });
  }

  _estaEmChequeDiagonalSimples(tabuleiro, peca) {
    const movimentos = this._movimentoDiagonalSimples(tabuleiro, peca);
    
    return !!movimentos.find(m => {
      const casa = tabuleiro[`${m[0]}${m[1]}`];
      return casa && casa.peca === 'peao';
    });
  }
}