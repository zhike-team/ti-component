import {
  getBodyWidth,
  getBodyHeight,
  getRandomString,
  formatDuration,
  countAllWords,
  countWords,
  getCursorPosition,
  isUndefinedOrNull,
  handleAnswer,
  handleIeltsAnswer,
  getInitAnswer,
  getSubQuestionAnswer,
  formatReportDuration,
  firstUpperCase,
  redirectToLoginPage,
} from './utils';
import { normalizeArticle } from './article';
import listeningParser from './parser';
import { smoothScroll } from './smoothScroll';

const utils = {
  getBodyWidth, // 获取页面宽度/高度
  getBodyHeight, // 获取页面宽度/高度
  getRandomString, // 生成随机字符串
  formatDuration, // 格式化时间段
  countAllWords, // 计算所有字符个数
  countWords, // 计算单词个数
  getCursorPosition, // 获取光标位置
  isUndefinedOrNull, // 是否为undefined或者null
  handleAnswer, // 处理答案
  handleIeltsAnswer, // 处理雅思答案 返回习题组答案
  getInitAnswer, // 初始化习题答案( 处理填空题与拖拽题 )
  getSubQuestionAnswer, // 获取对应子题答案
  formatReportDuration, // 格式化报告页时间
  firstUpperCase, // 首字母大写
  normalizeArticle, // 序列化文章
  listeningParser, // 获取时间码处理的对象 Parser
  smoothScroll, // 自然滚动函数
  redirectToLoginPage, // 跳转登录页面
};


export default utils;

