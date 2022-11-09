const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
    // використовуєм делегування подій (це коли ми вішаєм одного обробника подій на загальний блок)
    // і всередині відслідковуєм куди саме клікнув користувач, і взалежності від цього ми відкриваєм 
    // контент який відповідає індексу тобто силці на яку клікнув користувач
    // також між табами буде мінятися клас активності в залежності від того на який таб ми натискаєм
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(i => {
            i.style.display = 'none';
        });

        tab.forEach(i => {
            i.classList.remove(activeClass);
        });
    }   
    function showTabContent(n = 0) {
        content[n].style.display = display;
        tab[n].classList.add(activeClass);
    }   

    hideTabContent();
    showTabContent();

    // відслідковуємо в який таб клікнув користувач викор делегування підій
    // 1) навішуєм обробника події кліку на загальну область яка поєднює в собі всі таби
    // 2) перевіряєм (if) чи ми дійсно клікнули в один з табів
    // 3) коли ми впевнились що клікнули в таб ми починаєм їх перебирати один за одним
    // запамятовуючи те тільки той таб який ми перебираєм але й його номер по-порядку
    // як тільки в нашому переборі виконалась умова де ми перевіряєм що таб на який клікнув користувач
    // = тому табові який зараз перебирається ми запамятовуєм його індекс і прямо тут починаєм його використовувати
    // задопомогою тих ф-цій які ми описали (тобто наприклад ми клікнули на 3 таб скрипт переконався
    // що ми дійсно клікнули на 3 таб взяв необхідну цифру і підставив її замість (n) і ф-ція виконалась)

    header.addEventListener('click', (e) => {
        const target = e.target;
        // перевіряєм чи користувач точно клікнув в певний таб
        // в replace передаємо два аргумента 1 - це регулярний вираз 
        // 2 - на що будемо замінювати цей регулярний вираз
        if(target && 
        (target.classList.contains(tabSelector.replace(/\./, "")) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, n) => {
                if(target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(n);
                }
            });
        }
    });

};

export default tabs;