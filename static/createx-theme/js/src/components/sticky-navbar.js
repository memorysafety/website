/**
 * Sticky Navbar
 * Enable sticky behaviour of navigation bar on page scroll
*/

const stickyNavbar = (() => {

  let navbar = document.querySelector('.navbar-sticky');

  if (navbar == null) return;

  let navbarClass = navbar.classList,
      navbarH = navbar.offsetHeight,
      scrollOffset = 500;

  if (navbarClass.contains('navbar-floating') && navbarClass.contains('navbar-dark')) {
    window.addEventListener('scroll', (e) => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
        navbar.classList.add('navbar-stuck');
      } else {
        navbar.classList.remove('navbar-stuck');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
      }
    });
  } else if (navbarClass.contains('navbar-floating') && navbarClass.contains('navbar-light')) {
    window.addEventListener('scroll', (e) => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        navbar.classList.add('navbar-stuck');
      } else {
        navbar.classList.remove('navbar-stuck');
      }
    });
  } else {
    window.addEventListener('scroll', (e) => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        document.body.style.paddingTop = navbarH + 'px';
        navbar.classList.add('navbar-stuck');
      } else {
        document.body.style.paddingTop = '';
        navbar.classList.remove('navbar-stuck');
      }
    });
  }

})();

export default stickyNavbar;
