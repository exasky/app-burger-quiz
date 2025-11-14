import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router';
import BurgerQuizLogo from '../../assets/backgrounds/burger_quiz_title.png';
import style from './WaitScreen.module.scss';

export function WaitScreen() {
  const navigate = useNavigate();
  const [urlToGenerate, setUrlToGenerate] = useState('');

  useEffect(() => {
    fetch('/game/url')
      .then((response) => response.json())
      .then((data) => setUrlToGenerate(data.url))
      .catch((error) => console.error('Error fetching URL for QR code:', error));
  });

  return (
    <div className={style['qr-code-container']}>
      <img className={style['title-img-bgq']} src={BurgerQuizLogo} />

      <div className={style['title']}>
        <span className={style['title-ketchup']}>Ketchup,</span>
        <span className={style['title-mayo']}>Mayo,</span>
        <span className={style['title-both']}>ou les deux ?</span>
      </div>

      <QRCode
        className={style['qr-code']}
        value={urlToGenerate}
        size={128}
        title="Flash le Qr code pour accèder aux choix des équipes"
      />

      <button onClick={() => navigate('./points')}>Tout le monde est prêt !</button>
    </div>
  );
}
