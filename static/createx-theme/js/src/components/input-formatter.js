/**
 * Input fields formatter
 * @requires https://github.com/nosir/cleave.js
*/

const inputFormatter = (() => {

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

})();

export default inputFormatter;
