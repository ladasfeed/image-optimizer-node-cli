let { compress: compress_images} = require('compress-images/promise');

const folderPath = process.cwd()
const serializedPath = folderPath.replace(/[\\]/g, '/')
const INPUT_path_to_your_images = `${serializedPath}/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}`;
const OUTPUT_path = `${serializedPath}/optimized/`;

const compress = async () => {
    console.log('Start compressing...')
    await compress_images({
        source: INPUT_path_to_your_images,
        destination: OUTPUT_path,
        enginesSetup: {
            jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
            png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
            svg: {engine: 'svgo', command: '--multipass'},
            gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] }
        }
    });
    console.log('End compressing')
}


module.exports = compress