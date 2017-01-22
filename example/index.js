
// let LD = require('./../dist/index.js');
const luckyIds = [
  "4440","1065","3434","4921","5864","3835","5298","4095","8278","9042","8985","8547","6299","3988","6098",
  "1120","9700","5565","8471","7983","4265","1348","5547","3872","7399","9295","1009","8560","5765","1146",
  "9549","1000","1090","5211","5679","3088","2592","1114","1136","9531","1105","8036","5138","4806","4559",
  "7016","6552","6855","8752","2912","8580","4712","7148","5917","6806","8106","2587","9442","9927","4882",
  "3070","7904","4991","5712","3413","2259","6731","1619","4455","2349","1909","1142","4065","7458","5541",
  "8501","6588","1323","7499","1389","6926","6866","9612","8084","3226","4261","9654","2764","8905","6923",
  "5059","6057","8789","8021","1144","4984","9326","3847","3845","9534"
];

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

