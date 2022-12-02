import express, {Express} from 'express';
import {createCorsMiddleware} from './express-cors-setup';
import {createLoggingMiddleware} from './express-logging';

export function initExpressServer(): Express {
    const expressServer = express();
    expressServer.use(createCorsMiddleware());
    expressServer.use(createLoggingMiddleware());
    return expressServer;
}
