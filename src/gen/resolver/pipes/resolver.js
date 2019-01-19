const lazypipe = require('lazypipe');
const gulpPlugins = require('auto-plug')('gulp');
const Pipe = require('./../../pipe');

class Resolver extends Pipe
{
  constructor(resolverName, tplName = null)
  {
    super();
    this.resolverName = resolverName;
    this.tplName = tplName;
  }

  get pipeline()
  {
    let {resolverName, tplName} = this;

    return lazypipe()
      .pipe(gulpPlugins.addSrc, this.tplPath(__dirname, '*.js')) // Files
      .pipe(gulpPlugins.template, { // Templating
        resolverName, tplName
      })
      .pipe(gulpPlugins.rename, (file) => { // Directory and filename
        file.basename = file.basename.replace('template', resolverName);
      });
  }
}

module.exports = Resolver;
