import {NextFunction, Request, Response} from 'express';

function createLogger() {
    return ({
        protocol,
        path,
        method,
        origin,
        host,
    }: {
        protocol: string;
        path: string;
        method: string;
        origin: string;
        host: string;
    }) => {
        const fromString = origin ? ` from ${origin}` : '';
        console.info(`${method}: ${protocol}://${host}${path}${fromString}`);
    };
}

export function createLoggingMiddleware() {
    const expressLogger = createLogger();
    return (request: Request, response: Response, next: NextFunction) => {
        expressLogger({
            host: request.header('Host') ?? '',
            method: request.method,
            origin: request.header('Origin') ?? '',
            path: request.originalUrl,
            protocol: request.protocol,
        });
        next();
    };
}
