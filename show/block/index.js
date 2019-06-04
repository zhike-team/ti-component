import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { View, Input, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { get, sortBy, capitalize } from 'lodash';
import Audio from '../audio';
import { firstUpperCase } from './utils';
import styles from './styles';

export default class Block extends Component {
  // 参数
  static defaultProps = {
    initAnswer: 0,
    insertSentence: '',
    hasAction: true,
    handleAnswer: () => {},
    answer: [],
    qNum: ['10'], // 雅思填空题 && 拖拽题  用来显示题号
    externalInitAnswer: -1, // 外部累计InsertBlank数量
    handleQuestionSelect: () => {}, // 处理答案选中
    materialIds: [], // 雅思填空题 && 拖拽题  用来定位
    answerRsult: [], // 答案集合
    isReport: false,
    paragraphClassName: undefined,
    isIelts: false,
    location: undefined,
    imgWidth: 0,
  };
  static propTypes = {
    /**  block组件处理的段落  */
    p: PropTypes.object.isRequired,
    /**  包含有关当前 URL 的信息的对象 */
    location: PropTypes.object,
    /**  初始答案 */
    initAnswer: PropTypes.number,
    /**  用户作答之后的回调函数 */
    handleAnswer: PropTypes.func,
    /**  托福插入题 插入的句子 */
    insertSentence: PropTypes.string,
    /**  是否有段落定位 */
    hasAction: PropTypes.bool,
    /**  用于报告页的答案显示 */
    answer: PropTypes.any,
    /**  需要显示的子题题号 */
    qNum: PropTypes.array,
    /**  外部累计InsertBlank数量 */
    externalInitAnswer: PropTypes.number,
    /**  处理子题选中 */
    handleQuestionSelect: PropTypes.func,
    /**  答案集合 */
    answerRsult: PropTypes.array,
    /**  雅思填空题 && 拖拽题  用来定位 */
    materialIds: PropTypes.array,
    /**  是否是报告页 */
    isReport: PropTypes.bool,
    /**  外部传进来的段落样式 */
    paragraphClassName: PropTypes.object,
    /**  是否是雅思题库 */
    isIelts: PropTypes.bool,
    /**  图片宽度 */
    imgWidth: PropTypes.number,
  };

  // 加载
  componentDidMount() {
    if (this.anchor) {
      const anchorElement = ReactDOM.findDOMNode(this.anchor); // eslint-disable-line
      setTimeout(() => {
        anchorElement.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }, 100);
    }
  }

  // 更新
  componentDidUpdate(prevProps) {
    if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
      if (this.anchor) {
        const anchorElement = ReactDOM.findDOMNode(this.anchor); // eslint-disable-line
        setTimeout(() => {
          anchorElement.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }

  // 渲染行内元素
  renderInline = () => {
    const { p, insertSentence, hasAction, handleAnswer, initAnswer, answer, isReport, qNum, materialIds, answerRsult, isIelts } = this.props;
    // 处理内部标记
    if (Array.isArray(p.inlineMarkups) && p.inlineMarkups.length) {
      const spans = [];
      let insertLineIndex = 0;
      const inlineMarkups = sortBy(p.inlineMarkups, 'index').map(
        (markup, index) => {
          const answerIndex = (markup.type === 'Insert' || markup.type === 'InsertLine' || markup.type === 'InsertBlank' || markup.type === 'DragBlank' || markup.type === 'BlankTable') ? insertLineIndex + initAnswer : index;
          if (markup.type === 'Insert' || markup.type === 'InsertLine' || markup.type === 'InsertBlank' || markup.type === 'DragBlank' || markup.type === 'BlankTable') insertLineIndex += 1;
          return Object.assign({}, markup, { answerIndex });
        });

      let start = 0;
      let cntAnswer = initAnswer;
      while (inlineMarkups.length) {
        const markup = inlineMarkups.shift();
        console.log('markup:', markup);
        // 提取当前标记前的文字
        if (markup.index !== start) {
          if (p.text.substring(start, markup.index) !== '') {
            const text = p.text.substring(start, markup.index);
            spans.push(this.handleCenter(text));
          }
          start = markup.index;
        }

        // 处理当前标记部分的文字
        const markupText = p.text.substr(start, markup.length);
        // 判断标记是否为插入标记
        if (markup.type === 'Insert') {
          const onClick = markup => {
            if (isReport) {
              return;
            }
            if (hasAction) {
              handleAnswer([markup.answerIndex]);
            }
          };

          if (markup.value === 'right') {
            spans.push(
              <span
                key={`${start}-insert`}
              >
                {this.handleCenter(markupText)}
                &nbsp;
              </span>,
            );
          }

          /* eslint-disable  */
          if (get(answer, '0') === cntAnswer) {
            spans.push(<span key={`${start}-head`}>&nbsp;</span>);
            spans.push(
              <span
                key={start}
                className={css(styles.inlineHighlight)}
                onClick={() => onClick(markup)}
              >
                {insertSentence}
              </span>,
            );
            spans.push(<span key={`${start}-tail`}>&nbsp;</span>);
          } else {
            spans.push(
              <span
                key={start}
                className={css(styles[`inline${markup.type}`])}
                onClick={() => onClick(markup)}
              />,
            );
          }
          /* eslint-enable  */

          if (markup.value === 'left') {
            spans.push(
              <span
                key={`${start}-insert`}
              >
                &nbsp;
                {this.handleCenter(markupText)}
              </span>,
            );
          }
          cntAnswer += 1;
        } else if (markup.type === 'InsertLine') {
          let defaultAnswer = '';
          if (answer && !isReport) {
            defaultAnswer = answer[markup.answerIndex] || '';
          }
          spans.push(
            <span key={start} >
              {this.handleCenter(markupText)}
              <Input
                readOnly={isReport}
                className={styles[`${markup.value}Line`]}
                onChange={e => handleAnswer(e, markup.answerIndex)}
                value={defaultAnswer}
                placeholder={defaultAnswer}
              />
            </span>,
          );
        } else if (markup.type === 'Formula') {
          spans.push(<span key={start} ><img className={css(styles.kfformula)} src={`${markup.value}`} /></span>);
        } else if (markup.type === 'InsertBlank' ||
        markup.type === 'BlankTable' || markup.type === 'DragBlank') {
          let defaultAnswer = '';
          let className;
          if (answer && !isReport) {
            defaultAnswer = answer[markup.answerIndex] || '';
          }
          if (isReport && isIelts) {
            defaultAnswer = get(answerRsult, `${markup.answerIndex}.userAnswer`) || '';
            className = get(answerRsult, `${markup.answerIndex}.isCorrect`) ? styles.correct : styles.error;
          } else {
            className = styles.insertBlank;
          }
          spans.push(
            <span
              key={start}
              className={css(styles.ieltsBlank)}
            >
              {this.handleCenter(markupText)}
              <input
                ref={get(materialIds, `${markup.answerIndex}`) && get(materialIds, `${markup.answerIndex}`).toString()}
                readOnly={isReport}
                className={css(className)}
                onChange={e => {
                  if (isReport) return false;
                  if (isIelts) {
                    handleAnswer(e.target.value, markup.answerIndex,
                      materialIds[markup.answerIndex], false);
                  } else {
                    handleAnswer(e, markup.answerIndex);
                  }
                }}
                onBlur={e => {
                  if (isReport) return false;
                  if (isIelts) {
                    const regex = /^(\s)*$/g;
                    if (regex.test(defaultAnswer) || defaultAnswer === null) {
                      e.target.placeholder = qNum[markup.answerIndex] &&
                      qNum[markup.answerIndex].toString();
                    }
                      handleAnswer(e.target.value, markup.answerIndex,
                        materialIds[markup.answerIndex]);
                  } else {
                    handleAnswer(e, markup.answerIndex);
                  }
                }
              }
                value={defaultAnswer}
                placeholder={isIelts ? qNum[markup.answerIndex] && qNum[markup.answerIndex].toString() : defaultAnswer}
                id={isIelts ? get(materialIds, `${markup.answerIndex}`) && get(materialIds, `${markup.answerIndex}`).toString() : ''}
                onFocus={e => {
                  if (isReport) return false;
                  if (isIelts) {
                    e.target.placeholder = '';
                    this.props.handleQuestionSelect(materialIds[markup.answerIndex]);
                  }
                }}
              />
            </span>,
          );
        } else if (markup.type === 'Arrow') {
          if (markup.value === 'right') {
            spans.push(
              <span key={`${start}`}>
                {this.handleCenter(markupText)}<span className={css(styles.blockArrowBlank)} />
              </span>,
            );
          } else if (markup.value === 'left') {
            spans.push(
              <span key={`${start}`} >
                <span className={css(styles.blockArrowBlank)} />
                {this.handleCenter(markupText)}
              </span>,
            );
          }
        } else {
          spans.push(
            <span
              key={start}
              className={css(
                markup.type === 'FontSize'
                  ? styles[`inline${markup.type}${capitalize(markup.value)}`]
                  : styles[`inline${markup.type}${markup.value ? capitalize(markup.value) : ''}`],
              )}
            >
              {this.handleCenter(markupText)}
            </span>,
          );
        }

        start += markup.length;
      }
      // 提取最后一个标记后的文字
      if (!inlineMarkups.length) {
        if (p.text.substr(start) !== '') {
          spans.push(this.handleCenter(p.text.substr(start)));
        }
      }
      return <p className={css(styles.block)}>{spans} </p>;
    }
    // 行内样式中如果插入空格，回车的处理情况
    // const regex = /^(\s)*$/g;
    // if (regex.test(p.text)) {
    //   return false;
    // }
    return <p className={css(styles.block)}>{p.text}</p>;
  }

  // 处理段落样式（图片Image && 音频 Audio）
  renderOrigin = () => {
    const { p } = this.props;
    if (Array.isArray(p.markups) && p.markups.length) {
      return p.markups.map((item, index) => {
        const type = firstUpperCase(item.type);
        if (type === 'Audio') {
          return (
            <div key={index} className={css(styles.block)}>
              <Audio src={item.uploadPath} />
            </div>
          );
        } else if (type === 'Image') {
          return (
            <div key={index} className={css(styles.block)} style={{ textAlign: 'center' }}>
              <Image
                src={item.uploadPath}
                style={this.props.imgWidth ? { width: `${this.props.imgWidth}px` } : { width: '100%' }}
              />
            </div>
          );
        }
        return false;
      });
    }
  }
  // 处理段落换行的问题
  handleCenter = text => {
    if (text.indexOf('↵') === -1) return text;
    const spans = text.split('↵');
    return spans.map((span, index) => (
      <p
      className={css(styles.center)}
      >
        {span}
        {
          index !== spans.length - 1 &&
            <span>&#10;</span> // eslint-disable-line
        }
      </p>
    ));
  }


  // 渲染
  render() {
    const { p, paragraphClassName } = this.props;
    const props = {};
    if (p.anchor) {
      props.ref = node => {
        this.anchor = node;
      };
    }
    return (
      <View
        className={[styles.paragraph, paragraphClassName,
          ...p.markups.map(markup => {
            if (markup.type === 'Align') {
              return styles[`block${markup.type}${capitalize(markup.value)}`];
            }
            return styles[`block${markup.type}`];
          }),
        ]}
        {...props}
      >
        {/* {
          find(p.markups, markup => markup.type === 'Arrow') &&
          <span
            className={css(styles.blockArrowBlank)}
          />
        } */}

        {this.renderInline()}

        { p.markups && p.markups.length > 0 &&
          this.renderOrigin()
        }

        {/* {
          isPositionTip &&
          !!this.renderInline() &&
          <img src={imgArrow} alt="arrow" className={css(styles.arrow)} />
        } */}
      </View>
    );
  }
}

