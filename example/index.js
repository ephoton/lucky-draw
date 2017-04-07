
// let LD = require('./../dist/index.js');

const luckyIds = ["周冬柳","贾晓秋","盛英东","杨超","王其晨"];
// "吕振宇","卢杰","徐懿","申璐琳","林绍芝","汪玉玉","张颖","薛江","邹彪","魏星","蔡双爽","鲁晓丽","陈梦楠","胡宏缘","卢雪晴","孟繁虎","崔宇轩","唐雯","胡栋","段芳","王晓东","张小莹","刘宇","张金龙","阳海涛","周雷鸣","马洋洋","周越","刘峰","丁飞","王曦","刘宝","罗祥","张文杰","陈寅亮","史江浩","高博","魏倩","黄新威","沈国灿","石文魁","张熹"];

let luckDraw = new LuckyDraw(luckyIds, {
  interval: 100
});
let $content = $("#j-content");

$('#j-draw-single').click(() => {
  luckDraw.start(luckyId => {
    $content.text(luckyId);
  });
});

$("#j-stop").click(() => {
  luckDraw.stop();
});

