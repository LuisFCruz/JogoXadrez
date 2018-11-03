import { TabuleiroController } from '../tabuleiro/tabuleiro.controller';
import { PecaService } from '../pecas/pecas.service';
import { JogoService } from './jogo.service';
import { PecaTabuleiro } from '../models/peca-tabuleiro';

export class JogoController {
  constructor() {
    this._pecas = {};
    this._pecasDiff = {};
    this._pecaSelecionada = null;
    this.vezDeJogar = 'peca-branca';
    this.tabuleiroController = new TabuleiroController();
    this.pecasService = new PecaService();
    this.jogoService = new JogoService();
    this.inicializar();
  }

  peca(posicaoX, posicaoY) {
    return this._pecas[`${posicaoX}${posicaoY}`];
  } 

  inicializar() {
    this._pecas = this.jogoService.gerarPecas();
    this.tabuleiroController.criarTabuleiro();
    this.posicionarPecas();
    this.selecionarPeca();
  }

  

  posicionarPecas() {
    Object.keys(this._pecas).forEach(key => {
      if (this._pecas[key] === this._pecasDiff[key]) return;

      if (this._pecasDiff[key]) {
        this.tabuleiroController.removerPeca(this._pecasDiff[key]);
      }

      if (this._pecas[key]) {
        this.tabuleiroController.posicionarPeca(this._pecas[key]);
      }

    });
    this._pecasDiff = { ...this._pecas };
  }

  selecionarPeca() {
    this.tabuleiroController.tabuleiro.addEventListener('click', ({ target }) => {
      if (target.nodeName !== 'DIV') {
        return;
      }

      this.tabuleiroController.removerDicas();

      const { posicaoX, posicaoY } = target.dataset;
      const peca = this.peca(posicaoX, posicaoY);
      
      if (!this._pecaSelecionada && peca && this.vezDeJogar !== peca.tipo) {
        return;
      }

      if (this._pecaSelecionada && (!peca || this.vezDeJogar !== peca.tipo )) {
        this.moverPeca(+posicaoX, +posicaoY);
        return;
      }

      this._pecaSelecionada = peca;
      if (this._pecaSelecionada) {
        const movimentos = this.pecasService.obterMovimentos(this._pecas, this._pecaSelecionada);
        this.tabuleiroController.mostrarDicas(peca, movimentos);
      }
    });
  }

  moverPeca(posicaoXDestino, posicaoYDestino) {
    if (!this._pecaSelecionada) {
      return;
    }
    const posicao = [posicaoXDestino, posicaoYDestino];
    const movimentos = this.pecasService.obterMovimentos(this._pecas, this._pecaSelecionada);

    if (this.jogoService.validarMovimento(posicao, movimentos)) {
      const { posicaoX, posicaoY, peca, tipo, jogada} = this._pecaSelecionada;
  
      const novaPeca = new PecaTabuleiro(posicaoXDestino, posicaoYDestino, peca, tipo, jogada + 1);
  
      this._pecas[`${posicaoX}${posicaoY}`] = null;
      this._pecas[`${posicaoXDestino}${posicaoYDestino}`] = novaPeca;
  
      this.posicionarPecas();

      this._pecaSelecionada = null;

      this.vezDeJogar = this.vezDeJogar === 'peca-branca' ? 'peca-preta' : 'peca-branca';
    }
  }
}