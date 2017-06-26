const scrollLine = document.querySelector('.scroll-line');

function fillScrollLine() {
      const innerHeight    = window.innerHeight;
      const clientHeight      = document.body.clientHeight;
      const scrolled        = window.scrollY;
      const percentScrolled = (scrolled / (clientHeight - innerHeight)) * 100;
      scrollLine.style.width = percentScrolled + '%';
    }
    window.addEventListener('scroll', debounce(fillScrollLine));
    function debounce(func, wait = 15, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }