const { readdir } = require('fs/promises');
const path = require('path');
const { stat } = require('fs');

async function getInfo() {
    try {
        const files = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});

        for (const file of files) {
            let filePath = path.join(__dirname, `secret-folder/${file.name}`);
            if (!file.isDirectory()) {
                const fileInf = path.parse(filePath);

                await stat(filePath, async(err, stats) => {
                    console.log(`${fileInf.name} - ${fileInf.ext.slice(1)} - ${Math.round(stats.size / 1024)}kb`);
                });
            }
        }

    } catch (err) {
        console.error(err);
    }
}

getInfo();