import fs from  'fs';
import path from 'path';

var BUNDLE = path.resolve(__dirname, '../client/dist/bundle.js');
export default (graphqlUrl, websocketURL) => {
    fs.readFile(BUNDLE, "utf8", (err, data) => {
        fs.writeFile(BUNDLE,
            data.replace(/__GRAPHQL_URL__/g, graphqlUrl)
                         .replace(/__WS_URL__/g, websocketURL),
            (err) => {
            if(err) {
                return console.log(err);
            }
        }); 
    });
}