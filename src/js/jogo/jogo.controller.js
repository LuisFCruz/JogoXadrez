import { TabuleiroController } from '../tabuleiro/tabuleiro.controller';
import { PecaTabuleiro } from '../models/peca-tabuleiro';
import { JogoService } from './jogo.service';

export class JogoController {
  constructor() {
    this._pecas = {};
    this._pecasDiff = {};
    this._pecaSelecionada = null;
    this.vezDeJogar = 'peca-branca';
    this.tabuleiroController = new TabuleiroController();
    this.jogoService = new JogoService();
    this.inicializar();
  }

  peca(posicaoX, posicaoY) {
    return this._pecas[`${posicaoX}${posicaoY}`];
  } 

  inicializar() {
    this.gerarPecas();
    this.tabuleiroController.criarTabuleiro();
    this.posicionarPecas();
    this.selecionarPeca();
  }

  gerarPecas() {
    const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'bispo', 'cavalo', 'torre'];
    const totalCasas = 8;

    for (let posicaoX = 0; posicaoX < totalCasas; posicaoX++) {
      for (let posicaoY = 0; posicaoY < totalCasas; posicaoY++) {
        const tipoPeca =  posicaoX < 2 ? 'peca-preta' : 'peca-branca';
        let peca = null;
        
        if (posicaoX < 2 || posicaoX > 5) {
          const nomePeca = posicaoX === 1 || posicaoX === 6 ? 'peao' : pecas[posicaoY];
          peca = new PecaTabuleiro(posicaoX, posicaoY, nomePeca, tipoPeca);
        }
        this._pecas[`${posicaoX}${posicaoY}`] = peca;
        this._pecasDiff[`${posicaoX}${posicaoY}`] = null;
      }
    }
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
        this.moverPeca(posicaoX, posicaoY);
        return;
      }

      this._pecaSelecionada = peca;

      // const x = this.jogoService.movimentoPeao(this._pecas, peca);
      // x.forEach(m => {
      //   const a = document.querySelector(`#c${m[0]}${m[1]}`);
      //   a.style.background = 'blue';

      //   setTimeout(() => {
      //     a.style.background = null;
      //   }, 1000)
      // })
    });
  }

  moverPeca(posicaoXDestino, posicaoYDestino) {
    if (!this._pecaSelecionada) {
      return;
    }

    if (this.validarMovimento(this._pecaSelecionada, posicaoXDestino, posicaoYDestino)) {
      const { posicaoX, posicaoY, peca, tipo, jogada} = this._pecaSelecionada;
  
      const novaPeca = new PecaTabuleiro(posicaoXDestino, posicaoYDestino, peca, tipo, jogada + 1);
  
      this._pecas[`${posicaoX}${posicaoY}`] = null;
      this._pecas[`${posicaoXDestino}${posicaoYDestino}`] = novaPeca;
  
      this.posicionarPecas();

      this._pecaSelecionada = null;

      this.vezDeJogar = this.vezDeJogar === 'peca-branca' ? 'peca-preta' : 'peca-branca';
    }
  }

  validarMovimento(pc, posicaoXDestino, posicaoYDestino) {
    const posicao = [parseInt(posicaoXDestino), parseInt(posicaoYDestino)];
    let movimentos = [];
    switch(pc.peca) {
      case 'peao':
      movimentos = this.jogoService.movimentoPeao(this._pecas, pc);
      break;
    }
    
    return !!movimentos.find(movimento => (
      movimento[0] === posicao[0] && movimento[1] === posicao[1]
    ));
  }
}