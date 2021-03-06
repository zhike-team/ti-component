/**
 * 按钮样式（默认颜色是蓝色的那个）, 灰色class=gray
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Scrollbar } from '@zhike/ti-ui';
import Article from '../../article';
import SearchWords from '../../search_words';
import { getBodyHeight } from '../utils';
import styles from './styles';

export default class ModalComponent extends Component {
  // 参数
  static propTypes = {
    answerAnalysis: PropTypes.object.isRequired,
  };

  // 渲染
  render() {
    const { answerAnalysis } = this.props;
    return (
      <View className={styles.container} style={{ maxHeight: `${getBodyHeight() - 140}px` }}>
        <Scrollbar
          onScrollStart={() => { SearchWords.hide(); }}
          height={`${getBodyHeight() - 140}px`}
        >
          <Article
            material={answerAnalysis}
          />
        </Scrollbar>
      </View>
    );
  }
}
