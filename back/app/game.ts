import { Server as SocketIOServer } from 'socket.io';
import Team from './models/team';
import Transition from './models/transition';
import messages from '../config/messages-socket';

declare global {
    var __basedir: string;
}

export function gameConfig(io: SocketIOServer) {
    let transitionsList: Transition[] = [];

    const teamMayo = new Team('mayo');
    const teamKetchup = new Team('ketchup');

    /**
     * Buzzer state
     */
    let buzzerIsLock = true;

    const initGameSocket = function () {
        /**
         * Init Socket
         */
        io.on(messages.messageConnection, (socket: any) => {
            /**
             * Occurs on user disconnection
             */
            socket.on(messages.messageDisconnected, () => { });

            /**
             * Emits as soon as client connects and requests points info
             */
            socket.on(messages.messageClientsNeedPointsInformations, () => {
                io.emit(messages.messageToClientReceivePoints, teamMayo.points, teamKetchup.points);
            });

            socket.on(messages.messageClientNeedStateBuzzer, () => {
                io.emit(messages.messageToClientReceiveStateBuzzer, buzzerIsLock);
            });

            /**
             * Manage Mayo team points
             */
            socket.on(messages.messageMayoTeam, (message: string) => {
                receiveOrderModifyPoints(message, messages.messageToClientMayo, teamMayo);
            });

            /**
             * Manage Ketchup team points
             */
            socket.on(messages.messageKetchupTeam, (message: string) => {
                receiveOrderModifyPoints(message, messages.messageToClientKetchup, teamKetchup);
            });

            /**
             * Lock the buzzers
             */
            socket.on(messages.messageLockBuzz, () => {
                buzzerIsLock = true;
                io.emit(messages.messageToClientLockBuzz);
            });

            /**
             * Unlock the buzzers
             */
            socket.on(messages.messageUnLockBuzz, () => {
                buzzerIsLock = false;
                io.emit(messages.messageToClientUnLockBuzz);
            });

            /**
             * Reload the game
             */
            socket.on(messages.messageReloadPart, () => {
                buzzerIsLock = true;
                teamMayo.points = 0;
                teamKetchup.points = 0;
                initTransitionList();
                io.emit(messages.messageToClientReloadPart);
                io.emit(messages.messageToClientReceiveStateBuzzer, buzzerIsLock);
            });

            /**
             * Occurs when a client buzzes
             */
            socket.on(messages.messageClientSendBuzz, (teamName: string) => {
                if (buzzerIsLock)
                    return;
                io.emit(messages.messageToClientReceiveBuzz, teamName);
            });

            /**
             * Send the next transition
             */
            socket.on(messages.messageNextTransition, () => {
                const nextTransition = transitionsList.shift();
                if (!nextTransition)
                    return;
                io.emit(messages.messageToClientNextTransition, nextTransition.filename);
            });

            /**
             * Send a message indicating the team
             * answered the question incorrectly
             */
            socket.on(messages.messageBuzzBadResponse, () => {
                io.emit(messages.messageToClientReceiveBadResponse);
            });

            /**
             * Add or remove points
             * for a team
             */
            const receiveOrderModifyPoints = (messageReceive: string, messageForClient: string, team: Team) => {
                if (messageReceive === messages.messageAdd) {
                    team.incrementPoints();
                } else {
                    team.decrementPoints();
                }
                io.emit(messageForClient, team.points);
            };
        });
    };

    /**
     * Initialize transitions
     */
    const initTransitionList = function () {
        transitionsList = [];
        transitionsList.push(new Transition('nuggets-transition.mp4', 'Nuggets', 1));
        transitionsList.push(new Transition('selt-pepper-transition.mp4', "Sel ou Poivre", 2));
        transitionsList.push(new Transition('menus-transition.mp4', "Les menus", 3));
        transitionsList.push(new Transition('addition-transition.mp4', "L'addition", 4));
        transitionsList.push(new Transition('death-burger-transition.mp4', "Burger de la mort", 5));
        // Sort by order property ascending
        transitionsList.sort((a, b) => {
            return a.order - b.order;
        });
    };

    // Init socket
    initGameSocket();

    // Initialize the list at the beginning
    initTransitionList();
};
