import { Route, ResponseResult } from '../interface';
import { query } from '../db';
import * as express from 'express';

export default class PersonRoute implements Route {
    /**路由的路径 */
    routePath: string = "person";
    doAction(action: string) {
        switch (action) {
            case 'getPersonByLastName':
                return this.getPersonByLastName;
            case 'getPersonById_P':
                return this.getPersonById_P;
            case 'addPerson':
                return this.addPerson;

        }
    }
    async getPersonByLastName(req: express.Request, result: ResponseResult) {
        let lastName = req.query.lastName;
        var data = await query('select * from persons sd as where lastName= ?', [lastName]);
        result.issucess = true;
        result.data = data;
        return result;
    }
    async getPersonById_P(req, result: ResponseResult) {
        let Id_P = req.query.Id_P;
        var data = await query('select * from persons where Id_P =?', [Id_P]);
        result.issucess = true;
        result.data = data;
        return result;
    }

    /**增加一个人 */
    async addPerson(req: express.Request, result: ResponseResult) {
        var {lastName, firstName, address, city} = req.query;
        if (lastName && firstName && address && city) {
            var data = await query(`insert test.persons values(null,?,?,?,?)`, [lastName, firstName, address, city]);
            result.data = data;
        } else {
            result.issucess = false;
            result.errorMsg = "参数不合法";
        }
        return result;
    }

}
