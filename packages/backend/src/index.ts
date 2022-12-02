import {backendPort} from '@electrovir/shared';
import {addExpressEndpoints} from './express/endpoints';
import {initExpressServer} from './express/express';

async function main() {
    const expressServer = initExpressServer();

    addExpressEndpoints(expressServer);

    expressServer.listen(backendPort, () => {
        console.log(`🚀 backend ready at http://localhost:${backendPort}`);
    });
}

main();
