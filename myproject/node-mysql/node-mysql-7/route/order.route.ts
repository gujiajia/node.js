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
            case 'modifyOrder':
                return this.modifyOrder;
        }

    }

    async allOrders(req: express.Request, result: ResponseResult) {
        var data = await query('select * from orders');
        result.rows = data;
        return result;
    }
    async addOrder(req: express.Request, result: ResponseResult) {
        var {Id_O, OrderNo, Id_P} = req.query;
        if (Id_O && OrderNo && Id_P) {
            result.data = await query('insert into test.orders values(?,?,?)', [Id_O, OrderNo, Id_P]);
        } else {
            result.issucess = false;
            result.errorMsg = "参数不合法";
        }
        return result;
    }

    async modifyOrder(req: express.Request, result: ResponseResult) {
        var {Id_O, OrderNo, Id_P} = req.query;
        if (Id_O && OrderNo && Id_P) {
            result.data = await query(`update test.orders set OrderNo=? , Id_P=? where Id_O=?;`, [OrderNo, Id_P, Id_O]);

        } else {
            result.issucess = false;
            result.errorMsg = "参数不合法";
        }

        return result;

    }
}