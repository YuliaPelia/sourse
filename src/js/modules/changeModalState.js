


// формуємо обєкт з тими даними які нам необхідно відправити (modalState)
// в який будемо поміщати всі ті дані які вибрав користувач

// 1. Створюємо стрілочну ф-цію
const changeModalState = (state) => {
    // получаєм елементи з якими ми будемо працювати
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');


    // валідуємо те що нам потрібно задопомогою певного модуля
    checkNumImputs('#width');   
    checkNumImputs('#height');      





    // 4. Створюєм ф-цію і передаємо в неї 3 аргументи 
    // 1) e - та подія яка буде відбуватись
    // 2) elem - елемент на якому буде виконуватись подія
    // 3) prop - property яке ми будемо змінювати в state
    function bindActionToElems(e, elem, prop) {
        // 2. Беремо елемент і перебираємо його всередину передаємо 2 аргументи 
        // 1) item - кожний елемент який ми перебираєм
        // 2) i - індекс цього елемента     
        // зробити так щоб коли користувач клікає на певний по рахунку елемент (тобто на картинку)
        // 1 елемент - 1 картинка
        // 2 елемент - 2 картинка
        elem.forEach((item, i) => {
            // 3. Беремо кожне окреме зображення і навішуємо йому обробника події
            item.addEventListener(e, () => {
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодне' : state[prop] = 'Тепле';
                            // Беремо всі checkbox які є і проходимся по кожному з них задопомогою циклу
                            // і забираєм галочки зі всіх checkbox крім того в який клікнув користувач
                            elem.forEach((box, j) => {
                                // кожен checkbox який сюда попаде галочка в нього зніметься (її не буде)
                                box.checked = false;
                                // але як тільки ми наткнемося на той checkbox який клікнув користувач то галочка поставиться
                                if(i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;       
                }

                console.log(state);
            });
        });
    }
   
      
  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');
  
  
};

export default changeModalState;