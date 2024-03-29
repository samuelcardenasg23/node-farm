# Node Farm

Node Farm is a simple web application that displays information about farm products. It includes an overview page with product cards and a detailed product page.

<img src="https://github.com/samuelcardenasg23/node-farm/assets/119268082/e1a8343f-b7cb-4a2a-9a2d-be3638a6418e" alt="node-farm" width="300" height="400"/>
<img src="https://github.com/samuelcardenasg23/node-farm/assets/119268082/689cc285-2941-43da-961f-322a2b4e011c" alt="node-farm" width="300" height="400"/>

## Overview

The overview page displays a list of farm products in a card format. Each card includes the product's name, whether it's organic, quantity per package, and price. Clicking on a card leads to the detailed product page.

## Product Details

The detailed product page provides more information about a specific farm product. It includes the product's name, whether it's organic, quantity per package, and price.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **HTTP:** Protocol for communication between the server and clients.
- **File System (fs):** Node.js module for interacting with the file system.
- **URL Module (url):** Node.js module for URL parsing.
- **HTTP Module (http):** Node.js module for creating an HTTP server.
- **EJS:** Embedded JavaScript templating for generating HTML markup.

## How to Run

To run the Node Farm web application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/samuelcardenasg23/node-farm.git
   ```
2. Navigate to the project directory:
   ```bash
   cd node-farm
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. Open your web browser and visit http://localhost:3000.