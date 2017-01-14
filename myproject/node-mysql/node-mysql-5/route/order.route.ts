import { Route, ResponseResult } from '../interface';
import { query } from '../db';
import * as express from 'express';

export default class OrderRoute implements Route {
    routePath: string = "order";
    doAction(action: string) {
        switch (action) {
            case 'allOrders':
                return this.allOrders;
            case 'addOrder':
                return this.addOrder;
        }

    }

    async allOrders(req: express.Request, result: ResponseResult) {
        var data = await query('select * from orders');
        result.rows = data;
        return result;
    }
    async addOrder(req: express.Request, result: ResponseResult) {
        var {Id_O, OrderNo, Id_P} = req.query;
        result.data = { Id_O, OrderNo, Id_P };
        return result;
    }
}