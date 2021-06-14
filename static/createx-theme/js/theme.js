/**
 * Createx | Multipurpose Bootstrap Template
 * Copyright 2021 Createx Studio
 * Theme core scripts
 * 
 * @author Createx Studio
 * @version 2.0
 */


;(function ($) {
  'use strict';

  const theme = {

    /**
     * Theme's components/functions list
     * Comment out or delete the unnecessary component.
     * Some component have dependencies (plugins). Do not forget to remove dependency.
    */

    init: () => {
      theme.stickyNavbar();
      theme.filterableGrid();
      theme.customFileInput();
      theme.passwordVisibilityToggle();
      theme.fileDropArea();
      theme.labelUpdate();
      theme.formValidation();
      theme.inputFormatter();
      theme.multilevelDropdown();
      theme.offcanvas();
      theme.tooltips();
      theme.popovers();
      theme.smoothScroll();
      theme.scrollTopButton();
      theme.carousel();
      theme.gallery();
      theme.videoPopupBtn();
      theme.countdown();
      theme.priceSwitch();
      theme.rangeSlider();
      theme.radialProgress();
      theme.filterList();
      theme.ajaxifySubscribeForm();
      theme.parallax();
      theme.bindedContent();
      theme.viewSwitcher();
      theme.sidebarSticky();
      theme.filtersShowHide();
    },


    /**
     * Enable sticky behaviour of navigation bar on page scroll
     * @memberof theme
     * @method stickyNavbar
    */
    stickyNavbar: () => {

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

    },
  

    /**
     * Filter and Sort grid of items
     * @memberof theme
     * @method filterableGrid
     * @requires https://github.com/patrickkunka/mixitup
    */
    filterableGrid: () => {

      let grid = document.querySelectorAll('[data-filter-grid]'),
          filterGrid;

      if (grid === null) return;
      
      for (let i = 0; i < grid.length; i++) {
        filterGrid = mixitup(grid[i], {
          selectors: {
            target: '.cs-grid-item'
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
    },


    /**
     * Custom file input
     * @memberof theme
     * @method customFileInput
     * @requires https://www.npmjs.com/package/bs-custom-file-input
    */
    customFileInput: () => {
        
      if (typeof bsCustomFileInput !== 'object') return;
      bsCustomFileInput.init();

    },


    /**
     * Toggling password visibility in password input
     * @memberof theme
     * @method passwordVisibilityToggle
    */
    passwordVisibilityToggle: () => {

      let elements = document.querySelectorAll('.cs-password-toggle');

      for (let i = 0; i < elements.length; i++) {
        let passInput = elements[i].querySelector('.form-control'),
        passToggle = elements[i].querySelector('.cs-password-toggle-btn');
    
        passToggle.addEventListener('click', (e) => {
          
          if (e.target.type !== 'checkbox') return;
          if (e.target.checked) {
            passInput.type = 'text';
          } else {
            passInput.type = 'password';
          }

        }, false);
      }
    },


    /**
     * Custom file drag and drop area
     * @memberof theme
     * @method fileDropArea
    */
    fileDropArea: () => {

      let fileArea = document.querySelectorAll('.cs-file-drop-area');

      for (let i = 0; i < fileArea.length; i++) {
        let input = fileArea[i].querySelector('.cs-file-drop-input'),
            message = fileArea[i].querySelector('.cs-file-drop-message'),
            icon = fileArea[i].querySelector('.cs-file-drop-icon'),
            button = fileArea[i].querySelector('.cs-file-drop-btn');
        
        button.addEventListener('click', function() {
          input.click();
        });

        input.addEventListener('change', function() {
          if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              let fileData = e.target.result;
              let fileName = input.files[0].name;
              message.innerHTML = fileName;

              if (fileData.startsWith('data:image')) {

                let image = new Image();
                image.src = fileData;

                image.onload = function() {
                  icon.className = 'cs-file-drop-preview';
                  icon.innerHTML = '<img class="img-thumbnail rounded" src="' + image.src + '" alt="' + fileName + '">';
                }

              } else if (fileData.startsWith('data:video')) {
                icon.innerHTML = '';
                icon.className = '';
                icon.className = 'cs-file-drop-icon cxi-video';

              } else {
                icon.innerHTML = '';
                icon.className = '';
                icon.className = 'cs-file-drop-icon cxi-files';
              }
            }
            reader.readAsDataURL(input.files[0]);
          }

        });
      }
    },


    /**
     * Updated the text of the label when radio button changes (mainly for color options)
     * @memberof theme
     * @method labelUpdate
    */
    labelUpdate: () => {

      let radioBtns = document.querySelectorAll('[data-label]');

      for (let i = 0; i < radioBtns.length; i++ ) {
        radioBtns[i].addEventListener('change', function() {
          let target = this.dataset.label;
          try {
            document.getElementById(target).textContent = this.value;
          }
          catch(err) {
            if (err.message = "Cannot set property 'textContent' of null") {
              console.error('Make sure the [data-label] matches with the id of the target element you want to change text of!');
            }
          }
        });
      }
    },


    /**
     * From validation
     * @memberof theme
     * @method formValidation
    */
    formValidation: () => {

      let selector = 'needs-validation';

      window.addEventListener('load', () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName(selector);
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, (form) => {
          form.addEventListener('submit', (e) => {
            if (form.checkValidity() === false) {
              e.preventDefault();
              e.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    },


    /**
     * From validation
     * @memberof theme
     * @method inputFormatter
     * @requires https://github.com/nosir/cleave.js
    */
    inputFormatter: () => {

      let input = document.querySelectorAll('[data-format]');
      if(input.length === 0) return;

      for(let i = 0; i < input.length; i++) {
        let inputFormat = input[i].dataset.format,
            blocks = input[i].dataset.blocks,
            delimiter = input[i].dataset.delimiter;

        blocks = (blocks !== undefined) ? blocks.split(' ').map(Number) : '';

        delimiter = (delimiter !== undefined) ? delimiter : ' ';

        switch (inputFormat) {
          case 'card':
            let card = new Cleave(input[i], {
              creditCard: true
            });
            break;
          case 'cvc':
            let cvc = new Cleave(input[i], {
              numeral: true,
              numeralIntegerScale: 3
            });
            break;
          case 'date':
            let date = new Cleave(input[i], {
              date: true,
              datePattern: ['m', 'y']
            });
            break;
          case 'date-long':
            let dateLong = new Cleave(input[i], {
              date: true,
              delimiter: '-',
              datePattern: ['Y', 'm', 'd']
            });
            break;
          case 'time':
            let time = new Cleave(input[i], {
              time: true,
              datePattern: ['h', 'm']
            });
            break;
          case 'custom':
            let custom = new Cleave(input[i], {
              delimiter: delimiter,
              blocks: blocks
            });
            break;
          default:
            console.error('Sorry, your format ' + inputFormat + ' is not available. You can add it to the theme object method - inputFormatter in src/js/theme.js or choose one from the list of available formats: card, cvc, date, date-long, time or custom.')
        }
      }
    },


    /**
     * Multilevel dropdown
     * @memberof theme
     * @method multilevelDropdown
     * @requires https://jquery.com/
     * @requires https://getbootstrap.com
    */
    multilevelDropdown: function () {

      let selector = ".dropdown-menu [data-toggle='dropdown']";

      $(selector).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).siblings().toggleClass('show');

        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
          $('.dropdown-submenu .show').removeClass('show');
        });
      });
    },


    /**
     * Off-canvas toggler
     * @memberof theme
     * @method offcanvas
    */
    offcanvas: function () {

      const offcanvasTogglers = document.querySelectorAll('[data-toggle="offcanvas"]'),
            offcanvasDismissers = document.querySelectorAll('[data-dismiss="offcanvas"]'),
            offcanvas = document.querySelectorAll('.cs-offcanvas'),
            docBody = document.body,
            fixedElements = document.querySelectorAll('[data-fixed-element]'),
            hasScrollbar = window.innerWidth > docBody.clientWidth;
      
      // Creating backdrop
      const backdrop = document.createElement('div');
      backdrop.classList.add('cs-offcanvas-backdrop');

      // Open off-canvas function
      const offcanvasOpen = (offcanvasID, toggler) => {
        docBody.appendChild(backdrop);
        setTimeout(() => {
          backdrop.classList.add('show');
        }, 20);
        document.getElementById(offcanvasID).classList.add('show');
        if (hasScrollbar) {
          docBody.style.paddingRight = '15px';
          if (fixedElements.length) {
            for (let i = 0; i < fixedElements.length; i++) {
              fixedElements[i].classList.add('right-15');
            }
          }
        }
        docBody.classList.add('cs-offcanvas-open');
      };

      // Close off-canvas function
      const offcanvasClose = () => {
        for (let i = 0; i < offcanvas.length; i++) {
          offcanvas[i].classList.remove('show');
        }
        backdrop.classList.remove('show');
        setTimeout(() => {
          docBody.removeChild(backdrop);
        }, 50);
        if (hasScrollbar) {
          docBody.style.paddingRight = 0;
          if (fixedElements.length) {
            for (let i = 0; i < fixedElements.length; i++) {
              fixedElements[i].classList.remove('right-15');
            }
          }
        }
        docBody.classList.remove('cs-offcanvas-open');
      }

      // Open off-canvas event handler
      for (let i = 0; i < offcanvasTogglers.length; i++) {
        offcanvasTogglers[i].addEventListener('click', (e) => {
          e.preventDefault();
          offcanvasOpen(e.currentTarget.dataset.target, e.currentTarget);
        });
      }

      // Close off-canvas event handler
      for (let i = 0; i < offcanvasDismissers.length; i++) {
        offcanvasDismissers[i].addEventListener('click', (e) => {
          e.preventDefault();
          offcanvasClose();
        });
      }

      // Close off-canvas by clicking on backdrop
      document.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'cs-offcanvas-backdrop') {
          offcanvasClose();
        }
      });
    },


    /**
     * Tooltips
     * @memberof theme
     * @method tooltips
     * @requires https://jquery.com/
     * @requires https://getbootstrap.com
     * @requires https://popper.js.org/
    */
    tooltips: () => {

      let selector = $('[data-toggle="tooltip"]');

      selector.tooltip({
        trigger: 'hover'
      });
    },


    /**
     * Popovers
     * @memberof theme
     * @method popovers
     * @requires https://jquery.com/
     * @requires https://getbootstrap.com
     * @requires https://popper.js.org/
    */
    popovers: () => {

      let selector = $('[data-toggle="popover"]');

      selector.popover();
    },


    /**
     * Anchor smooth scrolling
     * @memberof theme
     * @method smoothScroll
     * @requires https://github.com/cferdinandi/smooth-scroll/
    */
    smoothScroll: () => {
        
      let selector = '[data-scroll]',
          fixedHeader = '[data-scroll-header]',
          scroll = new SmoothScroll(selector, {
            speed: 700,
            speedAsDuration: true,
            offset: 40,
            header: fixedHeader,
            updateURL: false
          });
    },
    
    
    /**
     * Animate scroll to top button in/off view
     * @memberof theme
     * @method scrollTopButton
    */
    scrollTopButton: () => {

      let element = document.querySelector('.btn-scroll-top'),
          scrollOffset = 600;

      if (element == null) return;

      let offsetFromTop = parseInt(scrollOffset, 10);

      window.addEventListener('scroll', (e) => {
        if (e.currentTarget.pageYOffset > offsetFromTop) {
          element.classList.add('show');
        } else {
          element.classList.remove('show');
        }
      });
    },


    /**
     * Content carousel with extensive options to control behaviour and appearance
     * @memberof theme
     * @method carousel
     * @requires https://github.com/ganlanyuan/tiny-slider
    */
    carousel: () => {

      // forEach function
      let forEach = function (array, callback, scope) {
        for (let i = 0; i < array.length; i++) {
          callback.call(scope, i, array[i]); // passes back stuff we need
        }
      };
      
      // Carousel initialization
      let carousels = document.querySelectorAll('.cs-carousel .cs-carousel-inner');
      forEach(carousels, function (index, value) {
        let defaults = {
          container: value,
          controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
          navPosition: 'top',
          controlsPosition: 'top',
          mouseDrag: true,
          speed: 600,
          autoplayHoverPause: true,
          autoplayButtonOutput: false
        };
        let userOptions;
        if(value.dataset.carouselOptions != undefined) userOptions = JSON.parse(value.dataset.carouselOptions);
        let options = {...defaults, ...userOptions};
        let carousel = tns(options);
      });
    },


    /**
     * Lightbox component for presenting various types of media
     * @memberof theme
     * @method gallery
     * @requires https://github.com/sachinchoolur/lightgallery.js
    */
    gallery: () => {

      let gallery = document.querySelectorAll('.cs-gallery');
      if (gallery.length) {
        for (let i = 0; i < gallery.length; i++) {
          lightGallery(gallery[i], {
            selector: '.cs-gallery-item',
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
    },


    /**
     * Open YouTube / Vimeo video in lightbox
     * @memberof theme
     * @method videoPopupBtn
     * @requires https://github.com/sachinchoolur/lightgallery.js
    */
    videoPopupBtn: () => {

      let button = document.querySelectorAll('[data-gallery-video]');
      if (button.length) {
        for (let i = 0; i < button.length; i++) {
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
    },


    /**
     * Countdown Timer
     * @memberof theme
     * @method countdown
    */
    countdown: () => {

      let coundown = document.querySelectorAll('.cs-countdown');

      if (coundown == null) return;

      for (let i = 0; i < coundown.length; i++) {

        let endDate = coundown[i].dataset.countdown,
            daysVal = coundown[i].querySelector('.cs-countdown-days .cs-countdown-value'),
            hoursVal = coundown[i].querySelector('.cs-countdown-hours .cs-countdown-value'),
            minutesVal = coundown[i].querySelector('.cs-countdown-minutes .cs-countdown-value'),
            secondsVal = coundown[i].querySelector('.cs-countdown-seconds .cs-countdown-value'),
            days, hours, minutes, seconds;
        
        endDate = new Date(endDate).getTime();

        if (isNaN(endDate)) return;

        setInterval(calculate, 1000);

        function calculate() {
          let startDate = new Date().getTime();
          
          let timeRemaining = parseInt((endDate - startDate) / 1000);
          
          if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);
            
            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);
            
            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            
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
      }
    },


    /**
     * Switch price inside pricing plans
     * @memberof theme
     * @method priceSwitch
    */
    priceSwitch: () => {
      
      let pricing = document.querySelectorAll('.cs-pricing-wrap');

      if (pricing === null) return;

      for (let i = 0; i < pricing.length; i++) {

        let priceSwitch = pricing[i].querySelector('.cs-switch'),
            priceSwitchInput = priceSwitch.querySelector('input[type="checkbox"]'),
            priceElement = pricing[i].querySelectorAll('.cs-price');

        let changeState = () => {
          if(priceSwitchInput.checked) {
            priceSwitch.parentNode.classList.add('cs-price-switch-on');

            for (let n = 0; n < priceElement.length; n++) {
              priceElement[n].innerHTML = priceElement[n].dataset.newPrice;
            }

          } else {
            priceSwitch.parentNode.classList.remove('cs-price-switch-on');

            for (let m = 0; m < priceElement.length; m++) {
              priceElement[m].innerHTML = priceElement[m].dataset.currentPrice;
            }
          }
        }
        changeState();
            
        priceSwitchInput.addEventListener('change', function() {
          changeState();
        });        
      }
    },


    /**
     * Range slider
     * @memberof theme
     * @method rangeSlider
     * @requires https://github.com/leongersen/noUiSlider
    */
    rangeSlider: () => {

      let rangeSliderWidget = document.querySelectorAll('.cs-range-slider');

      for (let i = 0; i < rangeSliderWidget.length; i++) {

        let rangeSlider = rangeSliderWidget[i].querySelector('.cs-range-slider-ui'),
            valueMinInput = rangeSliderWidget[i].querySelector('.cs-range-slider-value-min'),
            valueMaxInput = rangeSliderWidget[i].querySelector('.cs-range-slider-value-max');

        let options = {
          dataStartMin: parseInt(rangeSliderWidget[i].dataset.startMin, 10),
          dataStartMax: parseInt(rangeSliderWidget[i].dataset.startMax, 10),
          dataMin: parseInt(rangeSliderWidget[i].dataset.min, 10),
          dataMax: parseInt(rangeSliderWidget[i].dataset.max, 10),
          dataStep: parseInt(rangeSliderWidget[i].dataset.step, 10)
        }

        noUiSlider.create(rangeSlider, {
          start: [options.dataStartMin, options.dataStartMax],
          connect: true,
          step: options.dataStep,
          pips: {mode: 'count', values: 5},
          tooltips: true,
          range: {
            'min': options.dataMin,
            'max': options.dataMax
          },
          format: {
            to: function (value) {
              return '$' + parseInt(value, 10);
            },
            from: function (value) {
              return Number(value);
            }
          }
        });

        if (valueMinInput !== null && valueMaxInput !== null) {
          
          rangeSlider.noUiSlider.on('update', (values, handle) => {
            let value = values[handle];
            value = value.replace(/\D/g,'');
            if (handle) {
              valueMaxInput.value = Math.round(value);
            } else {
              valueMinInput.value = Math.round(value);
            }
          });
    
          valueMinInput.addEventListener('change', function() {
            rangeSlider.noUiSlider.set([this.value, null]);
          });
    
          valueMaxInput.addEventListener('change', function() {
            rangeSlider.noUiSlider.set([null, this.value]);
          });
        }
      }
    },


    /**
     * Radial Progress
     * @memberof theme
     * @method radialProgress
     * @requires https://github.com/kimmobrunfeldt/progressbar.js
     * 
    */
    radialProgress: () => {

      const progressRadial = document.querySelectorAll('[data-progress-radial]');

      if (progressRadial === null) return;

      // Default options
      const defaultOptions = {
        strokeWidth: 6,
        trailWidth: 6,
        color: '#1e212c',
        trailColor: '#e5e8ed',
        easing: 'easeInOut',
        duration: 1000,
        svgStyle: null
      }

      // Loop through the items
      for (let i = 0; i < progressRadial.length; i++) {

        // User options
        let userOptions;
        if(progressRadial[i].dataset.progressRadial.length > 0) userOptions = JSON.parse(progressRadial[i].dataset.progressRadial);

        // Combine default and user options into one object
        const options = {...defaultOptions, ...userOptions}

        // Init the core plugin
        const progressRadialInit = new ProgressBar.Circle(progressRadial[i], options);

        // Check if the progress value set
        let progress = userOptions != undefined ? userOptions.progress : 0.75;

        // Animate Circle Progress to set value
        progressRadialInit.animate(progress); // progress: number from 0.0 to 1.0
      }
    },


    /**
     * Filter list of items by typing in the search field
     * @memberof theme
     * @method filterList
    */
    filterList: () => {

      let filterListWidget = document.querySelectorAll('.cs-filter')

      for (let i = 0; i < filterListWidget.length; i++) {
        
        let filterInput = filterListWidget[i].querySelector('.cs-filter-search'),
            filterList = filterListWidget[i].querySelector('.cs-filter-list'),
            filterItems = filterList.querySelectorAll('.cs-filter-item');

        if (! filterInput) {
          continue;
        }

        filterInput.addEventListener('keyup', filterListFunc);
        
        function filterListFunc() {
          
          let filterValue = filterInput.value.toLowerCase();
          
          for (let i = 0; i < filterItems.length; i++) {

            let filterText = filterItems[i].querySelector('.cs-filter-item-text').innerHTML;

            if(filterText.toLowerCase().indexOf(filterValue) > -1) {
              filterItems[i].classList.remove('d-none');
            } else {
              filterItems[i].classList.add('d-none');
            }

          }
          
        }
      }
    },


    /**
     * Ajaxify subscription form (MailChimp)
     * @memberof theme
     * @method ajaxifySubscribeForm
    */
    ajaxifySubscribeForm: () => {
        
      let form = document.querySelectorAll('.cs-subscribe-form');

      if (form === null) return;

      for (let i = 0; i < form.length; i++) {

        let button = form[i].querySelector('button[type="submit"]'),
            buttonText = button.innerHTML,
            input = form[i].querySelector('.form-control'),
            antispam = form[i].querySelector('.cs-subscribe-form-antispam'),
            status = form[i].querySelector('.cs-subscribe-status');
        
        form[i].addEventListener('submit', function(e) {
          if (e) e.preventDefault();
          if (antispam.value !== '') return;
          register(this, button, input, buttonText, status);
        });
      }

      let register = (form, button, input, buttonText, status) => {
        button.innerHTML = 'Sending...';

        // Get url for MailChimp
        let url = form.action.replace('/post?', '/post-json?');

        // Add form data to object
        let data = '&' + input.name + '=' + encodeURIComponent(input.value);

        // Create and add post script to the DOM
        let script = document.createElement('script');
        script.src = url + '&c=callback' + data
        document.body.appendChild(script);
        
        // Callback function
        let callback = 'callback';
        window[callback] = (response) => {

          // Remove post script from the DOM
          delete window[callback];
          document.body.removeChild(script);

          // Change button text back to initial
          button.innerHTML = buttonText;

          // Display content and apply styling to response message conditionally
          if(response.result == 'success') {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            status.classList.remove('cs-status-error');
            status.classList.add('cs-status-success');
            status.innerHTML = response.msg;
            setTimeout(() => {
              input.classList.remove('is-valid');
              status.innerHTML = '';
              status.classList.remove('cs-status-success');
            }, 6000)
          } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            status.classList.remove('cs-status-success');
            status.classList.add('cs-status-error');
            status.innerHTML = response.msg.substring(4);
            setTimeout(() => {
              input.classList.remove('is-invalid');
              status.innerHTML = '';
              status.classList.remove('cs-status-error');
            }, 6000)
          }
        }
      }
    },


    /**
		 * Mouse move parallax effect
		 * @memberof theme
		 * @method parallax
     * @requires https://github.com/wagerfield/parallax
		*/
    parallax: () => {

      let element = document.querySelectorAll('.cs-parallax');

      for (let i = 0; i < element.length; i++) {
        let parallaxInstance = new Parallax(element[i]);
      }
    },


    /**
     * Like tabs, but not tabs. Bind different content to different navs or even accordion.
     * @memberof theme
     * @method bindedContent
    */
    bindedContent: () => {

      let toggles = document.querySelectorAll('[data-binded-content]'),
          bindedContent = document.querySelector('.cs-binded-content');

      // Get target element siblings
      let getSiblings = elem => {
        let siblings = [],
            sibling = elem.parentNode.firstChild;
        while (sibling) {
          if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
          }
          sibling = sibling.nextSibling;
        }
        return siblings;
      };

      for (let i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener('click', (e) => {
          let targetEl = document.querySelector(e.currentTarget.dataset.bindedContent),
              targetSiblings = getSiblings(targetEl);
          
          targetSiblings.map((sibling) => {
            sibling.classList.remove('active');
          });

          targetEl.classList.add('active');
        });
      }
    },


    /**
		 * Switch visibility of an element
		 * @memberof theme
		 * @method viewSwitcher
		 */
		viewSwitcher: () => {
      let switcher = document.querySelectorAll('[data-view]');
      
      if (switcher.length > 0) {

        for (let i = 0; i < switcher.length; i++) {
          switcher[i].addEventListener('click', function(e) {
            let target = this.dataset.view;
            viewSwitch(target);
            if (this.getAttribute('href') === '#') e.preventDefault();
          });
        }
      }

			let viewSwitch = (target) => {
        let targetView = document.querySelector(target),
            targetParent = targetView.parentNode,
            siblingViews = targetParent.querySelectorAll('.cs-view');
        
        for (let n = 0; n < siblingViews.length; n++) {
          siblingViews[n].classList.remove('show');
        }

        targetView.classList.add('show');
      }
    },


    /**
		 * Sticky sidebar
		 * @memberof theme
		 * @method sidebarSticky
     * @requires https://github.com/abouolia/sticky-sidebar
     * @requires https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
		 */
		sidebarSticky: () => {
      let sidebar = document.querySelectorAll('.sidebar-sticky');
      
      if (sidebar.length > 0) {

        // Default options
        const defaultOptions = {
          topSpacing: 0,
          bottomSpacing: 0,
          containerSelector: false,
          innerWrapperSelector: '.sidebar-sticky-inner',
          minWidth: 0
        };

        // Loop through the instances of sticky sidebar on the page
        for (let i = 0; i < sidebar.length; i++) {

          // User options
          let userOptions;
          if(sidebar[i].dataset.sidebarStickyOptions !== undefined) userOptions = JSON.parse(sidebar[i].dataset.sidebarStickyOptions);

          // Combine default and user options into one object
          const options = {...defaultOptions, ...userOptions}

          // Init plugin
          const stickySidebar = new StickySidebar(sidebar[i], options);
        }
      }
    },


    /**
		 * Show / hide sidebar with filters in shop catalog
		 * @memberof theme
		 * @method filtersShowHide
		 */
		filtersShowHide: () => {
      const openFiltersBtn = document.querySelector('[data-filters-show]'),
            closeFiltersBtn = document.querySelector('[data-filters-hide]'),
            filtersColumns = document.querySelector('[data-filters-columns]');
      
      if (filtersColumns === null) return;
      
      closeFiltersBtn.addEventListener('click', (e) => {
        let target = e.target.dataset.filtersHide;
        closeFiltersBtn.classList.remove('d-lg-block');
        openFiltersBtn.classList.remove('d-lg-none');
        document.querySelector(target).classList.add('d-lg-none');
        filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
      });

      openFiltersBtn.addEventListener('click', (e) => {
        let target = e.target.dataset.filtersShow;
        closeFiltersBtn.classList.add('d-lg-block');
        openFiltersBtn.classList.add('d-lg-none');
        document.querySelector(target).classList.remove('d-lg-none');
        filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3';
      });    
    }
  }

  /**
   * Init theme core
  */
  
  theme.init();

})(jQuery);
