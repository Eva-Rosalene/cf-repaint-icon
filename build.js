const esbuild = require('esbuild');
const { join } = require('path');
const fs = require('fs');
const Mustache = require('mustache');

async function main() {
  const package = JSON.parse(await fs.promises.readFile('package.json', 'utf-8'));
  const headerTemplate = await fs.promises.readFile(join('src', 'header.mustache'), 'utf-8');
  const iconContent = await fs.promises.readFile(join('src', 'cf-red-favicon.png'));
  const iconUrl = 'data:image/png;base64,' + Buffer.from(iconContent).toString('base64');
  const header = Mustache.render(headerTemplate, {
    VERSION: package.version,
    DESCRIPTION: package.description,
    AUTHOR: package.author,
    SCRIPT_ICON: iconUrl,
  });
  await esbuild.build({
    entryPoints: [join('src', 'index.js')],
    bundle: true,
    minify: true,
    outfile: join('dist', 'cf-repaint-icon.user.js'),
    loader: {
      '.png': 'dataurl',
    },
    banner: {
      js: header,
    },
  });
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
