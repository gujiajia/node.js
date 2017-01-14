
import * as Request from 'request';
import * as Cheerio from 'cheerio';
import { ProjectItem } from './project-item';
//发送请求，拉取页面
Request('http://www.zhongchou.com', (err, rtn, body) => {
    // 解析页面
    var $ = Cheerio.load(body);
    // 查找页面所有的众筹项目
    $('.indCardItem').each((index, item) => {
        var projectItem = new ProjectItem();
        //众筹项目的海报
        projectItem.banner = $(item).find('a img').attr('src');
        /**众筹项目的名字 */
        projectItem.name = $(item).find('.indCardICText a').text();
        /**详情页链接 */
        projectItem.detailUrl = $(item).find('.indCardICText a').attr('href');
        /**简述  */
        projectItem.summary = $(item).find('.indCardICText p').text();
        projectItem.tags = [];
        $(item).find('.indCardFBox.siteCardICBox').text();
        console.log(projectItem);
    })
});