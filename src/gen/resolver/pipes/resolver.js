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
    let {resolverName, templateName} = this.opts;

    return lazypipe()
      .pipe( this.src(__dirname, '*.js'))
      .pipe( this.tpl({resolverName, templateName}) )
      .pipe(this.rename, (file) => { // Directory and filename
        file.basename = file.basename.replace('template', resolverName);
      });
  }
}

module.exports = ResolverFile;
