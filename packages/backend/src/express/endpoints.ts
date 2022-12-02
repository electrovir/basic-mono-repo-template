import {getObjectTypedKeys} from '@augment-vir/common';
import {sharedStuff} from '@electrovir/shared';
import {Express, NextFunction, Request, Response} from 'express';

const endpoints: Record<
    string,
    Partial<
        Record<
            'get' | 'post' | 'put',
            (request: Request, response: Response, nextFunction: NextFunction) => void
        >
    >
> = {
    '/stuff': {
        get: (req, res) => {
            res.json(sharedStuff);
        },
    },
};

export function addExpressEndpoints(expressServer: Express) {
    Object.entries(endpoints).forEach(
        ([
            endpoint,
            methods,
        ]) => {
            getObjectTypedKeys(methods).forEach((method) => {
                const callback = methods[method];
                if (callback) {
                    expressServer[method](endpoint, callback);
                }
            });
        },
    );
}
