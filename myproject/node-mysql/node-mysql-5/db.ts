import * as mysql from 'mysql';



// 创建连接池:最大10个连接
export var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'gujiajia',
    database: 'test'
});

/** 不允许直接使用连接池,而是通过该方法执行sql */
export function query(sql: string, params?: Object | any[]) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params ? params : [], (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}


// export async function query(sql: string, params?: any) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             connection.query(sql, params ? params : [], (err, rows) => {
//                 if (err) reject(err);
//                 else resolve(rows);
//                 connection.release();
//             });

//         });

//     });
// }