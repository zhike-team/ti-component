import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Block from '../show/block';
import { p, p1 } from './article_data';
import styles from './styles';

/* eslint-disable */
let initAnswer = 0;
// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles.container}>
    { storyFn() }
  </div>
);

storiesOf('Block', module)
  // .addDecorator(CenterDecorator)
  .add('p',
  withInfo(`
  段落解析组件 需要处理的文本为必传项 使用组件方法如下：
  ~~~js
    <Block p={p} hasAction={p.anchor}></Block>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Block p={p} hasAction={p.anchor}></Block>
      <br />
      </div>
  )))
  .add('answer',
  withInfo(`
  段落解析组件 传入对应的答案 使用组件方法如下：
  ~~~js
  <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      </div>
  )))
  .add('isTextOnly',
  withInfo(`
  段落解析组件 只读的功能 使用组件方法如下：
  ~~~js
    <Block p={p1} isTextOnly={true}></Block>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Block p={p1} isTextOnly={true}></Block>
      </div>
  )))
  .add('handleAnswer',
  withInfo(`
  段落解析组件 可以传入用户处理答案的回调函数 使用组件方法如下：
  ~~~js
  <Block p={p1} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}></Block>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Block p={p1} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}></Block>
      </div>
  )))
  .add('isReport',
  withInfo(`
  段落解析组件 是否为报告页 isReport 使用组件方法如下：
  ~~~js
    <Block p={p1} isReport={true}></Block>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Block p={p1} isReport={true}></Block>
      </div>
  )))
 //  answer, location, handleAnswer, insertSentence, hasAction, isPositionTip, paragraphClassName
 // qNum, externalInitAnswer, handleQuestionSelect, materialIds, answerRsult, isReport, isIelts