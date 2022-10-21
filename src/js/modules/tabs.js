const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {

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


    header.addEventListener('click', (e) => {
        const target = e.target;

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