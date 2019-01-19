const locales = require('i18n-locales');

module.exports = (function() {
  let [name, type, message] = ['localeName', 'list', 'What is the name of the locale'];
  let choices = locales;

  return {choices, message, name, type};
})();
