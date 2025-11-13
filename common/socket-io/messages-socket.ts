// Socket.io messages
export default Object.freeze({
    /**
     * Basic socket.io messages
     */
    messageConnection: 'connection',
    messageDisconnected: 'disconnect',
    /**
     * Admin remote control messages
     * To interact with the game
     */
    messageAdd: 'add',
    messageReloadPart: 'event-reload-part',
    messageMayoTeam: 'event-point-mayo',
    messageKetchupTeam: 'event-point-ketchup',
    messageLockBuzz: 'event-lock-buzz',
    messageUnLockBuzz: 'event-unlock-buzz',
    messageNextTransition: 'event-next-transition',
    messageBuzzBadResponse: 'event-bad-response',
    /**
     * Messages that clients send
     */
    messageClientSendBuzz: 'on-buzz',
    messageClientsNeedPointsInformations: 'need-information-points',
    messageClientNeedStateBuzzer: 'need-state-buzzer',
    /**
     * Messages to send to clients
     */
    messageToClientReloadPart: 'reload-part',
    messageToClientMayo: 'point-mayo',
    messageToClientKetchup: 'point-ketchup',
    messageToClientReceivePoints: 'receive-points-teams',
    messageToClientReceiveBuzz: 'receive-buzz',
    messageToClientLockBuzz: 'receive-lock-buzz',
    messageToClientUnLockBuzz: 'receive-unlock-buzz',
    messageToClientReceiveStateBuzzer: 'receive-state-buzzer',
    messageToClientNextTransition: 'receive-next-transition',
    messageToClientReceiveBadResponse: 'receive-buzz-bad-response',
});
