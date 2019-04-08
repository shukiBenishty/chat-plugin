import fs from  'fs';
import path from 'path';

var BUNDLE_DIR = path.resolve(__dirname, '../client/dist/');
export default (graphqlUrl, websocketURL) => {
    fs.readFile(BUNDLE_DIR + "/bundle.js", "utf8", (err, data) => {
        fs.writeFile(BUNDLE_DIR + "/bundle.js",
            data.replace('http://localhost:4000/chat/graphql', graphqlUrl)
                         .replace("ws://localhost:4000/graphql", websocketURL),
            (err) => {
            if(err) {
                return console.log(err);
            }
        }); 
    });
}