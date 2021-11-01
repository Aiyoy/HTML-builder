const fsProm = require('fs/promises');
const path = require('path');
const fs = require("fs");
const { stat } = require('fs');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');

async function makeStyleFile() {

    const bundle = fs.createWriteStream(bundlePath);

    try {
        const files = await fsProm.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});

        for (const file of files) {
            let filePath = path.join(stylePath, `${file.name}`);
            const fileInf = path.parse(filePath);

            if (!file.isDirectory() && fileInf.ext == '.css') {               

                await stat(filePath, async(err, stats) => {
                        
                    let readableStream = fs.createReadStream(filePath, "utf8");

                    await readableStream.on("data", function(chunk){ 
                        
                        bundle.write(chunk.trim() + '\n');
                    });        
                });
            }
        }

    } catch (err) {
        console.error(err);
    }
}
makeStyleFile();