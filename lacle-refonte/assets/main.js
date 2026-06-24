/* LA CLÉ — interactions partagées */
(function () {
  // navbar scrolled
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // menu mobile
  var burger = document.querySelector('.nav-burger');
  var links  = document.querySelector('.nav-links');
  if (burger && links && nav) {
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    nav.appendChild(backdrop);

    var closeMenu = function () {
      links.classList.remove('open');
      backdrop.classList.remove('open');
      burger.classList.remove('is-open');
      document.documentElement.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    var openMenu = function () {
      links.classList.add('open');
      backdrop.classList.add('open');
      burger.classList.add('is-open');
      document.documentElement.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
    };

    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    burger.addEventListener('click', function () {
      if (links.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });
    backdrop.addEventListener('click', closeMenu);
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });
  }

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  var showAll = function () {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  };

  if (!('IntersectionObserver' in window)) {
    // navigateur sans IntersectionObserver : on affiche tout
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { io.observe(el); });

  // filet de sécurité : si du contenu reste masqué (JS lent, scroll
  // instantané, capture), on force l'affichage après 2,5 s
  setTimeout(showAll, 2500);
})();
