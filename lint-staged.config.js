const generateVersion = () => {
  const fs = require('fs');
  const data = fs.readFileSync('version.txt', 'utf8');

  const LIMIT = 30;
  let content = data.split('\n');
  const versionText = content[0];
  console.log('old version', versionText);
  const [first, second, third] = versionText.split('.');
  let firstNumb = parseInt(first);
  let secondNumb = parseInt(second);
  let thirdNumb = parseInt(third);
  if (thirdNumb < LIMIT) {
    thirdNumb += 1;
  } else if (secondNumb < LIMIT) {
    thirdNumb = 0;
    secondNumb += 1;
  } else if (firstNumb < LIMIT) {
    thirdNumb = 0;
    secondNumb = 0;
    firstNumb += 1;
  }
  const result = [firstNumb, secondNumb, thirdNumb].join('.');
  try {
    content[0] = `${versionText}: ${fs.readFileSync('.git/COMMIT_EDITMSG').toString().trim()}`;
  } catch (ex) {
    console.warn(ex);
  }
  content.unshift(result);
  fs.writeFileSync('version.txt', content.join('\n'), 'utf8');
  console.log('new version', result);
};

const isUpdatedVersionFile = (files) => {
  let check = false;
  files.forEach((file) => {
    if (file.includes('version.txt')) {
      check = true;
    }
  });
  return check;
};

module.exports = {
  '*': (files) => {
    if (!isUpdatedVersionFile(files)) {
      generateVersion();
    }
    return ['git add .'];
  }
};
