# Prysm Documentation Portal

This repository houses all the documentation pertaining to the Prysm client and Ethereum 2. It is generated with [Docusaurus](https://github.com/facebook/docusaurus). 

Below are steps for initialising and reproducing this portal for development.

## Dependencies

1.  The latest version of [Node](https://nodejs.org/en/download/) installed. 
2. The latest version of [Yarn](https://yarnpkg.com/en/docs/install) installed. (Optional, but recommended)

    > You have to be on Node >= 8.x and Yarn >= 1.5.

## Installation

1. Clone this repository.
2.  Enter the newly cloned repo and enter the ` website` directory.
3. Issue the command `npm install`
4. Wait for the installation process to complete.

## Running the development server  

1. From within the `website` directory, run the local web server using `yarn start` or `npm start`.
2.  Load the example site at http://localhost:3000 if it did not already open automatically. If port 3000 has already been taken, another port will be used. Look at the console messages to see which.

    You should see the example site loaded in your web browser. There's also a LiveReload server running, and any changes made to the docs and files in the `website` directory will cause the page to refresh.
    
    
## Building Static HTML Pages

To create a static build of the documentation portal, run the following script from the `website` directory:

```bash
yarn run build # or `npm run build`
```

This will generate a `build` subdirectory within the `website` directory, containing the `.html` files from all of the docs and other files included in `pages`.
