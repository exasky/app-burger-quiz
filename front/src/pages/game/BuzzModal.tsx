import { useEffect, useState } from 'react';

import ioMessages from '../../../../common/socket-io/messages-socket';
import { socket } from '../../context/socket';

const mayoColor = '#E0C800';
const ketchupColor = '#C71000';

export function BuzzModal() {
  const [displayed, setDisplayed] = useState(false);
  const [logoTeamDisplayed, setLogoTeamDisplayed] = useState(false);

  const [teamBuzz, setTeamBuzz] = useState<'team-mayo' | 'team-ketchup' | undefined>(undefined);

  useEffect(() => {
    const onMessageToClientReceiveBuzz = (teamName: 'team-mayo' | 'team-ketchup') => {
      if (logoTeamDisplayed) return;

      setTeamBuzz(teamName);
      setDisplayed(true);
      setLogoTeamDisplayed(true);

      setTimeout(() => {
        setDisplayed(false);
      }, 500);

      setTimeout(() => {
        setLogoTeamDisplayed(false);
      }, 4000);
    };

    socket.on(ioMessages.messageToClientReceiveBuzz, onMessageToClientReceiveBuzz);

    return () => {
      socket.off(ioMessages.messageToClientReceiveBuzz, onMessageToClientReceiveBuzz);
    };
  });

  return (
    <>
      <img
        style={{
          position: 'absolute',
          left: 0,
          top: teamBuzz === 'team-ketchup' ? 0 : 'unset',
          bottom: teamBuzz === 'team-mayo' ? 0 : 'unset',
          width: '200px',
          height: '200px',
          transition: 'opacity .3s',
          opacity: logoTeamDisplayed ? 1 : 0,
          zIndex: 10,
        }}
        src={teamBuzz === 'team-mayo' ? '/teams/mayo.svg' : '/teams/ketchup.svg'}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: teamBuzz === 'team-mayo' ? mayoColor : ketchupColor,
          transition: 'opacity .1s',
          opacity: displayed ? 1 : 0,
        }}
      ></div>
    </>
  );
}
