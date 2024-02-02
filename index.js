import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

//////! FILES

// Blocking synchronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('File Written');

// Non Blocking asynchronous way

// fs.readFile('./starter/txt/start.txt', 'utf8', (err, data1) => {
//     if (err) throw err;
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf8', (err, data2) => {
//         if (err) throw err;
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf8', (err, data3) => {
//             if (err) throw err;
//             console.log(data3);
//             fs.writeFile('./starter/txt/final2.txt', `${data2}\n${data3}`, (err) => {
//                 console.log('The file has been saved!');
//             });
//         });
//     });
// });

// console.log('Reading file...');

//////? SERVER

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

const server = http.createServer((req, res) => {
    const pathName = req.url

    // OVERVIEW PAGE
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.end(output);

        // PRODUCT PAGE
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');

        // API
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

        // NOT FOUND
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>PAGE NOT FOUND</h1>');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});