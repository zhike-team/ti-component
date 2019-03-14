/**
 * Created by du on 16/11/27.
 * tmpArr 标签数据 item: {key: 'raw', text: 'mdStr'}
 * mdArr  聚合数据 item :{start: 0. end: 1024, raw: 'mdStr', translation: 'mdStr'}
 * openSymbol 自定义标签栈 ['paragraph', 'time', 'raw', 'translation'];
 */
// 获取练习的做题步骤
export default class listeningParser {
  // 构造
  constructor() {
    this.mdArr = [];
    this.tmpArr = [];
    this.openSymbol = [];
  }

  parse(mdStr, isCombine) {
    if (typeof mdStr !== 'string') {
      throw new Error('非法参数');
    }
    this.getArrayData(mdStr);
    if (this.tmpArr.length) {
      this.rawParser(this.tmpArr);
    }
    if (isCombine) {
      return this.rawCombine(this.mdArr); // 合并
    }
    return this.mdArr;
  }

  // 解析原始字符串
  getArrayData(mdStr) {
    const symbolIndex = new RegExp('{{(.*?)}}');
    const strResult = mdStr.match(symbolIndex);
    if (!strResult) {
      if (mdStr.trim()) {
        this.mdArr.push({ raw: mdStr });
      }
      return;
    }

    const key = strResult[1];
    const leftStr = mdStr.substring(strResult.index + strResult[0].length);

    if (key !== 'end') {
      this.openSymbol.push(key);
      if (key === 'paragraph' && this.tmpArr.length > 0) this.rawParser(this.tmpArr);
    } else if (this.openSymbol.length === 0) {
      throw new Error('标签闭合错误');
    } else {
      const keyWord = this.openSymbol.pop(); // 标签出栈
      if (keyWord === 'paragraph' && this.openSymbol.length === 0) { // 每次paragraph出栈时 openSymbol必然为空
        this.paragraphParser();
      } else if (['time', 'raw', 'translation'].indexOf(keyWord) > -1) { // raw, time, end 标签
        const lastItem = this.tmpArr[this.tmpArr.length - 1];
        if (lastItem && lastItem.key === 'time' && keyWord !== 'raw') {
          throw new Error('time标签之后必须要有raw标签');
        }
        if (keyWord === 'translation' && lastItem && lastItem.key !== 'raw') {
          throw new Error('trans标签之前必须要有raw标签');
        }
        const text = mdStr.substring(0, strResult.index);
        this.tmpArr.push({ key: keyWord, text });
      } else {
        throw new Error(`UNKNOWN SYMBOL: ${keyWord}`); // 出现不允许的自定义标签
      }
    }
    if (leftStr) {
      this.getArrayData(leftStr);
    }
  }

  // 解析时间 second
  timeParser(text) {
    return {
      start: text.split('/')[0] * 1,
      end: text.split('/')[1] * 1,
    };
  }

  // 段落解析合并
  paragraphParser() {
    const rawArray = this.tmpArr;
    let start = 0;
    let end = 0;
    let raw = '';
    let translation = '';
    for (let i = 0; i < rawArray.length; i += 1) {
      if (rawArray[i].key === 'time') {
        const timeObj = this.timeParser(rawArray[i].text);
        start = start || timeObj.start;
        start = timeObj.start - start > 0 ? start : timeObj.start;
        end = timeObj.end - end > 0 ? timeObj.end : end;
      } else if (rawArray[i].key === 'raw') {
        raw += rawArray[i].text;
      } else if (rawArray[i].key === 'translation') {
        translation += rawArray[i].text;
      }
    }
    this.tmpArr = [];
    this.mdArr.push({ start, end, raw, translation });
  }

  //  单独raw解析 逐条
  rawParser(rawArray) {
    let rawObj = {};
    for (let i = 0; i < rawArray.length; i += 1) {
      if (rawArray[i].key === 'time') {
        if (rawObj.raw) {
          this.mdArr.push(rawObj);
        }
        rawObj = this.timeParser(rawArray[i].text);
      } else if (rawArray[i].key === 'raw') {
        if (rawObj.raw) {
          this.mdArr.push(rawObj);
          rawObj = {};
        }
        rawObj.raw = rawArray[i].text;
      } else if (rawArray[i].key === 'translation') {
        rawObj.translation = rawArray[i].text;
        this.mdArr.push(rawObj);
        rawObj = {};
      }
      if (i === rawArray.length - 1 && Object.keys(rawObj).length > 0) {
        this.mdArr.push(rawObj);
      }
    }
  }

  // 合并raw
  rawCombine(mdArr) {
    let start;
    let end;
    let raw = '';
    let translation = '';
    mdArr.forEach(m => {
      start = start ? m.start - start > 0 ? start : m.start : m.start;
      end = end ? m.end - end > 0 ? m.end : end : m.end;
      raw += m.raw || '';
      translation += m.translation || '';
    });
    return { start, end, raw, translation };
  }
}
