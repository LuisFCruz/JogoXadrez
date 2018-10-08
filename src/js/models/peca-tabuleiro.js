export class PecaTabuleiro {
  constructor(x, y, peca, tipo) {
    this._posicaoX = x;
    this._posicaoY = y;
    this._peca = peca;
    this._tipo = tipo;
    this._jogada = 0;
  }

  get posicaoX() {
    return this._posicaoX;
  }

  set posicaoX(value) {
    return this.posicaoX = value;
  }

  get posicaoY() {
    return this._posicaoY
  }

  set posicaoY(value) {
    return this.posicaoY = value;
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

  set jogada(value) {
    this._jogada = value;
  }
}