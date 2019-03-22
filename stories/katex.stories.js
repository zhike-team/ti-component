import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Katex from '../src/katex';
import styles from './styles';

/* eslint-disable */
let initAnswer = 0;
// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles.container}>
    { storyFn() }
  </div>
);

storiesOf('Katex', module)
  .addDecorator(CenterDecorator)
  .add('match',
  withInfo(`
    测试公式的渲染
`)
  (() => (
      <Katex></Katex>
  )))