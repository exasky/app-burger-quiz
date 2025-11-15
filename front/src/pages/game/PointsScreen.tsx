import { useEffect, useState } from 'react';
import ioMessages from '../../../../common/socket-io/messages-socket';
import { socket } from '../../context/socket';
import { playSound } from '../../utils/sound';
import { BuzzModal } from './BuzzModal';
import { TeamPointScreen } from './points/TeamPoints';

// const buzzSound = './sounds/buzz.mp3';
const buzzSoundAie = '/sounds/burger-sound-buzz-1.mp3';
const buzzSoundOutch = '/sounds/burger-sound-buzz-2.mp3';

export function PointScreen() {
  const [mayoPoints, setMayoPoints] = useState(0);
  const [ketchupPoints, setKetchupPoints] = useState(0);

  useEffect(() => {
    const onMessageClientMayo = (points: number) => setMayoPoints(points);
    const onMessageClientKetchup = (points: number) => setKetchupPoints(points);
    const onMessageToClientReceivePoints = (pointsMayo: number, pointsKetchup: number) => {
      onMessageClientMayo(pointsMayo);
      onMessageClientKetchup(pointsKetchup);
    };
    const onMessageToClientReceiveBuzz = (teamName: 'team-mayo' | 'team-ketchup') => {
      // if (isTransitionRunning) return;
      let sound = undefined;
      if (teamName === 'team-ketchup') {
        sound = buzzSoundAie;
      } else if (teamName === 'team-mayo') {
        sound = buzzSoundOutch;
      } else {
        console.log('Impossible de faire le buzz car valeur indéterminée : ' + teamName);
        return;
      }

      playSound(sound);
    };
    const onMessageToClientReloadPart = () => {
      onMessageClientMayo(0);
      onMessageClientKetchup(0);
    };

    socket.on(ioMessages.messageToClientMayo, onMessageClientMayo);
    socket.on(ioMessages.messageToClientKetchup, onMessageClientKetchup);
    socket.on(ioMessages.messageToClientReceivePoints, onMessageToClientReceivePoints);
    socket.on(ioMessages.messageToClientReceiveBuzz, onMessageToClientReceiveBuzz);
    socket.on(ioMessages.messageToClientReloadPart, onMessageToClientReloadPart);

    socket.emit(ioMessages.messageClientsNeedPointsInformations);

    return () => {
      socket.off(ioMessages.messageToClientMayo, onMessageClientMayo);
      socket.off(ioMessages.messageToClientKetchup, onMessageClientKetchup);
      socket.off(ioMessages.messageToClientReceivePoints, onMessageToClientReceivePoints);
      socket.off(ioMessages.messageToClientReceiveBuzz, onMessageToClientReceiveBuzz);
      socket.off(ioMessages.messageToClientReloadPart, onMessageToClientReloadPart);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        height: '100%',
        justifyContent: 'space-around',
      }}
    >
      <TeamPointScreen team="ketchup" points={ketchupPoints} />
      <TeamPointScreen team="mayo" points={mayoPoints} />
      <BuzzModal />
    </div>
  );
}
