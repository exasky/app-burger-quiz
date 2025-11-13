const $buttonMayo = $('#buzz-button-mayo');
const $buttonKetchup = $('#buzz-button-ketchup');

// Base URL for redirection
const baseRedirectUrl = '/buzzer';

const initTeamChoiceEvents = () => {
    $buttonMayo.click(() => {
        location.href = baseRedirectUrl + '?team=team-mayo';
    });
    $buttonKetchup.click(() => {
        location.href = baseRedirectUrl + '?team=team-ketchup';
    });
};

initTeamChoiceEvents();
