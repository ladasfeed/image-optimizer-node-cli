#!/usr/bin/env node
const compress = require('./compress/compress_images.js')
const convertWebp = require('./webp/index')
/* START */
console.log('Starting script...')
const chain = async () => {
    await compress()
    await convertWebp()
}
chain().then(res => {
    console.log('Success')
})




