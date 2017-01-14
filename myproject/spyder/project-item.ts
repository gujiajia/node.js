/**
 * 众筹项目
 */
// 创建实体类，作为众筹项目的对象
export class ProjectItem {
    /** 众筹项目的海报 */
    banner: string;
    /**众筹项目的名字 */
    name: string;
    /**详情页链接 */
    detailUrl: string;
    /**简述  */
    summary: string;
    /** 标签组 */
    tags: string[];
    /** 已经获得的钱 */
    gotMoney: number;
    /**支持的人的数量 */
    supportNum: number;
    /**当前项目的进度 */
    process: number;
}