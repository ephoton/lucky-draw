"use strict";
var RandomSourceTypes;
(function (RandomSourceTypes) {
    RandomSourceTypes[RandomSourceTypes["online"] = 1] = "online";
    RandomSourceTypes[RandomSourceTypes["math"] = 2] = "math";
})(RandomSourceTypes || (RandomSourceTypes = {}));
const DefaultLuckyDrawOptions = {
    interval: 100,
    enableTranshBin: true
};
const LotteryMessages = {
    luckyIdEmpty: '全员已中奖！',
    congratulations: '恭喜！'
};
const IntervalStoped = -1;
class LuckyDraw {
    constructor(luckyIds, options) {
        this.options = {};
        this.luckyIds = new Set(luckyIds);
        this.interval = IntervalStoped;
        Object.keys(DefaultLuckyDrawOptions).map(optionKey => {
            this.options[optionKey] = options && options[optionKey] || DefaultLuckyDrawOptions[optionKey];
        });
    }
    start(callback, count) {
        if (this.interval !== IntervalStoped) {
            return;
        }
        this.interval = setInterval(() => {
            let luckyIds;
            let size = this.luckyIds.size;
            if (!size) {
                this.stop();
                return callback('', LotteryMessages.luckyIdEmpty);
            }
            luckyIds = this.getLuckIds(count);
            callback(luckyIds, luckyIds.length === count ? LotteryMessages.congratulations : LotteryMessages.luckyIdEmpty);
        }, this.options.interval);
    }
    stop() {
        console.log("interval before stop: ", this.interval);
        let interval = this.interval;
        if (interval === IntervalStoped) {
            return;
        }
        clearInterval(this.interval);
        this.interval = IntervalStoped;
        console.log("interval after stop: ", this.interval);
    }
    getLuckIds(count) {
        let luckyIdSet = new Set();
        let size = this.luckyIds.size;
        let luckyIds = Array.from(this.luckyIds);
        let luckyId;
        if (!count || count === 1) {
            luckyId = luckyIds[Math.floor(Math.random() * size)];
            luckyIdSet.add(luckyId);
        }
        else {
            for (let i = 0; luckyIdSet.size < count; i++) {
                if (!this.luckyIds.size) {
                    break;
                }
                luckyId = luckyIds[Math.floor(Math.random() * size)];
                luckyIdSet.add(luckyId);
                this.luckyIds.delete(luckyId);
            }
        }
        return Array.from(luckyIdSet);
    }
}
exports = LuckyDraw;
//# sourceMappingURL=index.js.map