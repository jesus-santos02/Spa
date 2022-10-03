import api from '/app/helpers/wp_api.js'
import {App} from '/app/App.js';

document.addEventListener('DOMContentLoaded', App);
window.addEventListener('hashchange', () => {
    api.page = 1;
    App();
});