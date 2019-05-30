import React, { Component } from 'react';
import { View } from '@zhike/ti-ui';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import Drag from '../drag';
import getAllValue from './getAllValue';
import styles from './styles';

// imageStr 图片提前引入
const imgBlue1 = require('./assets/blue1click.png');
const imgBlue2 = require('./assets/blue2click.png');
const imgOrange = require('./assets/orangeclick.png');
const imgWrite = require('./assets/writeclick.png');

// 标准 计算器
const KEYVALUE = [
  { value: 'MR', type: 'member' },
  { value: 'MC', type: 'member' },
  { value: 'M+', type: 'member' },
  { value: '(', type: 'brackets' },
  { value: ')', type: 'brackets' },

  { value: '7', type: 'number' },
  { value: '8', type: 'number' },
  { value: '9', type: 'number' },
  { value: '÷', type: 'operator' },
  { value: 'C', type: 'clear' },

  { value: '4', type: 'number' },
  { value: '5', type: 'number' },
  { value: '6', type: 'number' },
  { value: '×', type: 'operator' },
  { value: 'CE', type: 'back' },

  { value: '1', type: 'number' },
  { value: '2', type: 'number' },
  { value: '3', type: 'number' },
  { value: '-', type: 'operator' },
  { value: '√', type: 'spoperator' },

  { value: '±', type: 'operator' },
  { value: '0', type: 'number' },
  { value: '.', type: 'point' },
  { value: '+', type: 'operator' },
  { value: '=', type: 'equal' },
];

/**
 * 该计算器主要 应用于GRE考试数学科目
 * 支持页面自由拖动
 * 点击按钮关闭
 * 记忆的功能
 */

export default class Calculator extends Component {
  static defaultProps = {
    /* 返回计算结果 */
    transferResult: () => {},
    /* 显示器默认显示的值 */
    revdata: '',
    /* 是否允许点击 transfer ddisplay 按钮 */
    transferVisible: false,
  };
  static propTypes = {
    /* 返回计算结果 */
    transferResult: PropTypes.func,
    /* 销毁组件函数 */
    destroy: PropTypes.func.isRequired,
    /* 显示器默认显示的值 */
    revdata: PropTypes.string,
    /* 是否允许点击 transfer ddisplay 按钮 */
    transferVisible: PropTypes.bool,
  }
  // 构造函数
  constructor(props) {
    super(props);
    this.state = Object.assign({
      valueText: '',
      equalFlag: false, // 当前计算状态:计算后或计算前
      errorFlag: false, // 是否有抛出错误
      resultNum: 0,
      mrNum: '', // 存储的数值
      currentKey: '',
      bracketsLeft: false,
    });
  }
  // 收到最新props结果即更新相应state状态
  componentDidMount() {
    const toShowdata = `${this.props.revdata}`;
    this.setState({
      errorFlag: false, // 捕获错误返回该组件之后 更新错误状态
      valueText: toShowdata, // 获取最新计算结果
      resultNum: this.props.revdata,
    });
  }
  // 生成按钮列表
  initButtonList= value =>
    value.map(data => (
      <button
        id={data.value}
        className={css(styles.div_class_button)}
        style={
          data.type === 'brackets' ? {
            backgroundImage: `url(${
              (data.value === ')') ?
              require('./assets/blue3.png') :
              require('./assets/blue2.png')
            })`,
            backgroundSize: '100%',
            color: `${data.type === 'number' ? '#000' : '#fff'}`,
          } : {
            backgroundImage: `url(${
            data.type === 'number' ? require('./assets/write.png') :
            (data.type === 'member' || data.type === 'equal') ? require('./assets/blue1.png') :
            (data.type === 'spoperator' || data.type === 'operator' ? require('./assets/blue2.png') : require('./assets/orange.png'))
          })`,
          backgroundSize: '100%',
          color: `${data.type === 'number' ? '#000' : '#fff'}`,
        }}
        key={data.value}
        onClick={this.handleValueInput.bind(this, data)} // eslint-disable-line
      >
        {data.value}
      </button>))

  // 监听所有按钮的click事件
  handleValueInput(data) {
    const { bracketsLeft } = this.state;
    if ((bracketsLeft && data.value === '(') || (!bracketsLeft && data.value === ')')) return false;
    const button = global.document.getElementById(data.value);
    this.image = button.style.backgroundImage;
    this.imageStr = this.image.split('.')[0].split('/');
    /* eslint-disable */
    if (data.type === 'brackets') {
      const button1 = global.document.getElementById( data.value === '(' ? ')' : '(');
      button1.style.backgroundImage = `url(${require('./assets/blue2.png')})`;
      button.style.backgroundImage = `url(${require('./assets/blue3.png')})`;
      this.setState({ bracketsLeft: !bracketsLeft });
    } else {
      let imageStr;
      const buttonStyle = this.imageStr[this.imageStr.length - 1];
      switch(buttonStyle) {
        case 'blue1':
          imageStr = imgBlue1;
          break;
        case 'blue2':
          imageStr = imgBlue2;
          break;
        case 'orange':
          imageStr = imgOrange;
          break;
        default:
          imageStr = imgWrite;
          break; 
      }
      button.style.backgroundImage = `url(${imageStr})`;
      button.style.transition = 'all 300ms linear 30ms';
      setTimeout(() => {
        button.style.backgroundImage = this.image;
      }, 150);
    }
    const oldState = this.state.valueText;
    let valueText, resultNum;
    try {
      const data1 = this.checkClickType(oldState, data);
      valueText = data1.valueText; // eslint-disable-line
      resultNum = data1.resultNum; // eslint-disable-line
    } catch (error) {
      console.error('计算出错, 做清空处理:', error);
      valueText = '0';
      resultNum = '0';
    }
    this.setState({ valueText, resultNum: resultNum.slice(0, 16), currentKey: data.value});
  }
  // 根据按钮自带的type属性来做不同的反应
  checkClickType(oldvalue, data) {
    const initFlag = oldvalue === '0' && data.type !== 'point';// 初次输入且不打算输入小数
    const calAfterFlag = this.state.equalFlag === true; // 计算后
    const { resultNum, mrNum } = this.state;
    switch (data.type) {
      case 'member':
        if (data.value === 'MR' && mrNum) {
          return { valueText: mrNum, resultNum: mrNum };
        } else if (data.value === 'MC') {
          this.setState({ mrNum: '' });
        } else if (data.value === 'M+') {
          this.setState({ mrNum: resultNum });
        }
        return { valueText: oldvalue, resultNum: resultNum || '0' };
      case 'equal':
        const prevresult = getAllValue(oldvalue);// 预处理特殊操作符
        this.setState({ equalFlag: true });
        return { valueText: '' + prevresult, resultNum: '' + prevresult }; // eslint-disable-line
      case 'back':
        const text = oldvalue.substring(0, oldvalue.length - 1) || '0'; // 删除最后一位
        return { valueText: text, resultNum: resultNum.substring(0, oldvalue.length - 1) || '0' };
      case 'clear':
        return { valueText: '0', resultNum: '0' };
      case 'operator': // 操作符
        if (data.value === '±') {
          const valueArr2 = oldvalue.split(' ');
          const value2 = valueArr2 && valueArr2[valueArr2.length - 2];
          if (valueArr2.length > 1 && isNaN(value2)) {
            const value3 = oldvalue && oldvalue.slice(0, valueArr2.lastIndexOf(' '));
            const value4 =  valueArr2 && valueArr2[valueArr2.length - 1];
            return { valueText: `${value3}-${value4}`, resultNum: `-${resultNum}`}
          } else {
            return { valueText: `-${resultNum}`, resultNum: `-${resultNum}`}
          }
        }
        if (calAfterFlag) { // 如果计算后
          this.setState({ equalFlag: false });
        }
        const valueArr = oldvalue.split(' ');
        if (valueArr[valueArr.length - 1] === '' && valueArr[valueArr.length - 2] !== ')') {
          // 删除操作符及左右的空格
          const oldvalue1 = oldvalue.substring(0, oldvalue.length - 3);
          return { valueText: `${oldvalue1} ${data.value} `, resultNum: oldvalue1 };
        }
        return { valueText: `${oldvalue} ${data.value} `, resultNum: oldvalue };
      case 'spoperator': // 运算符与数字不分离  //'^(2)','%','√','sin','cos','tan','lg'
        // 输入特殊运算符与输入数字等效 均为重新开始计算
        if (calAfterFlag) {
          this.setState({ equalFlag: false });
        }
        if (data.value === '√') {
          const result = Math.sqrt(Number(oldvalue)) + ''; // eslint-disable-line
          return { valueText: result, resultNum: result };
        }
        return { valueText: oldvalue + data.value, resultNum: oldvalue };
      case 'brackets': // 括号
        const valueArr0 = oldvalue.split('(');
        let value0 = valueArr0[valueArr0.length - 1].split(')');
        if (data.value === ')' && valueArr0[1]) {
          value0 = getAllValue(valueArr0[1]) + ''; // eslint-disable-line
          this.props.transferResult(value0); // 向外分发action
        }
        return {
          valueText: data.value === '(' ? data.value : '0',
          resultNum: value0, // eslint-disable-line
        };
      default: // 一般数字
        if (initFlag) {
          oldvalue = ''; // eslint-disable-line
        }
        if (calAfterFlag) { // 开始新一轮计算
          this.setState({ equalFlag: false });
        }
        if (data.value === '0' || data.value === '00') {
          const valueArr = oldvalue.split(' ');
          // 如果前面的符号为 /
          if (valueArr[valueArr.length - 2] === '÷') {
            this.setState({ errorFlag: true }); // 准备抛出错误
            return {
              valueText: '0',
              resultNum: '0',
            }; // 直接清零
          }
        }
        const valueArr1 = oldvalue.split(' ');
        const value = valueArr1 && valueArr1[valueArr1.length - 2];
        return {
          valueText: oldvalue + data.value,
          resultNum: valueArr1.length > 1 && isNaN(value) ? this.removeCharacter(valueArr1[valueArr1.length - 1] + data.value, '(') : this.removeCharacter(oldvalue + data.value, '(') // eslint-disable-line
        };
    }
  }
  // 去除字符串中某个字符前面的，包括该字符
  removeCharacter(string, character) {
    return string.split(character)[string.split(character).length - 1];
  }

  // 渲染
  render() {
    const { resultNum, mrNum } = this.state;
    const { transferVisible, destroy } = this.props;
    // 初始化DOM值
    return (
      <Drag
        className={styles.conatiner}
        destroy={() => destroy()}
      >
        <input
          type="text"
          className={css(styles.screen)}
          value={resultNum && resultNum.indexOf('.') !== -1 ? `${resultNum}` : `${resultNum}.`}
          readOnly
        />
        {
          mrNum && <span className={css(styles.mrNum)}>M</span>
        }
        <div
          className={css(styles.div_class_buttonlist)}
        >
          {this.initButtonList(KEYVALUE)}
        </div>
        <View
          className={!transferVisible ? styles.transfer1 : styles.transfer}
          onClick= {() => {
            if (!transferVisible) return false;
            this.props.transferResult(resultNum)
          }}
        >Transfer Display</View>
      </Drag>
    );
  }
}

