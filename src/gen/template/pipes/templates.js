const lazypipe = require('lazypipe');
const File = require('stream-render-pipeline');

class TemplateFiles extends File
{
  constructor(opts)
  {
    super(opts);
  }

  get render()
  {
    let {tplName} = this.opts;

    return lazypipe()
      .pipe( this.src(__dirname, '*.hbs') )
      .pipe( this.tpl(this.opts) )
      .pipe(this.rename, (file) => { // Directory and filename
        if (file.basename.includes('ssml')) {
          file.dirname = './speech';
        } else if (file.basename.includes('body')) {
          file.dirname = './display';
        }
        file.basename = file.basename.replace('template', tplName);
      });
  }
}

module.exports = TemplateFiles;
