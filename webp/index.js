const webp = require('webp-converter');
const folderPath = process.cwd().replace(/[\\]/g, '/') + '/optimized'
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const getExtension = (name) => name.substr(name.indexOf('.') + 1).trim()
const imagesExtensions = ['png', 'jpg', 'jpeg', 'svg']

const convert = async (name) => {
    const outputName = name.substr(0, name.indexOf('.')) + '.webp'
    return webp.cwebp(folderPath+'/' + name, 'optimized/' + outputName, "-q 80", logging = "-v");
}

const webpConvert = async () => {
    console.log('Start converting...')
    await readdir(folderPath).then(async function (files) {
        console.log(files)
        let array = []
        files.forEach(function (file) {
            const extension = getExtension(file)
            if (imagesExtensions.includes(extension)) {
                array.push(new Promise(resolve => {
                    const result = convert(file)
                    result.then((res) => {
                        resolve()
                    })
                }))
            }
        });
        await Promise.all(array)
    });
    console.log('End converting')
}


module.exports = webpConvert