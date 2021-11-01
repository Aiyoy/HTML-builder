const fsProm = require('fs/promises');
const fs = require("fs");
const path = require('path');

async function createCopyFolder() {

    fs.access(path.join(__dirname, 'files-copy'), async function(error){
        if (error) {
            await fsProm.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});

            const files = await fsProm.readdir(path.join(__dirname, 'files'));

            files.forEach(async (el) => {
                await fsProm.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el));
            });
        } else {
            await fsProm.rm(path.join(__dirname, 'files-copy'), {recursive: true});
            await fsProm.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});

            const files = await fsProm.readdir(path.join(__dirname, 'files'));

            files.forEach(async (el) => {
                await fsProm.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el));
            });
        }
    });
}

createCopyFolder();
