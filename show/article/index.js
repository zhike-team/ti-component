import React, { Component } from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { normalizeArticle } from './utils';
import Block from '../block';
import styles from './styles';

// TODO: 数据预处理在哪里做
export default class Article extends Component {
  // 参数
  static defaultProps = {
    isTextOnly: false,
    handleAnswer: () => {},
    question: {},
    answer: '',
    isReport: false,
    qNum: ['10'], // 雅思填空题 && 拖拽题  用来显示题号
    externalInitAnswer: -1, // 外部累计InsertBlank数量
    handleQuestionSelect: () => {}, // 处理答案选中
    materialIds: [], // 雅思填空题 && 拖拽题  用来定位
    answerRsult: [], // 答案集合
    paragraphClassName: undefined,
    pStyle: undefined,
    isIelts: false,
    location: undefined,
    imgWidth: 0,
  };

  static propTypes = {
    /**  富文本材料 */
    material: PropTypes.object.isRequired,
    /**  包含有关当前 URL 的信息的对象 */
    location: PropTypes.object,
    /**  托福题库中用于获取题目答案及 material中的富文本样式 */
    question: PropTypes.object,
    /**  是否只读 用于填空题及拖拽题的渲染 */
    isTextOnly: PropTypes.bool,
    /**  用户作答之后的回调函数 */
    handleAnswer: PropTypes.func,
    /**  用于报告页的答案显示 */
    answer: PropTypes.any,
    /**  是否是报告页 */
    isReport: PropTypes.bool,
    /**  需要显示的子题题号 */
    qNum: PropTypes.array,
    /**  外部累计InsertBlank数量 */
    externalInitAnswer: PropTypes.number,
    /**  处理子题选中 */
    handleQuestionSelect: PropTypes.func,
    /**  雅思填空题 && 拖拽题  用来定位 */
    materialIds: PropTypes.array,
    /**  答案集合 */
    answerRsult: PropTypes.array,
    /**  外部传进来的段落样式 */
    paragraphClassName: PropTypes.object,
    /** 专门用来设置段落间距 */
    pStyle: PropTypes.object,
    /**  是否是雅思题库 */
    isIelts: PropTypes.bool,
    /**  图片宽度 */
    imgWidth: PropTypes.number,
  };

  componentDidMount() {
    if (!this.props.isReport) {
      setTimeout(() => {
        if (this.anchor) {
          this.anchor.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isReport) {
      if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
        if (this.anchor) {
          setTimeout(() => {
            this.anchor.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    }
  }

  render() {
    const { material, question, isTextOnly, handleAnswer,
      answer, isReport, externalInitAnswer, qNum, materialIds,
      answerRsult, isIelts, paragraphClassName, imgWidth, pStyle,
    } = this.props;
    const article = normalizeArticle(
      material,
      get(question, 'materials.0.reference'),
      !isEmpty(question) ? isTextOnly : 'true',
    );
    const props = {};
    if (question.type === 'Insert') {
      props.handleAnswer = this.props.handleAnswer;
      // 暂时不支持富文本
      props.insertSentence = get(question, 'materials.0.insertSentence.paragraphs.0.text');
    }

    let initAnswer = 0;
    if (!Array.isArray(article.paragraphs) ||
      article.paragraphs.length === 0 || // 段落为空数组返回false
      // 段落只有一段，并且为空是返回false
      (article.paragraphs.length === 1 && article.paragraphs[0].text === '')) {
      return false;
    }
    return (
      <div className={css(styles.container)}>
        <div
          ref={node => {
            if (!article.hasAnchor && !isTextOnly) {
              this.anchor = node;
            }
          }}
        />
        {
          Array.isArray(article.paragraphs) &&
          article.paragraphs.map(p => {
            const count = p.inlineMarkups.filter(item => item.type === 'InsertBlank' || item.type === 'Insert' ||
              item.type === 'InsertLine' || item.type === 'DragBlank' || item.type === 'BlankTable').length;
            initAnswer += count;
            if (p.text === '') {
              return false;
            }
            return (
              <Block
                key={p.id}
                p={p}
                {...props}
                handleAnswer={handleAnswer}
                answer={isReport ? get(question, 'materials.0.answer') : answer}
                isReport={isReport}
                initAnswer={externalInitAnswer === -1 ? (initAnswer - count) :
                  (externalInitAnswer + initAnswer - count)}
                qNum={qNum}
                materialIds={materialIds}
                answerRsult={answerRsult}
                isIelts={isIelts}
                paragraphClassName={paragraphClassName}
                pStyle={pStyle}
                imgWidth={imgWidth}
              />
            );
          })
        }
      </div>
    );
  }
}

