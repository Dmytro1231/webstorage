const displayUserStatus = () => {
    let login = sessionStorage.getItem('user');
    if (login !== null) {
        $('span').html(login);
        $('#entry').html('Выход');
    } else {
        $('span').html('Гость');
        $('#entry').html('Вход');
    }
};

$(document).ready(() => {

    displayUserStatus();

    $('#entry').click(() => {
        if (sessionStorage.getItem('user') !== null) {
            sessionStorage.removeItem('user');
            window.location = 'index.html';
        } else {
            window.location = "signin.html";
        }
    })

    $('#signin').click(() => {
        let login = $('#login').val();
        let passw = $('#passw').val();
        let success = false;

        let remember = $('#remember').prop('checked');

        $.getJSON('users.json', (data) => {
            for (let item of data) {
                if (item.login === login && item.passw === passw) {
                    success = true;
                    sessionStorage.setItem('user', login);
                    localStorage.setItem('user', login);
                    window.location = 'success.html';
                    break;
                }
            }
            if (!success) {
                window.location = 'failed.html';
            }
        })
    });

    $('#reset').click(() => {
        $('#login').val('');
        $('#passw').val('');
    });

});