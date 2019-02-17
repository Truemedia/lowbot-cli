const lazypipe = require('lazypipe');
const File = require('stream-render-pipeline');

class TemplateFiles extends File
{
  constructor(opts)
  {
    super(opts);
  }

  json(destPath, doc)
  {
    let fileContents = JSON.stringify(doc);
    return lazypipe().pipe( this.pre(destPath, fileContents) );
  }

  get render()
  {
    let {tplName} = this.opts;

    return lazypipe()
      .pipe( this.src(__dirname, '*.hbs') )
      .pipe( this.tpl(this.opts) )
      .pipe( this.json('./test.json', {hello: 'world'}))
      .pipe(this.rename, (file) => { // Directory and filename
        if (file.basename.includes('ssml')) {
          file.dirname = './speech';
        } else if (file.basename.includes('body')) {
          file.dirname = './display';
        }
        if (file.basename.includes('test')) {
          file.dirname = './';
        }
        file.basename = file.basename.replace('template', tplName);
      });
  }
}

module.exports = TemplateFiles;
