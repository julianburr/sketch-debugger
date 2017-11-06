const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const rimraf = require('rimraf');
const AdmZip = require('adm-zip');
const chalk = require('chalk');

const DOWNLOAD_SOURCE =
  'https://github.com/abynim/Sketch-Headers/archive/master.zip';
const DOWNLOAD_TARGET = path.resolve(__dirname, '../headers/objc.zip');
const SOURCE = path.resolve(__dirname, '../headers/objc');
const TARGET = path.resolve(__dirname, '../headers/parsed');

function parseHeader (data) {
  let headerData = {
    imports: [],
    classes: [],
    className: null,
    extends: null,
    interfaces: [],
    methods: {},
    properties: {}
  };

  // IMPORTS
  const importRegex = /#import \"(.+)\"/g;
  let matchImport;
  while ((matchImport = importRegex.exec(data)) !== null) {
    if (matchImport.index === importRegex.lastIndex) {
      importRegex.lastIndex++;
    }
    headerData.imports.push(matchImport[1]);
  }

  // CLASSES
  const classRegex = /@class ([^;]*);/g;
  let matchClasses;
  while ((matchClasses = classRegex.exec(data)) !== null) {
    if (matchClasses.index === classRegex.lastIndex) {
      classRegex.lastIndex++;
    }
    headerData.classes = matchClasses[1].split(',').map(c => c.trim());
  }

  // INTERFACE
  const interfaceRegex = /@interface ([^ ]+)( : ([^ \n]+)( <([^>\n]+)>){0,1}){0,1}/g;
  let matchInterface;
  while ((matchInterface = interfaceRegex.exec(data)) !== null) {
    if (matchInterface.index === interfaceRegex.lastIndex) {
      interfaceRegex.lastIndex++;
    }
    headerData.className = matchInterface[1];
    headerData.extends = matchInterface[3];
    headerData.interfaces = matchInterface[5]
      ? matchInterface[5].split(',').map(i => i.trim())
      : [];
  }

  // METHODS
  const methodsRegex = /(\+|\-){1} \(([^\)]+)\)([^;]+);/g;
  let matchMethod;
  while ((matchMethod = methodsRegex.exec(data)) !== null) {
    if (matchMethod.index === importRegex.lastIndex) {
      importRegex.lastIndex++;
    }
    let name = '';
    let args = [];
    const methodNameRegex = /([^:]+)(:\(([^\)]+)\)([^ ]+))*/g;
    let matchMethodName;
    while ((matchMethodName = methodNameRegex.exec(matchMethod[3])) !== null) {
      name += `${matchMethodName[1].trim()}${matchMethodName[2] ? ':' : ''}`;
      if (matchMethodName[3]) {
        args.push({
          type: matchMethodName[3]
        });
      }
    }
    headerData.methods[name] = {
      name,
      args,
      returns: matchMethod[2],
      kind: matchMethod[1] === '+' ? 'class' : 'instance',
      kindIndicator: matchMethod[1]
    };
  }

  // PROPERTIES
  const propertiesRegex = /@property\(([^\)]+)\) ([^;]+) ([^;]*);/g;
  let matchProperties;
  while ((matchProperty = propertiesRegex.exec(data)) !== null) {
    if (matchProperty.index === propertiesRegex.lastIndex) {
      propertiesRegex.lastIndex++;
    }
    headerData.properties[matchProperty[3]] = {
      name: matchProperty[3],
      pointer: matchProperty[3].startsWith('*'),
      type: matchProperty[2],
      attributes: matchProperty[1].split(',').map(a => a.trim())
    };
  }

  return headerData;
}

const output = fs.createWriteStream(DOWNLOAD_TARGET);
request(DOWNLOAD_SOURCE).pipe(output).on('close', () => {
  const zip = new AdmZip(DOWNLOAD_TARGET);
  zip.extractAllTo(SOURCE);

  const files = fs.readdirSync(`${SOURCE}/Sketch-Headers-master/Headers`);
  files.forEach(file => {
    const data = fs.readFileSync(
      `${SOURCE}/Sketch-Headers-master/Headers/${file}`,
      'utf8'
    );
    if (data) {
      fs.writeFileSync(
        `${TARGET}/${file.substr(0, file.length - 2)}.json`,
        JSON.stringify(parseHeader(data), null, 2),
        'utf8'
      );
      console.log(chalk.gray(`✔ ${file} parsed`));
    }
  });

  rimraf(SOURCE, () => {
    fs.unlinkSync(DOWNLOAD_TARGET);
    console.log();
    console.log(chalk.green.bold(`${files.length} headers parsed!`));
  });
});
