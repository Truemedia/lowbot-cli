const lazypipe = require('lazypipe');
const gulpPlugins = require('auto-plug')('gulp');
const File = require('stream-render-pipeline');

class ResolverFile extends File
{
  constructor(opts)
  {
    super(opts);
  }

  get render()
  {
    let {resolverName, tplName} = this.opts;

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

module.exports = ResolverFile;
