export class PecaTabuleiro {
  constructor(x, y, peca, tipo, jogada = 0) {
    this._posicaoX = x;
    this._posicaoY = y;
    this._peca = peca;
    this._tipo = tipo;
    this._jogada = jogada;
  }

  get posicaoX() {
    return this._posicaoX;
  }

  get posicaoY() {
    return this._posicaoY
  }

  get peca() {
    return this._peca;
  }

  get tipo() {
    return this._tipo;
  }

  get jogada() {
    return this._jogada;
  }

  get nomePeca() {
    return `${this.tipo}--${this.peca}`;
  }
}