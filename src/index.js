// import * as Fetch from 'isomorphic-fetch';
"use strict";
var RandomSourceTypes;
(function (RandomSourceTypes) {
    RandomSourceTypes[RandomSourceTypes["online"] = 1] = "online";
    RandomSourceTypes[RandomSourceTypes["math"] = 2] = "math";
})(RandomSourceTypes || (RandomSourceTypes = {}));
var DefaultLuckyDrawOptions = {
    interval: 100,
    enableTranshBin: true
};
var LotteryMessages = {
    luckyIdEmpty: '全员已中奖！',
    congratulations: '恭喜！'
};
/**
 * @export
 * @class LuckyDraw
 */
var LuckyDraw = (function () {
    /**
     * Creates an instance of LuckyDraw.
     *
     * @param {string[]} luckyIds
     * @param {LuckyDrawOptionsInfo} [options]
     *
     * @memberOf LuckyDraw
     */
    function LuckyDraw(luckyIds, options) {
        var _this = this;
        this.options = {};
        this.luckyIds = new Set(luckyIds);
        Object.keys(DefaultLuckyDrawOptions).map(function (optionKey) {
            _this.options[optionKey] = options && options[optionKey] || DefaultLuckyDrawOptions[optionKey];
        });
    }
    /**
     * Start lucky draw.
     *
     * @param {((luckyIds: string | string[], reason?: string) => void)} callback
     * @param {number} [count]
     *
     * @memberOf LuckyDraw
     */
    LuckyDraw.prototype.start = function (callback, count) {
        var _this = this;
        this.interval = setInterval(function () {
            var luckyIds;
            var size = _this.luckyIds.size;
            if (!size) {
                _this.stop();
                return callback('', LotteryMessages.luckyIdEmpty);
            }
            luckyIds = _this.getLuckIds(count);
            callback(luckyIds, luckyIds.length === count ? LotteryMessages.congratulations : LotteryMessages.luckyIdEmpty);
        }, this.options.interval);
    };
    /**
     * Stop lucky draw.
     *
     * @memberOf LuckyDraw
     */
    LuckyDraw.prototype.stop = function () {
        clearInterval(this.interval);
    };
    /**
     * Get lucky ids.
     *
     * @param {number} [count]
     * @returns {(string[] | string)}
     *
     * @memberOf LuckyDraw
     */
    LuckyDraw.prototype.getLuckIds = function (count) {
        var luckyIdSet = new Set();
        var size = this.luckyIds.size;
        var luckyIds = Array.from(this.luckyIds);
        var luckyId;
        if (!count || count === 1) {
            luckyId = luckyIds[Math.floor(Math.random() * size)];
            luckyIdSet.add(luckyId);
        }
        else {
            for (var i = 0; luckyIdSet.size < count; i++) {
                if (!this.luckyIds.size) {
                    break;
                }
                luckyId = luckyIds[Math.floor(Math.random() * size)];
                luckyIdSet.add(luckyId);
                this.luckyIds["delete"](luckyId);
            }
        }
        return Array.from(luckyIdSet);
    };
    return LuckyDraw;
}());
// exports.LuckyDraw = LuckyDraw;
