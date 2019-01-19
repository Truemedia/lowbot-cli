const lazypipe = require('lazypipe');
const gulpPlugins = require('auto-plug')('gulp');
const PO = require('pofile');
const Pipe = require('./../../pipe');

class Locale extends Pipe
{
  constructor(localeName)
  {
    super();
    this.localeName = localeName;
  }

  get pipeline()
  {
    let {localeName} = this;
    let po = new PO();
    po.headers = {
      "X-Poedit-Basepath": "../../tpl",
      "X-Poedit-SearchPath-0": "."
    };

    return lazypipe()
      .pipe(gulpPlugins.file, `${localeName}/messages.po`, po.toString());
  }
}

module.exports = Locale;
