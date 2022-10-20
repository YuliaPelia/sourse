import checkNumImputs from './checkNumImputs';

const forms = (state) => {
    // зробити дві змінні
    // 1 - цу всі форми які є на сторінці 
    // 2 - всі input які є в цих формах
    // потрібно буде навішати один і той самий обробиник події на всі одинакові форми
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          modal = document.querySelector('.popup_engineer');

    checkNumImputs('input[name="user_phone"]');

    
    const message = {
        loading: 'Завантаження...',
        success: 'Дякую! Скоро ми з вами звяжемся',
        failure: 'Щось пішло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(i => {
            i.value = '';
        });
    };

    form.forEach(i => {
        i.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            // поміщаєм цей блок на сторінку
            i.appendChild(statusMessage); // поміщаєм цей блок в кінець нашої форми
            
            const formData = new FormData(i); // цей обєкт найде всі інпути збере всі ці дані в спеціальну структуру,
            // яку ми помістимо в змінну formData

            // використовується тоді коли ми відправляємо останню форму з нашого модального канкулятора
            // перевіряєм чи дійсно це те модальне вікно яку нас цікавить, якщо це так то ми беремо ті дані 
            // з state які вже сформувались і перебираємо і відправляємо в formData задопомогою методу append
            if(i.getAttribute('data-calc') == "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // коли formData буду повністю сформована ми її відправляємо
            // відправляємо тіло запиту на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        modal.remove();
                        document.body.style.overflow = "";
                    }, 3000);
                });
        });
    });



};

export default forms;