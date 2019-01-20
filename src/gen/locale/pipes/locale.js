const lazypipe = require('lazypipe');
const gulpPlugins = require('auto-plug')('gulp');
const PO = require('pofile');
const File = require('stream-render-pipeline');

class LocaleFile extends File
{
  constructor(opts)
  {
    super(opts);
  }

  get render()
  {
    let {localeName} = this.opts;
    let po = new PO();
    po.headers = {
      "X-Poedit-Basepath": "../../tpl",
      "X-Poedit-SearchPath-0": "."
    };

    return lazypipe()
      .pipe( this.pre(`${localeName}/messages.po`, po.toString()) );
  }
}

module.exports = LocaleFile;
