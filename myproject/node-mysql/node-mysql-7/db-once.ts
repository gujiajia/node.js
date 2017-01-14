import * as mysql from 'mysql';



// 1.创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});

//2.开始连接
connection.connect();

//3.执行sql语句
connection.query('SELECT * FROM test.persons ', function (err, rows, field) {
    if (err) console.error(err);
    else console.log(rows);
});

//4.关闭连接
connection.end();