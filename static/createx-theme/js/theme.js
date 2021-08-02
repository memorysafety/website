function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Createx | Multipurpose Bootstrap Template
 * Copyright 2021 Createx Studio
 * Theme core scripts
 *
 * @author Createx Studio
 * @version 3.0.0
 */
(function () {
  'use strict';
  /**
   * Sticky Navbar
   * Enable sticky behaviour of navigation bar on page scroll
  */

  var stickyNavbar = function () {
    var navbar = document.querySelector('.navbar-sticky');
    if (navbar == null) return;
    var navbarClass = navbar.classList,
        navbarH = navbar.offsetHeight,
        scrollOffset = 500;

    if (navbarClass.contains('navbar-floating') && navbarClass.contains('navbar-dark')) {
      window.addEventListener('scroll', function (e) {
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
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.pageYOffset > scrollOffset) {
          navbar.classList.add('navbar-stuck');
        } else {
          navbar.classList.remove('navbar-stuck');
        }
      });
    } else {
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.pageYOffset > scrollOffset) {
          document.body.style.paddingTop = navbarH + 'px';
          navbar.classList.add('navbar-stuck');
        } else {
          document.body.style.paddingTop = '';
          navbar.classList.remove('navbar-stuck');
        }
      });
    }
  }();
  /**
   * Sticky sidebar
   * @requires https://github.com/abouolia/sticky-sidebar
   * @requires https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
  */


  var stickySidebar = function () {
    var sidebar = document.querySelectorAll('.sidebar-sticky');

    if (sidebar.length > 0) {
      // Default options
      var defaultOptions = {
        topSpacing: 0,
        bottomSpacing: 0,
        containerSelector: false,
        innerWrapperSelector: '.sidebar-sticky-inner',
        minWidth: 0
      }; // Loop through the instances of sticky sidebar on the page

      for (var i = 0; i < sidebar.length; i++) {
        // User options
        var userOptions = void 0;
        if (sidebar[i].dataset.sidebarStickyOptions !== undefined) userOptions = JSON.parse(sidebar[i].dataset.sidebarStickyOptions); // Combine default and user options into one object

        var options = _objectSpread(_objectSpread({}, defaultOptions), userOptions); // Init plugin


        var _stickySidebar = new StickySidebar(sidebar[i], options);
      }
    }
  }();
  /**
   * Toggling password visibility in password input
  */


  var passwordVisibilityToggle = function () {
    var elements = document.querySelectorAll('.password-toggle');

    var _loop = function _loop(i) {
      var passInput = elements[i].querySelector('.form-control'),
          passToggle = elements[i].querySelector('.password-toggle-btn');
      passToggle.addEventListener('click', function (e) {
        if (e.target.type !== 'checkbox') return;

        if (e.target.checked) {
          passInput.type = 'text';
        } else {
          passInput.type = 'password';
        }
      }, false);
    };

    for (var i = 0; i < elements.length; i++) {
      _loop(i);
    }
  }();
  /**
   * Custom file drag and drop area
  */


  var fileDropArea = function () {
    var fileArea = document.querySelectorAll('.file-drop-area');

    var _loop2 = function _loop2(i) {
      var input = fileArea[i].querySelector('.file-drop-input'),
          message = fileArea[i].querySelector('.file-drop-message'),
          icon = fileArea[i].querySelector('.file-drop-icon'),
          button = fileArea[i].querySelector('.file-drop-btn');
      button.addEventListener('click', function () {
        input.click();
      });
      input.addEventListener('change', function () {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var fileData = e.target.result;
            var fileName = input.files[0].name;
            message.innerHTML = fileName;

            if (fileData.startsWith('data:image')) {
              var image = new Image();
              image.src = fileData;

              image.onload = function () {
                icon.className = 'file-drop-preview img-thumbnail rounded';
                icon.innerHTML = '<img src="' + image.src + '" alt="' + fileName + '">';
              };
            } else if (fileData.startsWith('data:video')) {
              icon.innerHTML = '';
              icon.className = '';
              icon.className = 'file-drop-icon ai-film';
            } else {
              icon.innerHTML = '';
              icon.className = '';
              icon.className = 'file-drop-icon ai-file-text';
            }
          };

          reader.readAsDataURL(input.files[0]);
        }
      });
    };

    for (var i = 0; i < fileArea.length; i++) {
      _loop2(i);
    }
  }();
  /**
   * Form validation
  */


  var formValidation = function () {
    var selector = 'needs-validation';
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName(selector); // Loop over them and prevent submission

      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (e) {
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  }();
  /**
   * Input fields formatter
   * @requires https://github.com/nosir/cleave.js
  */


  var inputFormatter = function () {
    var input = document.querySelectorAll('[data-format]');
    if (input.length === 0) return;

    for (var i = 0; i < input.length; i++) {
      var inputFormat = input[i].dataset.format,
          blocks = input[i].dataset.blocks,
          delimiter = input[i].dataset.delimiter;
      blocks = blocks !== undefined ? blocks.split(' ').map(Number) : '';
      delimiter = delimiter !== undefined ? delimiter : ' ';

      switch (inputFormat) {
        case 'card':
          var card = new Cleave(input[i], {
            creditCard: true
          });
          break;

        case 'cvc':
          var cvc = new Cleave(input[i], {
            numeral: true,
            numeralIntegerScale: 3
          });
          break;

        case 'date':
          var date = new Cleave(input[i], {
            date: true,
            datePattern: ['m', 'y']
          });
          break;

        case 'date-long':
          var dateLong = new Cleave(input[i], {
            date: true,
            delimiter: '-',
            datePattern: ['Y', 'm', 'd']
          });
          break;

        case 'time':
          var time = new Cleave(input[i], {
            time: true,
            datePattern: ['h', 'm']
          });
          break;

        case 'custom':
          var custom = new Cleave(input[i], {
            delimiter: delimiter,
            blocks: blocks
          });
          break;

        default:
          console.error('Sorry, your format ' + inputFormat + ' is not available. You can add it to the theme object method - inputFormatter in src/js/theme.js or choose one from the list of available formats: card, cvc, date, date-long, time or custom.');
      }
    }
  }();
  /**
   * Anchor smooth scrolling
   * @requires https://github.com/cferdinandi/smooth-scroll/
  */


  var smoothScroll = function () {
    var selector = '[data-scroll]',
        fixedHeader = '[data-scroll-header]',
        scroll = new SmoothScroll(selector, {
      speed: 800,
      speedAsDuration: true,
      offset: 40,
      header: fixedHeader,
      updateURL: false
    });
  }();
  /**
   * Animate scroll to top button in/off view
  */


  var scrollTopButton = function () {
    var element = document.querySelector('.btn-scroll-top'),
        scrollOffset = 600;
    if (element == null) return;
    var offsetFromTop = parseInt(scrollOffset, 10);
    window.addEventListener('scroll', function (e) {
      if (e.currentTarget.pageYOffset > offsetFromTop) {
        element.classList.add('show');
      } else {
        element.classList.remove('show');
      }
    });
  }();
  /**
   * Tooltip
   * @requires https://getbootstrap.com
   * @requires https://popper.js.org/
  */


  var tooltip = function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover'
      });
    });
  }();
  /**
   * Popover
   * @requires https://getbootstrap.com
   * @requires https://popper.js.org/
  */


  var popover = function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }();
  /**
   * Toast
   * @requires https://getbootstrap.com
  */


  var toast = function () {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
  }();
  /**
   * Ajaxify MailChimp subscription form
  */


  var subscriptionForm = function () {
    var form = document.querySelectorAll('.subscription-form');
    if (form === null) return;

    var _loop3 = function _loop3(i) {
      var button = form[i].querySelector('button[type="submit"]'),
          buttonText = button.innerHTML,
          input = form[i].querySelector('.form-control'),
          antispam = form[i].querySelector('.subscription-form-antispam'),
          status = form[i].querySelector('.subscription-status');
      form[i].addEventListener('submit', function (e) {
        if (e) e.preventDefault();
        if (antispam.value !== '') return;
        register(this, button, input, buttonText, status);
      });
    };

    for (var i = 0; i < form.length; i++) {
      _loop3(i);
    }

    var register = function register(form, button, input, buttonText, status) {
      button.innerHTML = 'Sending...'; // Get url for MailChimp

      var url = form.action.replace('/post?', '/post-json?'); // Add form data to object

      var data = '&' + input.name + '=' + encodeURIComponent(input.value); // Create and add post script to the DOM

      var script = document.createElement('script');
      script.src = url + '&c=callback' + data;
      document.body.appendChild(script); // Callback function

      var callback = 'callback';

      window[callback] = function (response) {
        // Remove post script from the DOM
        delete window[callback];
        document.body.removeChild(script); // Change button text back to initial

        button.innerHTML = buttonText; // Display content and apply styling to response message conditionally

        if (response.result == 'success') {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          status.classList.remove('status-error');
          status.classList.add('status-success');
          status.innerHTML = response.msg;
          setTimeout(function () {
            input.classList.remove('is-valid');
            status.innerHTML = '';
            status.classList.remove('status-success');
          }, 6000);
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          status.classList.remove('status-success');
          status.classList.add('status-error');
          status.innerHTML = response.msg.substring(4);
          setTimeout(function () {
            input.classList.remove('is-invalid');
            status.innerHTML = '';
            status.classList.remove('status-error');
          }, 6000);
        }
      };
    };
  }();
  /**
   * View switcher
  */


  var viewSwitcher = function () {
    var switcher = document.querySelectorAll('[data-view]');

    if (switcher.length > 0) {
      for (var i = 0; i < switcher.length; i++) {
        switcher[i].addEventListener('click', function (e) {
          var target = this.dataset.view;
          viewSwitch(target);
          if (this.getAttribute('href') === '#') e.preventDefault();
        });
      }
    }

    var viewSwitch = function viewSwitch(target) {
      var targetView = document.querySelector(target),
          targetParent = targetView.parentNode,
          siblingViews = targetParent.querySelectorAll('.view');

      for (var n = 0; n < siblingViews.length; n++) {
        siblingViews[n].classList.remove('show');
      }

      targetView.classList.add('show');
    };
  }();
  /**
   * Content carousel with extensive options to control behaviour and appearance
   * @requires https://github.com/ganlanyuan/tiny-slider
  */


  var carousel = function () {
    // forEach function
    var forEach = function forEach(array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    }; // Carousel initialization


    var carousels = document.querySelectorAll('.tns-carousel-wrapper .tns-carousel-inner');
    forEach(carousels, function (index, value) {
      var defaults = {
        container: value,
        controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
        navPosition: 'top',
        controlsPosition: 'top',
        mouseDrag: true,
        speed: 600,
        autoplayHoverPause: true,
        autoplayButtonOutput: false
      };
      var userOptions;
      if (value.dataset.carouselOptions != undefined) userOptions = JSON.parse(value.dataset.carouselOptions);

      var options = _objectSpread(_objectSpread({}, defaults), userOptions);

      var carousel = tns(options);
    });
  }();
  /**
   * Countdown timer
  */


  var countdown = function () {
    var coundown = document.querySelectorAll('.countdown');
    if (coundown == null) return;

    var _loop4 = function _loop4(i) {
      var endDate = coundown[i].dataset.countdown,
          daysVal = coundown[i].querySelector('.countdown-days .countdown-value'),
          hoursVal = coundown[i].querySelector('.countdown-hours .countdown-value'),
          minutesVal = coundown[i].querySelector('.countdown-minutes .countdown-value'),
          secondsVal = coundown[i].querySelector('.countdown-seconds .countdown-value'),
          days = void 0,
          hours = void 0,
          minutes = void 0,
          seconds = void 0;
      endDate = new Date(endDate).getTime();
      if (isNaN(endDate)) return {
        v: void 0
      };
      setInterval(calculate, 1000);

      function calculate() {
        var startDate = new Date().getTime();
        var timeRemaining = parseInt((endDate - startDate) / 1000);

        if (timeRemaining >= 0) {
          days = parseInt(timeRemaining / 86400);
          timeRemaining = timeRemaining % 86400;
          hours = parseInt(timeRemaining / 3600);
          timeRemaining = timeRemaining % 3600;
          minutes = parseInt(timeRemaining / 60);
          timeRemaining = timeRemaining % 60;
          seconds = parseInt(timeRemaining);

          if (daysVal != null) {
            daysVal.innerHTML = parseInt(days, 10);
          }

          if (hoursVal != null) {
            hoursVal.innerHTML = hours < 10 ? '0' + hours : hours;
          }

          if (minutesVal != null) {
            minutesVal.innerHTML = minutes < 10 ? '0' + minutes : minutes;
          }

          if (secondsVal != null) {
            secondsVal.innerHTML = seconds < 10 ? '0' + seconds : seconds;
          }
        } else {
          return;
        }
      }
    };

    for (var i = 0; i < coundown.length; i++) {
      var _ret = _loop4(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }
  }();
  /**
   * Lightbox component for presenting various types of media
   * @requires https://github.com/sachinchoolur/lightgallery.js
  */


  var gallery = function () {
    var gallery = document.querySelectorAll('.gallery');

    if (gallery.length) {
      for (var i = 0; i < gallery.length; i++) {
        lightGallery(gallery[i], {
          selector: '.gallery-item',
          download: false,
          videojs: true,
          youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0
          },
          vimeoPlayerParams: {
            byline: 0,
            portrait: 0
          }
        });
      }
    }
  }();
  /**
   * Mouse move parallax effect
   * @requires https://github.com/wagerfield/parallax
  */


  var parallax = function () {
    var element = document.querySelectorAll('.parallax');

    for (var i = 0; i < element.length; i++) {
      var parallaxInstance = new Parallax(element[i]);
    }
  }();
  /**
   * Progress radial (circle)
   * @requires https://github.com/kimmobrunfeldt/progressbar.js
  */


  var progressRadial = function () {
    var progressRadial = document.querySelectorAll('[data-progress-radial]');
    if (progressRadial === null) return; // Default options

    var defaultOptions = {
      strokeWidth: 6,
      trailWidth: 6,
      color: '#1e212c',
      trailColor: '#e5e8ed',
      easing: 'easeInOut',
      duration: 1000,
      svgStyle: null
    }; // Loop through the items

    for (var i = 0; i < progressRadial.length; i++) {
      // User options
      var userOptions = void 0;
      if (progressRadial[i].dataset.progressRadial.length > 0) userOptions = JSON.parse(progressRadial[i].dataset.progressRadial); // Combine default and user options into one object

      var options = _objectSpread(_objectSpread({}, defaultOptions), userOptions); // Init the core plugin


      var progressRadialInit = new ProgressBar.Circle(progressRadial[i], options); // Check if the progress value set

      var progress = userOptions != undefined ? userOptions.progress : 0.75; // Animate Circle Progress to set value

      progressRadialInit.animate(progress); // progress: number from 0.0 to 1.0
    }
  }();
  /**
   * Switch price inside pricing plans
  */


  var priceSwitch = function () {
    var pricing = document.querySelectorAll('.pricing-wrap');
    if (pricing === null) return;

    var _loop5 = function _loop5(i) {
      var priceSwitch = pricing[i].querySelector('.switch'),
          priceSwitchInput = priceSwitch.querySelector('input[type="checkbox"]'),
          priceElement = pricing[i].querySelectorAll('.price');

      var changeState = function changeState() {
        if (priceSwitchInput.checked) {
          priceSwitch.parentNode.classList.add('price-switch-on');

          for (var n = 0; n < priceElement.length; n++) {
            priceElement[n].innerHTML = priceElement[n].dataset.newPrice;
          }
        } else {
          priceSwitch.parentNode.classList.remove('price-switch-on');

          for (var m = 0; m < priceElement.length; m++) {
            priceElement[m].innerHTML = priceElement[m].dataset.currentPrice;
          }
        }
      };

      changeState();
      priceSwitchInput.addEventListener('change', function () {
        changeState();
      });
    };

    for (var i = 0; i < pricing.length; i++) {
      _loop5(i);
    }
  }();
  /**
   * Open YouTube / Vimeo video in lightbox
   * @requires https://github.com/sachinchoolur/lightgallery.js
  */


  var videoPopup = function () {
    var button = document.querySelectorAll('[data-gallery-video]');

    if (button.length) {
      for (var i = 0; i < button.length; i++) {
        lightGallery(button[i], {
          selector: 'this',
          download: false,
          videojs: true,
          youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0
          },
          vimeoPlayerParams: {
            byline: 0,
            portrait: 0
          }
        });
      }
    }
  }();
  /**
   * Filter list of items by typing in the search field
   *
  */


  var dataFilter = function () {
    var filterListWidget = document.querySelectorAll('.filter');

    var _loop6 = function _loop6(i) {
      var filterInput = filterListWidget[i].querySelector('.filter-search'),
          filterList = filterListWidget[i].querySelector('.filter-list'),
          filterItems = filterList.querySelectorAll('.filter-item');

      if (!filterInput) {
        return "continue";
      }

      filterInput.addEventListener('keyup', filterListFunc);

      function filterListFunc() {
        var filterValue = filterInput.value.toLowerCase();

        for (var _i = 0; _i < filterItems.length; _i++) {
          var filterText = filterItems[_i].querySelector('.filter-item-text').innerHTML;

          if (filterText.toLowerCase().indexOf(filterValue) > -1) {
            filterItems[_i].classList.remove('d-none');
          } else {
            filterItems[_i].classList.add('d-none');
          }
        }
      }
    };

    for (var i = 0; i < filterListWidget.length; i++) {
      var _ret2 = _loop6(i);

      if (_ret2 === "continue") continue;
    }
  }();
  /**
   * Range slider
   * @requires https://github.com/leongersen/noUiSlider
  */


  var rangeSlider = function () {
    var rangeSliderWidget = document.querySelectorAll('.range-slider');

    var _loop7 = function _loop7(i) {
      var rangeSlider = rangeSliderWidget[i].querySelector('.range-slider-ui'),
          valueMinInput = rangeSliderWidget[i].querySelector('.range-slider-value-min'),
          valueMaxInput = rangeSliderWidget[i].querySelector('.range-slider-value-max');
      var options = {
        dataStartMin: parseInt(rangeSliderWidget[i].dataset.startMin, 10),
        dataStartMax: parseInt(rangeSliderWidget[i].dataset.startMax, 10),
        dataMin: parseInt(rangeSliderWidget[i].dataset.min, 10),
        dataMax: parseInt(rangeSliderWidget[i].dataset.max, 10),
        dataStep: parseInt(rangeSliderWidget[i].dataset.step, 10)
      };
      noUiSlider.create(rangeSlider, {
        start: [options.dataStartMin, options.dataStartMax],
        connect: true,
        step: options.dataStep,
        pips: {
          mode: 'count',
          values: 5
        },
        tooltips: true,
        range: {
          'min': options.dataMin,
          'max': options.dataMax
        },
        format: {
          to: function to(value) {
            return '$' + parseInt(value, 10);
          },
          from: function from(value) {
            return Number(value);
          }
        }
      });

      if (valueMinInput !== null && valueMaxInput !== null) {
        rangeSlider.noUiSlider.on('update', function (values, handle) {
          var value = values[handle];
          value = value.replace(/\D/g, '');

          if (handle) {
            valueMaxInput.value = Math.round(value);
          } else {
            valueMinInput.value = Math.round(value);
          }
        });
        valueMinInput.addEventListener('change', function () {
          rangeSlider.noUiSlider.set([this.value, null]);
        });
        valueMaxInput.addEventListener('change', function () {
          rangeSlider.noUiSlider.set([null, this.value]);
        });
      }
    };

    for (var i = 0; i < rangeSliderWidget.length; i++) {
      _loop7(i);
    }
  }();
  /**
   * Filter and Sort grid of items
   * @requires https://github.com/patrickkunka/mixitup
  */


  var filterSort = function () {
    var grid = document.querySelectorAll('[data-filter-grid]'),
        filterGrid;
    if (grid === null) return;

    for (var i = 0; i < grid.length; i++) {
      filterGrid = mixitup(grid[i], {
        selectors: {
          target: '.grid-item'
        },
        controls: {
          scope: 'local'
        },
        classNames: {
          block: '',
          elementFilter: '',
          modifierActive: 'active'
        },
        animation: {
          duration: 350
        }
      });
    }
  }();
  /**
   * Bind different content to different navs or even accordion.
  */


  var bindedContent = function () {
    var toggles = document.querySelectorAll('[data-binded-content]'),
        bindedContent = document.querySelector('.binded-content'); // Get target element siblings

    var getSiblings = function getSiblings(elem) {
      var siblings = [],
          sibling = elem.parentNode.firstChild;

      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
          siblings.push(sibling);
        }

        sibling = sibling.nextSibling;
      }

      return siblings;
    };

    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (e) {
        var targetEl = document.querySelector(e.currentTarget.dataset.bindedContent),
            targetSiblings = getSiblings(targetEl);
        targetSiblings.map(function (sibling) {
          sibling.classList.remove('active');
        });
        targetEl.classList.add('active');
      });
    }
  }();
  /**
   * Show / hide sidebar with filters in shop catalog
  */


  var filtersShowHide = function () {
    var openFiltersBtn = document.querySelector('[data-filters-show]'),
        closeFiltersBtn = document.querySelector('[data-filters-hide]'),
        filtersColumns = document.querySelector('[data-filters-columns]');
    if (filtersColumns === null) return;
    closeFiltersBtn.addEventListener('click', function (e) {
      var target = e.target.dataset.filtersHide;
      closeFiltersBtn.classList.remove('d-lg-block');
      openFiltersBtn.classList.remove('d-lg-none');
      document.querySelector(target).classList.add('d-lg-none');
      filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
    });
    openFiltersBtn.addEventListener('click', function (e) {
      var target = e.target.dataset.filtersShow;
      closeFiltersBtn.classList.add('d-lg-block');
      openFiltersBtn.classList.add('d-lg-none');
      document.querySelector(target).classList.remove('d-lg-none');
      filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3';
    });
  }();
  /**
   * Updated the text of the label when radio button changes (mainly for color options)
  */


  var labeUpdate = function () {
    var radioBtns = document.querySelectorAll('[data-label]');

    for (var i = 0; i < radioBtns.length; i++) {
      radioBtns[i].addEventListener('change', function () {
        var target = this.dataset.label;

        try {
          document.getElementById(target).textContent = this.value;
        } catch (err) {
          if (err.message = "Cannot set property 'textContent' of null") {
            console.error('Make sure the [data-label] matches with the id of the target element you want to change text of!');
          }
        }
      });
    }
  }();
})();