import { cloneDeep, uniq } from 'lodash';

// 获取页面宽度/高度
export const getBodyWidth = () => global.document.body.offsetWidth;
export const getBodyHeight = () => global.document.body.offsetHeight;

// 生成随机字符串
export const getRandomString = (length = 32, seed = '') => {
  const dict = seed || 'abcdefghikmnpqrstwxyzABCDEFGHKLMNPQRSTUVWXYZ123456789';
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += dict[parseInt(Math.random() * dict.length, 10)];
  }

  return res;
};

// 格式化时间段
export const formatDuration = (milliseconds, hasHours = false) => {
  if (hasHours) {
    const hours = parseInt(milliseconds / 3600 / 1000, 10);
    const minutes = parseInt(milliseconds / 60 / 1000 - hours * 60, 10);
    const seconds = parseInt(milliseconds / 1000 - hours * 3600 - minutes * 60, 10);

    return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  const minutes = parseInt(milliseconds / 60 / 1000, 10);
  const seconds = parseInt(milliseconds / 1000 - minutes * 60, 10);

  return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};

// 计算单词个数
export const countWords = (text = '') => {
  let count = 0;
  const words = text.trim().split(/\s/);
  words.forEach(word => {
    if (word.trim()) {
      count += 1;
    }
  });

  return count;
};

// 计算所有字符个数
export const countAllWords = (text = '') => {
  let count = 0;
  const words = text.split('');
  words.forEach(word => {
    if (word) {
      count += 1;
    }
  });

  return count;
};

// 获取光标位置
/* eslint-disable */
export const getCursorPosition = (textarea) => {
  var rangeData = {text: "", start: 0, end: 0 };
      textarea.focus();
  if (textarea.setSelectionRange) { // W3C
      rangeData.start= textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
  } else if (document.selection) { // IE
      var i,
          oS = document.selection.createRange(),
          oR = document.body.createTextRange();
      oR.moveToElementText(textarea);
    
      rangeData.text = oS.text;
      rangeData.bookmark = oS.getBookmark();
      
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
          if (textarea.value.charAt(i) == '\n') {
              i ++;
          }
      }
      rangeData.start = i;
      rangeData.end = rangeData.text.length + rangeData.start;
  }
      
  return rangeData;
};
/* eslint-enable */

// 是否为undefined或者null
export const isUndefinedOrNull = value => {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
};

// 把答案数字转成字母
  // 数字0，1 转成 ABCD
const handleNumToWord = answer => {
  const list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newAnswer = '';
  if (answer === null) {
    newAnswer = null;
    return false;
  }
  answer.forEach(item => {
    if (item === null || item === undefined) return false;
    newAnswer += list[item];
    return false;
  });
  return newAnswer;
};

// 处理答案
export const handleAnswer = (materials, type) => {
  let answer = '';
  let userAnswer = '';
  let isCorrect;
  if (type === 'Blank' || type === 'SubjectBlank') {
    isCorrect = [];
    const correctAnswer = materials[0] && materials[0].answer;
    let userAnswer = materials[0] && materials[0].userAnswer && materials[0].userAnswer.answer; // eslint-disable-line
    userAnswer && userAnswer.forEach((item, index) => {
      const pattern = new RegExp('^(' + correctAnswer[index] + ')$'); // eslint-disable-line
      const correct = pattern.test(userAnswer[index]) ? 'true' : 'false';
      isCorrect.push(correct);
    });
    const answer = correctAnswer && correctAnswer.join(',');
    return { answer, userAnswer, isCorrect };
  }
  materials.forEach(item => {
    if (answer) answer += ' | ';
    answer += handleNumToWord(item.answer);
    if (item.userAnswer) {
      if (userAnswer && userAnswer !== '-') userAnswer += ' | ';
      userAnswer += handleNumToWord(item.userAnswer.answer);
      if (isCorrect === undefined) {
        isCorrect = item.userAnswer.correct;
      } else {
        isCorrect = isCorrect && item.userAnswer.correct;
      }
    } else {
      isCorrect = false;
      userAnswer = '-';
    }
  });
  return { answer, userAnswer, isCorrect };
};

// 处理雅思答案 返回习题组答案
export const handleIeltsAnswer = (materials, type, isTable = false) => {
  const ieltsAnswer = [];
  materials.map(material => {
    let answer = '';
    let userAnswer = '';
    let isCorrect;
    if (type === 'ChooseOne' || type === 'ChooseMany' ||
    (isTable && type === 'Drag')) {
      answer = material && handleNumToWord(material.answer);
      if (material.userAnswer.answer) {
        userAnswer = material.userAnswer && handleNumToWord(material.userAnswer.answer);
        if (userAnswer === null || userAnswer === '') {
          userAnswer = '--';
        }
      } else {
        userAnswer = '--';
      }
      isCorrect = material.userAnswer && material.userAnswer.correct;
      ieltsAnswer.push({ answer, userAnswer, isCorrect });
    } else if (isTable && (type === 'Blank' || type === 'BlankTable')) {
      const correctAnswer = material && material.answer;
      let userArray = material && material.userAnswer && material.userAnswer.answer; // eslint-disable-line
      correctAnswer.map((item, index) => {
        if (index === 0) {
          answer += correctAnswer[index];
          if (!userArray || !userArray[index]) {
            userAnswer += '--';
          } else {
            userAnswer += userArray[index];
          }
        } else if (!userArray || !userArray[index]) {
          userAnswer += ', --';
          answer += `, ${correctAnswer[index]}`;
        } else {
          userAnswer += `, ${userArray[index]}`;
          answer += `, ${correctAnswer[index]}`;
        }
        return false;
      });
      if (answer.indexOf('|') !== -1) {
        const arr = answer.split('|');
        const newAnswer = arr.join(' | ');
        answer = newAnswer;
      }
      isCorrect = material.userAnswer && material.userAnswer.correct;
      ieltsAnswer.push({ answer, userAnswer, isCorrect });
    } else if (type === 'Blank' || type === 'BlankTable') {
      const correctAnswer = material && material.answer;
      let userArray = material && material.userAnswer && material.userAnswer.answer; // eslint-disable-line
      correctAnswer.map((answer, index) => {
        const pattern = new RegExp('^(' + correctAnswer[index] + ')$'); // eslint-disable-line
        if (!userArray || !userArray[index]) {
          userAnswer += '--';
          isCorrect = false;
        } else {
          isCorrect = pattern.test(userArray[index]);
          userAnswer = userArray[index];
        }
        ieltsAnswer.push({ answer, userAnswer, isCorrect });
        return false;
      });
    } else if (type === 'Drag') {
      const correctAnswer = material && material.answer;
      const userArray = material && material.userAnswer &&
      material.userAnswer.answer;
      correctAnswer.map((answer, index) => {
        if (!userArray) {
          userAnswer = null;
          isCorrect = false;
        } else {
          userAnswer = userArray[index];
          isCorrect = userArray[index] === undefined ? false :
            answer === userArray[index];
        }
        ieltsAnswer.push({ answer, userAnswer, isCorrect });
        return false;
      });
    } else if (type === 'Judge') {
      const choices = material && material.choices;
      answer = material && material.answer && choices[material.answer[0]] && choices[material.answer[0]].text;
      if (material.userAnswer.answer) {
        userAnswer = material.userAnswer && material.userAnswer.answer &&
          choices[material.userAnswer.answer[0]] && choices[material.userAnswer.answer[0]].text;
        if (userAnswer === null || userAnswer === '') {
          userAnswer = '--';
        }
      } else {
        userAnswer = '--';
      }
      isCorrect = material.userAnswer && material.userAnswer.correct;
      ieltsAnswer.push({ answer, userAnswer, isCorrect });
    }
    return false;
  });
  return ieltsAnswer;
};

// 首字母大写
export const firstUpperCase = str => {
  if (!str) return ' ';
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
};

// 格式化报告页时间
export const formatReportDuration = duration => {
  const hours = parseInt(duration / 3600, 10);
  const minutes = parseInt(duration / 60 - hours * 60, 10);
  const seconds = parseInt(duration - hours * 3600 - minutes * 60, 10);
  const time = hours !== 0 ? `${hours}h${minutes}min${seconds}s` : (minutes !== 0 ? `${minutes}min${seconds}s` : `${seconds}s`);
  return time;
};

// 获取对应子题答案
export const getSubQuestionAnswer = (value, qNum, index) => {
  // 根据qNum的值 返回countArr 记录子题重叠情况
  const newArr = [];
  const countArr = [];
  qNum.forEach(item => {
    if (newArr.indexOf(item) !== -1) {
      // 将countArr数组的最后一个元素 加 1
      let count = countArr[countArr.length - 1];
      count += 1;
      countArr[countArr.length - 1] = count;
    } else {
      newArr.push(item);
      countArr.push(1);
    }
  });
  // 根据realAnswer 返回 与pid 对应的 realAnswerArr
  const realAnswerArr = [];
  const valueArr = cloneDeep(value);
  countArr.forEach(item => {
    const arr = [];
    for (let i = 1; i <= item; i += 1) {
      arr.push(valueArr.shift());
    }
    realAnswerArr.push(arr);
  });
  // 取出对应子题的答案
  const answerIndex = uniq(qNum).indexOf(qNum[index]);
  return realAnswerArr[answerIndex];
};

// 初始化习题答案( 处理填空题与拖拽题 )
export const getInitAnswer = (newSetRecord, qNum, materials) => {
  // 如果存在重复的选项
  // 根据qNum的值 返回countArr 记录子题重叠情况
  const newArr = [];
  const countArr = [];
  qNum.forEach(item => {
    if (newArr.indexOf(item) !== -1) {
      // 将countArr数组的最后一个元素 加 1
      let count = countArr[countArr.length - 1];
      count += 1;
      countArr[countArr.length - 1] = count;
    } else {
      newArr.push(item);
      countArr.push(1);
    }
  });
  const answerArr = [];
  countArr.forEach((item, index) => {
    const materialId = materials[index].id;
    const answer = newSetRecord &&
    newSetRecord[materialId] && newSetRecord[materialId].answer || [];
    const answer1 = cloneDeep(answer);
    for (let i = 1; i <= item; i += 1) {
      if (Array.isArray(answer1) && answer1.length !== 0) {
        answerArr.push(answer1.shift());
      } else {
        answerArr.push(null);
      }
    }
  });
  return answerArr;
};

// 跳转到登录页面
export const redirectToLoginPage = loginUrl => {
  global.location.href = `${loginUrl}${encodeURIComponent(global.location.href)}`;
};
