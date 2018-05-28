let $ = require('jquery');

let ui = {

    showLogin() {
        $('#login').show();
    },

    hideLogin() {
        $('#button-login').removeClass('is-loading');
        $('#login').hide();
    },

    showLoader() {
        $('#button-login').addClass('is-loading');
    },

    hideLoader() {
        $('#button-login').removeClass('is-loading');
    },

    showModal(){
        $('#title-overlay').addClass('is-active');
    },

    hideModal(){
        $('#title-overlay').removeClass('is-active');
    }
}

module.exports = ui
