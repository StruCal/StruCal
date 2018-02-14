const replace = require('replace-in-file');

const options = {
    disableGlobs: true,
    files: 'buildScripts\\buildType.ts',
    from: 'true',
    to: 'false',
  };

  replace(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });

console.log("Changed to development");