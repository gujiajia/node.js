import { Route, ResponseResult } from '../interface';
import { query } from '../db';
import * as express from 'express';

export default class OrderRoute implements Route {
    routePath: string = "order";
    doAction(action: string) {
        switch (action) {
            case 'allOrders':
                return this.allOrders;
        }

    }

    async allOrders(req: express.Request, result: ResponseResult) {
        var data = await query('select * from orders');
        result.data = data;
        return result;
    }
}