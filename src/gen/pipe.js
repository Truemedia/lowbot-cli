class Pipe
{
  tplPath(cwd, relativePath)
  {
    return `${cwd}/../templates/${relativePath}`;
  }
}

module.exports = Pipe;
