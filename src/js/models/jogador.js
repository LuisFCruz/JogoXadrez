export class Jogador{
  constructor(tipo, posicaoRei) {
    this._tipo = tipo;
    this._posicaoRei = posicaoRei;
  }

  get tipo() {
    return this._tipo;
  }


  get posicaoRei() {
    return this._posicaoRei;
  }
}