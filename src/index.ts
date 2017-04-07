

export interface LuckyDrawOptionsInfo {
  [key: string]: number | boolean | undefined;
  interval?: number;
  enableTranshBin?: boolean;
}

enum RandomSourceTypes {
  online = 1,
  math
}

const DefaultLuckyDrawOptions: LuckyDrawOptionsInfo = {
  interval: 100,
  enableTranshBin: true
};

const LotteryMessages = {
  luckyIdEmpty: '全员已中奖！',
  congratulations: '恭喜！'
};

const IntervalStoped = -1;

/**
 * @export
 * @class LuckyDraw
 */
class LuckyDraw {
  private options: LuckyDrawOptionsInfo = {};
  private luckyIds: Set<string>;
  private interval: number;

  /**
   * Creates an instance of LuckyDraw.
   * 
   * @param {string[]} luckyIds
   * @param {LuckyDrawOptionsInfo} [options]
   * 
   * @memberOf LuckyDraw
   */
  constructor(luckyIds: string[], options?: LuckyDrawOptionsInfo) {
    this.luckyIds = new Set(luckyIds);
    this.interval = IntervalStoped;

    Object.keys(DefaultLuckyDrawOptions).map(optionKey => {
      this.options[optionKey] = options && options[optionKey] || DefaultLuckyDrawOptions[optionKey];
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
  start(callback: (luckyIds: string | string[], reason?: string) => void, count?: number) {
    if (this.interval !== IntervalStoped) {
      return;
    }

    this.interval = setInterval(() => {
      let luckyIds: string | string[];
      let size = this.luckyIds.size;

      if (!size) {
        this.stop();
        return callback('', LotteryMessages.luckyIdEmpty);
      }

      luckyIds = this.getLuckIds(count);
      console.log('after start: ', luckyIds);
      callback(luckyIds, luckyIds.length === count ? LotteryMessages.congratulations : LotteryMessages.luckyIdEmpty);
    }, this.options.interval);
  }

  /**
   * Stop lucky draw.
   * 
   * @memberOf LuckyDraw
   */
  stop(): void {
    console.log("interval before stop: ", this.interval);
    let interval = this.interval;

    if (interval === IntervalStoped) {
      return;
    }

    clearInterval(this.interval);
    this.interval = IntervalStoped;
    console.log("interval after stop: ", this.interval);
  }

  /**
   * Get lucky ids.
   * 
   * @param {number} [count]
   * @returns {(string[] | string)}
   * 
   * @memberOf LuckyDraw
   */
  private getLuckIds(count?: number): string[] | string {
    let luckyIdSet: Set<string> = new Set();
    let size = this.luckyIds.size;
    let luckyIds = Array.from(this.luckyIds);
    let luckyId: string;

    if (!count || count === 1) {

      luckyId = luckyIds[Math.floor(Math.random() * size)];
      luckyIdSet.add(luckyId);
    } else {

      for(let i = 0; luckyIdSet.size < count; i ++) {
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
