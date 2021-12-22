/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs');
const DEPLOY_URL = 'https://github.com/doyouwannatea/dzb-client.git';
const execConfig = { fatal: true };

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.which('npm')) {
  shell.echo('Sorry, this script requires npm');
  shell.exit(1);
}

shell.exec('npm run build', execConfig);
shell.cd('dist');
shell.cp('index.html', '404.html');
shell.exec('git init', execConfig);
shell.exec('git add .', execConfig);
shell.exec('git commit -m "deploy"', execConfig);
shell.exec('git checkout -b gh-pages', execConfig);
shell.exec(`git push --force ${DEPLOY_URL} gh-pages`, execConfig);
shell.rm('-rf', '.git');
