
export interface Route {
    // 路由路径
    routePath: string;
    /**doAction处理请求,并返回结果,如果遇到异常不会处理，需要在外部包围捕获异常 */
    // doAction: (action: string) => ResponseResult;
}

export interface ResponseResult {
    // 服务器状态
    state: 0 | 1 | 2;
    issucess: boolean;
    data?: any;
    errorMsg?: any;
}