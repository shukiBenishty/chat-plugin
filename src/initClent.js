import fs from  'fs';
import path from 'path';

const gqlRegx = /\/\*__GRAPHQL_URL__\*\/[^]*\/\*__GRAPHQL_URL__\*\//gm;
const wsRegx = /\/\*__WS_URL__\*\/[^]*\/\*__WS_URL__\*\//mg;
var BUNDLE_DIR = path.resolve(__dirname, '../client/dist/');
export default (graphqlUrl, websocketURL) => {

    let newGqlUrl = `/*__GRAPHQL_URL__*/ '${graphqlUrl}' /*__GRAPHQL_URL__*/`;
    let newWsUrl = `/*__WS_URL__*/ '${websocketURL}' /*__WS_URL__*/`;
    fs.readFile(BUNDLE_DIR + "/bundle.js", "utf8", (err, data) => {
        fs.writeFile(BUNDLE_DIR + "/bundle.js",
            data.replace(gqlRegx, newGqlUrl)
                         .replace(wsRegx, newWsUrl),
            (err) => {
            if(err) {
                return console.log(err);
            }
        }); 
    });
}