const AppEvents = require('../src/js/constants/app-events');
const ConnectionEvents = require('../src/js/constants/socket-events');
const SpeakerEvents = require('../src/js/constants/speaker-events');
const UserEvents = require('../src/js/constants/user-events');
const UserConstants = require('../src/js/constants/user-constants');
const questions = require('../src/data/questions-data');

let connections = [];
let audience = [];
let speaker = {};
let presentationTitle = 'Untitled Presentation';
let currentQuestion = {};
let results = {};

const socketConfig = socketio => {
    socketio.on(ConnectionEvents.CONNECTION, socket => {
        socket.once(ConnectionEvents.DISCONNECT, () => {
            connections.splice(connections.indexOf(socket), 1);
            socket.disconnect();
            if (socket.id === speaker.id) {
                console.log(
                    `${speaker.name} has left. ${presentationTitle} is over.`
                );
                speaker = {};
                presentationTitle = 'Untitled Presentation';
                socketio.sockets.emit(AppEvents.END_PRESENTATION_EVENT, {
                    title: presentationTitle,
                    speaker: ''
                });
            } else {
                audience = audience.filter(item => {
                    return item.id !== socket.id;
                });
                socketio.sockets.emit(
                    AppEvents.AUDIENCE_UPDATED_EVENT,
                    audience
                );
            }
            console.log(
                `Disconnected. ${connections.length} connections remaining.`
            );
        });

        socket.on(AppEvents.JOIN_NEW_MEMBER_EVENT, data => {
            const newMember = {
                id: socket.id,
                name: data.name,
                type: UserConstants.AUDIENCE
            };
            socket.emit(AppEvents.JOINED_PRESENTATION_EVENT, newMember);
            audience.push(newMember);
            socketio.sockets.emit(AppEvents.AUDIENCE_UPDATED_EVENT, audience);
        });

        socket.on(AppEvents.START_PRESENTATION_EVENT, data => {
            const { name, title } = data;
            presentationTitle = title;
            speaker = {
                name,
                id: socket.id,
                type: UserConstants.SPEAKER
            };
            // Send 'joined' event to client
            socket.emit(AppEvents.JOINED_PRESENTATION_EVENT, speaker);
            socketio.sockets.emit(AppEvents.START_PRESENTATION_EVENT, {
                title,
                speaker: name
            });
        });

        socket.on(SpeakerEvents.ASK_QUESTION_EVENT, question => {
            currentQuestion = question;
            socketio.sockets.emit(
                SpeakerEvents.ASK_QUESTION_EVENT,
                currentQuestion
            );
            results = {};
            for (let choice of Object.keys(question)) {
                if (choice !== 'q') {
                    results[choice] = 0;
                }
            }
            console.log(`Question Asked: ${question.q}`);
        });

        socket.on(UserEvents.ANSWER_QUESTION_EVENT, data => {
            results[data.choice]++;
            socketio.sockets.emit(AppEvents.RESULTS_UPDATED_EVENT, results);
            console.log(`Answer: ${data.choice} | ${results}`);
        });

        socket.emit(AppEvents.WELCOME_EVENT, {
            title: presentationTitle,
            audience,
            speaker: speaker.name,
            questions,
            currentQuestion,
            results
        });

        connections.push(socket);
        console.log(`Connected! ${connections.length} connections.`);
    });
};

module.exports = socketConfig;