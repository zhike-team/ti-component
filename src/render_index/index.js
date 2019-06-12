import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filter, get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import { history } from 'routers';
import { css } from 'aphrodite';
import styles from './styles';


// 生成题目索引 组件
export default class RenderIndex extends Component {
// 参数
  static propTypes = {
    questions: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      isShowArrows: false, // 是否显示折叠按钮
      questionArray: [], // 将题目分组存放
      isFolding: true, // 是否折叠
    };
  }

  componentWillMount() {
    const { questions } = this.props;
    let { questionId } = this.props.params;
    if (questions && !questionId) {
      questionId = questions[0].id;
    }
    const count = questions.length;
    const questionArray = [];
    // 当 题目数量超过14个时，右侧折叠按钮显示，
    if (count > 14) {
      // 将题目进行分组，分多行显示
      const countPages = Math.ceil(count / 13);
      for (let i = 1; i <= countPages; ++i) {  // eslint-disable-line
        const item = questions.slice((i - 1) * 13, i * 13);
        questionArray.push(item);
      }
      this.setState({ questionArray });
      const isShowArrows = true;
      this.setState({ isShowArrows });
      return false;
    }
    questionArray.push(questions);
    const isShowArrows = false;
    this.setState({ isShowArrows, questionArray });
  }

  // 生成题目索引 的函数
  renderIndex = isFolding => {
    const { questionArray } = this.state;
    if (isFolding) {
      return questionArray[0] && questionArray[0].map(this.renderButton);
    } else {
      return questionArray && questionArray.map(item => item.map(this.renderButton));
    }
  }
  // 渲染题号
  renderButton = (item, index) => {
    const { params, questions } = this.props;
    const { exerciseId, mode } = params;
    let { questionId } = params;
    const search = global.location.search; // eslint-disable-line
    if (!questionId) questionId = questions[0].id;
    const className = [styles.num];
    const isCorrect =
    item.materials[0].userAnswer ? item.materials[0].userAnswer.correct : null;
    if (['Blank', 'ChooseMany', 'ChooseOne', 'SortPointSelect', 'PointSelect', 'Sort'].indexOf(item.type) !== -1) {
      if (parseInt(questionId, 10) === item.id && !isCorrect) {
        className.push(styles.numRedActive);
      } else if (parseInt(questionId, 10) === item.id && isCorrect) {
        className.push(styles.numGreenActive);
      } else if (parseInt(questionId, 10) !== item.id && !isCorrect) {
        className.push(styles.numRed);
      } else if (parseInt(questionId, 10) !== item.id && isCorrect) {
        className.push(styles.numGreen);
      }
    } else if (parseInt(questionId, 10) === item.id) {
    // 判断主观题 item.type === 'SubjectBlank' 'FollowUp'
      className.push(styles.numBlackActive);
    } else {
      className.push(styles.numBlack);
    }
    return (
      <View
        key={index}
        className={className}
        onClick={() => history.push(`/report/${mode}/${exerciseId}/${item.id}${search}`)}
      >
        {item.rank}
      </View>);
  }
  render() {
    const { questions } = this.props;
    const { isShowArrows, isFolding } = this.state;
    return (
      <View style={{ width: 510, borderBottom: 'solid 1px #c3ccd1', paddingBottom: '20px' }}>
        <View className={styles.indexBox}>
          <View className={styles.left}>
            {this.renderIndex(isFolding)}
          </View>
          {
            isShowArrows &&
              <View
                className={[styles.num, styles.right, styles.button]}
                onClick={() => {
                  this.setState({ isFolding: !isFolding });
                }}
              >
                <Image src={isFolding ? require('./assets/arrows.png') : require('./assets/arrows_top.png')} className={styles.image} />
              </View>
          }
        </View>
        <View className={styles.answer}>
          答对：<span className={css(styles.correct)}>&nbsp;{filter(questions, question => get(question, 'materials.0.userAnswer.correct')).length}</span>
          答错：<span className={css(styles.error)}>&nbsp;{filter(questions, question => !get(question, 'materials.0.userAnswer.correct')).length}</span>
        </View>
      </View>
    );
  }
}
