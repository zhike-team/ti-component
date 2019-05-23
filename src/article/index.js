import React, { Component } from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { get, isEmpty } from 'lodash';
import { normalizeArticle } from './utils';
import Block from '../block';
import styles from './styles';

// TODO: 数据预处理在哪里做
class Article extends Component {
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
    isIelts: false,
    imgWidth: 0,
  };

  static propTypes = {
    material: PropTypes.object.isRequired,
    question: PropTypes.object,
    isTextOnly: PropTypes.bool,
    handleAnswer: PropTypes.func,
    location: PropTypes.object.isRequired,
    answer: PropTypes.any,
    isReport: PropTypes.bool,
    qNum: PropTypes.array,
    externalInitAnswer: PropTypes.number,
    handleQuestionSelect: PropTypes.func,
    materialIds: PropTypes.array,
    answerRsult: PropTypes.array,
    paragraphClassName: PropTypes.object,
    isIelts: PropTypes.bool,
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
    const { material, question, isTextOnly,
      answer, isReport, externalInitAnswer,
      qNum, materialIds, answerRsult, isIelts,
      paragraphClassName, imgWidth,
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
                answer={isReport ? get(question, 'materials.0.answer') : answer}
                initAnswer={externalInitAnswer === -1 ? (initAnswer - count) :
                  (externalInitAnswer + initAnswer - count)}
                qNum={qNum}
                materialIds={materialIds}
                answerRsult={answerRsult}
                isIelts={isIelts}
                paragraphClassName={paragraphClassName}
                imgWidth={imgWidth}
              />
            );
          })
        }
      </div>
    );
  }
}

export default withRouter(Article);

