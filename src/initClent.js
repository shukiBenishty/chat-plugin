import fs from  'fs';
import path from 'path';

var BUNDLE_DIR = path.resolve(__dirname, '../client/dist/');
export default (graphqlUrl, websocketURL) => {
    fs.readFile(BUNDLE_DIR + "/bundle_src.js", "utf8", (err, data) => {
        fs.writeFile(BUNDLE_DIR + "/bundle.js",
            data.replace(/__GRAPHQL_URL__/g, graphqlUrl)
                         .replace(/__WS_URL__/g, websocketURL),
            (err) => {
            if(err) {
                return console.log(err);
            }
        }); 
    });
}