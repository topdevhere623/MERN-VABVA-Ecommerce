/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fsPromise = require('fs/promises');
const minimist = require('minimist');

const processArgs = minimist(process.argv.slice(2));
const pathname = path.resolve(processArgs?.pathname);

const getImportFilename = (fileName = '') => {
    let importFilename = String(fileName).replace(/.svg$/i, '');

    importFilename = importFilename.split('-').reduce((result, item) => {
        const subName = String(item).charAt(0).toUpperCase() + String(item).substr(1);
        return String(result).concat(subName);
    }, '');
    return importFilename;
};

const run = async () => {
    const content = {
        imports: [],
        exports: []
    };
    let indexFileHandle;

    try {
        // Create index.ts file
        indexFileHandle = await fsPromise.open(`${pathname}/index.ts`, 'w+');

        // Read all files from dir
        const files = await fsPromise.readdir(pathname, {
            withFileTypes: true
        });

        for (const file of files) {
            if (file.isFile() && file.name !== 'index.ts') {
                const importFilename = getImportFilename(file.name);

                content['imports'].push(`import ${importFilename} from './${file.name}';`);
                content['exports'].push(`export const ${importFilename}Svg = ${importFilename};`);
            }
        }

        await indexFileHandle.writeFile(content['imports'].join('\n'));
        await indexFileHandle.writeFile(`\n\n`);
        await indexFileHandle.writeFile(content['exports'].join('\n'));
    } catch (error) {
        console.error(error);
    } finally {
        if (indexFileHandle) {
            await indexFileHandle.close();
        }
        console.log('Completed Successfully.');
    }
};

run();
