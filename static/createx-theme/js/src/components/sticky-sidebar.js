/**
 * Sticky sidebar
 * @requires https://github.com/abouolia/sticky-sidebar
 * @requires https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
*/

const stickySidebar = (() => {

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


})();

export default stickySidebar;
