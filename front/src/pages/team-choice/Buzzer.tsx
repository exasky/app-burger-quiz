import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ioMessages from '../../../../common/socket-io/messages-socket';
import BuzzerImage from '../../assets/buzzer/burger-buzzer.png';
import { socket } from '../../context/socket';
import styles from './Buzzer.module.scss';

export default function Buzzer() {
  const [searchParams] = useSearchParams();
  const [isBuzzerEnabled, setIsBuzzerEnabled] = useState(false);

  useEffect(() => {
    const onConnect = () => console.log('Connected to Socket.IO server');
    const onReceiveStateBuzzer = (buzzerIsLocked: boolean) => setIsBuzzerEnabled(!buzzerIsLocked);
    const onUnlockBuzzer = () => setIsBuzzerEnabled(true);
    const onLockBuzzer = () => setIsBuzzerEnabled(false);

    socket.on('connect', onConnect);
    socket.on(ioMessages.messageToClientReceiveStateBuzzer, onReceiveStateBuzzer);
    socket.on(ioMessages.messageToClientUnLockBuzz, onUnlockBuzzer);
    socket.on(ioMessages.messageToClientLockBuzz, onLockBuzzer);

    socket.emit(ioMessages.messageClientNeedStateBuzzer);

    return () => {
      socket.off('connect', onConnect);
      socket.off(ioMessages.messageToClientReceiveStateBuzzer, onReceiveStateBuzzer);
      socket.off(ioMessages.messageToClientUnLockBuzz, onUnlockBuzzer);
      socket.off(ioMessages.messageToClientLockBuzz, onLockBuzzer);
    };
  }, []);

  const handleBuzz = () => {
    if (isBuzzerEnabled) {
      socket.emit(ioMessages.messageClientSendBuzz, searchParams.get('team'));
    }
  };

  const teamLogo = searchParams.get('team') === 'team-mayo' ? '/teams/mayo.svg' : '/teams/ketchup.svg';

  return (
    <div className={styles['container']}>
      <img className={styles['team-logo']} alt="Logo équipe" src={teamLogo} />
      <button onClick={handleBuzz} disabled={!isBuzzerEnabled} className={styles['buzzer-button']}>
        <img src={BuzzerImage} alt="buzzer" />
      </button>
    </div>
  );
}
