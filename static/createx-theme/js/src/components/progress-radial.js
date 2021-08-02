/**
 * Progress radial (circle)
 * @requires https://github.com/kimmobrunfeldt/progressbar.js
*/

const progressRadial = (() => {

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

})();

export default progressRadial;
