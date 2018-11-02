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
      const movimentos = this.obterMovimentos(this._pecaSelecionada);
      this.jogoService.mostrarDicas(movimentos);
    });
  }

  moverPeca(posicaoXDestino, posicaoYDestino) {
    if (!this._pecaSelecionada) {
      return;
    }
    const posicao = [posicaoXDestino, posicaoYDestino];
    const movimentos = this.obterMovimentos(this._pecaSelecionada);

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

  obterMovimentos(pecaSelecionada) {
    switch(pecaSelecionada.peca) {
      case 'peao':
      return this.pecasService.movimentoPeao(this._pecas, pecaSelecionada);
      case 'cavalo':
      return this.pecasService.movimentoCavalo(this._pecas, pecaSelecionada);
      case 'bispo':
      return this.pecasService.movimentoBispo(this._pecas, pecaSelecionada);
      case 'torre':
      return this.pecasService.movimentoTorre(this._pecas, pecaSelecionada);
      case 'rainha':
      return this.pecasService.movimentosRainha(this._pecas, pecaSelecionada);
      default:
      return [];
    }
  }
}