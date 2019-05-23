import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TableComponent from './tableComponent';
import Block from '../show/block';
import { p, p1, p2, p4 } from './article_data';
import styles from './styles';

/* eslint-disable */
let initAnswer = 0;

storiesOf('Block', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      // Make a default for all stories in this book,
      inline: true, // where the components are inlined
      styles: {
        header: {
          h1: {
            color: '#62C9FF',
          },
          h2: {
            color: '#32363A',
          }
        },
      },
      source: false,
      },
    },
  )
  .add('参数 p',
  () => (
  <div style={styles.container}>
    <Block p={p} hasAction={p.anchor}></Block>
  <br />
  </div>
),{
  info: {
    text: `
      段落解析组件 需要处理的文本为必传项 使用组件方法如下:
      ~~~js
      <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      ~~~
    `,
    TableComponent,
  }
})
  .add('answer',
  () => (
      <div style={styles.container}>
        <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      </div>
  ), {
    info: {
      text: `
      段落解析组件 传入对应的答案 使用组件方法如下：
      ~~~js
      <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('isTextOnly',
  () => (
      <div style={styles.container}>
        <Block p={p1} isTextOnly={true}></Block>
      </div>
  ), {
    info: {
      text: `
      段落解析组件 只读的功能 使用组件方法如下：
      ~~~js
        <Block p={p1} isTextOnly={true}></Block>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('handleAnswer',
  () => (
      <div style={styles.container}>
        <Block p={p1} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}></Block>
      </div>
  ), {
    info: {
      text: `
      段落解析组件 可以传入用户处理答案的回调函数 使用组件方法如下：
      ~~~js
      <Block p={p2} handleAnswer={()=> { alert('～～处理用户作答的回调函数～～');}}></Block>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('isReport',
  () => (
      <div style={styles.container}>
        <Block p={p2} isReport={true}></Block>
      </div>
  ),
  {
    info: {
      text:   `
      段落解析组件 是否为报告页 isReport 使用组件方法如下：
      ~~~js
        <Block p={p1} isReport={true}></Block>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('设置图片宽度',
  () => (
      <div style={styles.container}>
        <Block p={p4} isReport={true} imgWidth={200}></Block>
      </div>
  ),
  {
    info: {
      text:   `
      段落解析组件 支持设置图片宽度 imgWidth 传数字类型 使用组件方法如下：
      ~~~js
        <Block p={p4} isReport={true} imgWidth={200}></Block>
      ~~~
    `,
    TableComponent,
    }
  })
//  //  answer, location, handleAnswer, insertSentence, hasAction, isPositionTip, paragraphClassName
//  // qNum, externalInitAnswer, handleQuestionSelect, materialIds, answerRsult, isReport, isIelts