import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { View, Input, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import { get, sortBy, capitalize } from 'lodash';
import Audio from '../audio';
import { firstUpperCase } from './utils';
import styles from './styles';

class Block extends Component {
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
    imgWidth: 0,
  };
  static propTypes = {
    p: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    initAnswer: PropTypes.number,
    handleAnswer: PropTypes.func,
    insertSentence: PropTypes.string,
    hasAction: PropTypes.bool,
    answer: PropTypes.any,
    qNum: PropTypes.array,
    externalInitAnswer: PropTypes.number,
    handleQuestionSelect: PropTypes.func,
    answerRsult: PropTypes.array,
    materialIds: PropTypes.array,
    isReport: PropTypes.bool,
    paragraphClassName: PropTypes.object,
    isIelts: PropTypes.bool,
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
    if (this.props.location.pathname !== prevProps.location.pathname) {
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
        // 提取当前标记前的文字
        if (markup.index !== start) {
          if (p.text.substring(start, markup.index) !== '') {
            spans.push(p.text.substring(start, markup.index));
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
                {markupText}
                &nbsp;
              </span>,
            );
          }

          /* eslint-disable */
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
          /* eslint-enable */

          if (markup.value === 'left') {
            spans.push(
              <span
                key={`${start}-insert`}
              >
                &nbsp;
                {markupText}
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
              {markupText}
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
          spans.push(<span><img className={css(styles.kfformula)} src={`${markup.value}`} /></span>);
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
              {markupText}
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
                {markupText}<span className={css(styles.blockArrowBlank)} />
              </span>,
            );
          } else if (markup.value === 'left') {
            spans.push(
              <span key={`${start}`} >
                <span className={css(styles.blockArrowBlank)} />
                {markupText}
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
              {markupText}
            </span>,
          );
        }

        start += markup.length;
      }
      // 提取最后一个标记后的文字
      if (!inlineMarkups.length) {
        if (p.text.substr(start) !== '') {
          spans.push(p.text.substr(start));
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
      </View>
    );
  }
}

export default withRouter(Block);
