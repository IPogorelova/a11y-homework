const KEYS = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
    enter: 13,
    space: 32
};

const DIRECTION = {
    37: -1,
    39: 1
};

window.addEventListener('DOMContentLoaded', () => {
    let searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('К сожалению, поиск пока не работает. Спасибо за понимание!');
    })

    //initialize modal
    MicroModal.init();

    let loginButton = document.querySelector('#loginButton');
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Здесь должна была быть валидация, но она не смогла и очень извиняется :(');
        MicroModal.close('dialog');
    })

    // initialize slider
    new Glide('.glide', { keyboard: false }).mount();

    let tabs = document.querySelectorAll('.tab__link');

    // open/close tabs
    function openTab(e, name) {
        let tabContents = document.querySelectorAll('.tab__content');
        let tabLinks = document.querySelectorAll('.tab__link');

        Array.from(tabContents).forEach(content => {
            content.classList.remove('tab__content_active');
        })
        Array.from(tabLinks).forEach(link => {
            link.setAttribute('aria-selected', 'false');
            link.classList.remove('tab__link_active');
        })

        document.getElementById(name).classList.add('tab__content_active');
        e.currentTarget.classList.add('tab__link_active');
        e.currentTarget.setAttribute('aria-selected', 'true');
    }

    function switchTabOnArrowPress (e) {
        var pressed = e.keyCode;

        if (DIRECTION[pressed]) {
            var target = e.target;
            if (target.index !== undefined) {
                if (tabs[target.index + DIRECTION[pressed]]) {
                    tabs[target.index + DIRECTION[pressed]].focus();
                }
                else if (pressed === KEYS.left) {
                    tabs[tabs.length - 1].focus();
                }
                else if (pressed === KEYS.right) {
                    tabs[0].focus();
                }
            }
        }
    }

    // Handle keydown on tabs
    function keydownEventListener (e) {
        let key = e.keyCode;

        switch (key) {
            case KEYS.end:
                e.preventDefault();
                // Activate last tab
                tabs[tabs.length - 1].focus();
                break;
            case KEYS.home:
                e.preventDefault();
                // Activate first tab
                tabs[0].focus();
                break;
            case KEYS.right:
            case KEYS.left:
                e.preventDefault();
                switchTabOnArrowPress(e)
                break;
        }
    }

    // control tabs
    tabs.forEach((item, index) => {
        tabs[index].index = index;
        item.addEventListener('click', (e) => {
            openTab(e, e.currentTarget.dataset.name);
        });
        item.addEventListener('keydown', keydownEventListener);
    });
});