import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { replaceTemplate } from './modules/replaceTemplate.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

//////! SERVER

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.end(output);

        // PRODUCT PAGE
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

        // API
    } else if (pathname === '/api') {
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