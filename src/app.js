import style from './scss/main.scss';
import { JogoController } from './js/jogo/jogo.controller';

const app = () => {
  new JogoController();
}

app();