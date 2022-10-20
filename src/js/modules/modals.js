// 2. Щоб експортувати весь код який буде знаходитися тут, необхідно зробити певну структуру
// використовуючи звичайні ф-ції
const modals = () => {
    // 3. пишемо загальний алгоритм який буде приймати в себе різні аргументи і робити те що нам потрібно
    // створюєм ф-цію яка буде відповідати за привязку модального вікна до певного триггеру
    // trigger - селектор нашої кнопки по якій ми будемо клікати
    // modal - модальне вікно яке ми будемо відкривати
    // close - селекор який закриває модальне вікно (хрестик)
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),  
              windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                // e.target - чи точно існує той елемент на який клікнув користувач
                if(e.target) {
                    e.preventDefault(); // відміняєм стандартну поведінку браузера
                }
    
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                // робимо так що коли модальне вікно відкрито то ми можемо гортати тільки модальне вікно,
                // якщо воно велике по висоті якщо ні то сторінка просто заморожується і при виклику модального
                // вікна скролити сторінку буде не можливо
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
    
            });
        });
        // закриття модального вікна при натисканні на хрестик
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        // закриття модального вікна при натисканні на подложку
        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open'); 
            }
        });
    }
    
    // відкриття модального вікна через певний проміжок часу
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "";

        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

export default modals;
