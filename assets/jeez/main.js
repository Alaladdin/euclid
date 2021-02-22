document.addEventListener('DOMContentLoaded', () => {
  const toggler = document.querySelector('.burger-toggle');
  const nav = document.querySelector('.header-nav');
  const header = document.querySelector('header');
  const navBackground = document.querySelector('.nav-background');

  // Конфигурация слайдера
  const homePageSlider = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    centeredSlides: true,
    preloadImages: true,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletActiveClass: 'slider-dot-active',

      renderBullet: (index, className) => {
        return `<div class='slider-dot ${className}'></div>`;
      },
    },
  });

  /**
   * Функция для создания аккордеона
   * @param {string} selector - selector
   * @param {boolean} collapseInactive - скрывает элемент при переключении
   * @param {boolean} expanded - делает элемент открытым при загрузке страницы
   * @param {number} expandedElement - индекс элемента expanded
   */
  function accordion(selector, {
    collapseInactive = true,
    expanded = true,
    expandedElement = 0,
  } = {}) {
    const element = document.querySelectorAll(selector);

    if (expanded) element[expandedElement].classList.add('active');

    for (const el of element) {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        // Скрываем элементы, если указан параметр
        if (collapseInactive) {
          for (const node of element) {
            // Исключаем выбранный элемент, чтобы можно было переключать его состояние (вкл/выкл)
            if (e.currentTarget !== node) node.classList.remove('active');
          }
        }

        // Делаем элемент активным
        e.currentTarget.classList.toggle('active');
      });
    }
  }

  // Sticky header
  function stickyHeader(headerElement = null) {
    document.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPos > headerElement.offsetHeight + 30) {
        headerElement.classList.add('sticky');
      } else if (scrollPos === 0) {
        headerElement.classList.remove('sticky');
      }
    });
  }

  const tabsToggler = () => {
    const tabClass = '.how-we-work-steps-item';
    const tabsContainer = document.querySelector('.how-we-work-steps-list');
    const tabs = tabsContainer.querySelectorAll(tabClass);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const activeTab = document.querySelector(`${tabClass}.selected`);

        activeTab.classList.remove('selected');
        tab.classList.add('selected');
      });
    });
  };

  // Показываем меню
  function showMenu() {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
    navBackground.classList.add('fade-in');
  }

  // Скрываем меню
  function hideMenu() {
    nav.classList.remove('active');
    navBackground.classList.remove('fade-in');
    document.body.style.overflow = 'auto';
  }

  // Включаем обработку табов
  tabsToggler();

  // При клике на бургерное меню
  toggler.onclick = (e) => {
    e.stopPropagation();
    nav.classList.contains('active') ? hideMenu() : showMenu();
  };

  // Скрываем меню, если клик вне меню
  nav.onclick = (e) => e.stopPropagation();
  window.addEventListener('click', hideMenu);

  // Скрываем меню на ESC
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideMenu();
  });

  stickyHeader(header);

  accordion('.accordion', {
    collapseInactive: true,
    expanded: true,
    expandedElement: 2,
  });
});
