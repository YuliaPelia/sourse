import "./slider";
// при нажиманні на тріггер відкривається модальне вікно (ми використовуєм певний селектор щоб показати  
// саме те модальне вікно яке нам необхідно) після цього нам необхідно відстежувати події які виконуються 
// з хрестиком або з подложкою модального вікна, відслідковуємо кліки на ці два елемента і якщо це сталось то це 
// це модальне вікно закриється приховувати можна декількома способами (наприклад змінюючи властивість display,
// або міняючи css класи, якщо вони є)
// 1) в папці модулес створюєм новий файл
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // створюємо змінну стану нашого модального вікна де користувач щось вибирає
    let modalState = {};
    let deadline = '2023-01-01';

    changeModalState(modalState);
    modals();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);
    timer('.container1', deadline);
    images();
});
// DOMContentLoaded - відповідає за те що наші скрипти починають виконуватися тільки тоді коли наша DOM структура 
// на сторінці готова

// 1) зробити щоб після того як користувач відправив дані з модального вікна
// модальне вікно закрилось
// 2) зробити так щоб після того як ми відправили нашу форму обєкт очищувався, щоб він був пустим і готовий до наступних відправок
// (необовязково)
// 3) зробити перевірки на заповненність параметрів якщо вони не заповнені то коритувач не зможе пройти дальше

// після того як дані пішли на сервер модальне вікно закривалось
