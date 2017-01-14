import * as express from 'express';
import { query } from './db';

var app = express();

app.get('/', async (req, res, next) => {
    var result;
    try {
        result = await query('select * from person');
    } catch (e) {
        result = e;
    }

    res.json(result);


});

app.listen(3000, () => {
    console.log('server is running on 3000');
})

