/**
  * <%= resolverName %> resolver
  * @return {Promise}
  */
module.exports = function(templater)
{
  let foo = 'bar';

  return templater.tpl('<%= templateName %>', {foo})
    .compile()
    .then(content => content.body)
    .catch(err => console.error(err));
};
