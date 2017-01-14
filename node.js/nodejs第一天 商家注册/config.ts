import * as Mongodb from 'mongodb';

/**
 * App的配置
 * 
 * 访问修饰符
 * 
 * 关键字|当前类|子类|所有地方
 * -|-|-|
 * private  |√|x|x
 * protected|√|√|x
 * public |√|√|√|
 * 
 * static 指类的 成员 =>属性和方法 
 * 
 * 
 * static 是类的成员,最先被创建,所以不能调用类的实例成员
 * 没有static关键字 是实例成员=>属性和方法
 * 先有类,然后再通过类 new 类名()创建 类成员
 */
export class Config {
    static dbServer = 'mongodb://123:123@ds023664.mlab.com:23664/topshadow';
    private static dbHost = "ds023664.mlab.com";
    private static dbPort = 23664;
    static defaultAvatar = "http://www.processon.com/images/default/default/profile-full-male.png";
    // 应用程序的端口
    public static PORT: number = process.env.PORT || 3000;
    private static database: Mongodb.Db;


    // 返回连接好的Mongodb数据实例
    static get Db() {
        // 已连接上就返回验证后的数据库
        if (Config.database) {
            return Config.database;
        } else {
            // 尚未连接,连接数据库,并验证,返回
            var server = new Mongodb.Server(Config.dbHost, Config.dbPort);
            Config.database = new Mongodb.Db('topshadow', server);
            Config.database.open((err, res) => {
                Config.database.authenticate('123', '123', (err, res) => {
                    err ? console.log(err) : console.log(res);
                });
            });
            return Config.database;
        }
    }


    /**
     * 测试连接数据库
     */
    static testConnect() {
        Mongodb.MongoClient.connect(Config.dbServer, async (err, db) => {
            if (err) console.log(err);
            var users = await db.collection('users').find().toArray();
            console.log(users);
            db.close();
        });
    }
}

Config.Db