import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TableComponent from './tableComponent';
import Error from '../src/error';

/* eslint-disable */

storiesOf('Error', module)
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
  .add('match',
  () => (
      <Error
      match={{
        params: {
          retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
          type: "save"
        }}}
      ></Error>
  ), {
    info: {
      text: `
      托福、雅思、基础题库的错误页面，统一提取出来。
      需要的传入 带有路径参数的match
      path: "/error/:type/:retryUrl?"
      使用组件方法如下：
    `,
    TableComponent,
    }
  })
  .add('type loading',
  () => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "loading"
      }}}
      ></Error>
  ), {
    info: {
      text: `
      错误页面的类型一共有五种
      loading 题目加载失败...
      compatible 暂不支持当前浏览器...
      multiple 对于同一场练习，暂不支持打开多个标签页...
      upload 答案上传失败...
      save 数据保存失败...
      ~~~js
      <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      ~~~
    `,
  TableComponent,
    }
  })
  .add('type compatible',
  () => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "compatible"
      }}}
      ></Error>
  ), {
    info: {
      text: `
        错误页面的类型一共有五种
        loading 题目加载失败...
        compatible 暂不支持当前浏览器...
        multiple 对于同一场练习，暂不支持打开多个标签页...
        upload 答案上传失败...
        save 数据保存失败...
      ~~~js
      <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      ~~~
    `,
  TableComponent,
    }
  })
  .add('type multiple',
  () => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "multiple"
      }}}
      ></Error>
  ), {
    info: {
      text :`错误页面的类型一共有五种
      loading 题目加载失败...
      compatible 暂不支持当前浏览器...
      multiple 对于同一场练习，暂不支持打开多个标签页...
      upload 答案上传失败...
      save 数据保存失败...
      ~~~js
        <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
      ~~~`,
  TableComponent,
    }
  })
  .add('type upload',
  () => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "upload"
      }}}
      ></Error>
  ), {
    info: {
      text: `
      错误页面的类型一共有五种
      loading 题目加载失败...
      compatible 暂不支持当前浏览器...
      multiple 对于同一场练习，暂不支持打开多个标签页...
      upload 答案上传失败...
      save 数据保存失败...
    ~~~js
    <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
    ~~~
  `,
  TableComponent,
    }
  })
  .add('type save',
  () => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "save"
      }}}
      ></Error>
  ), {
    info: {
      text: `错误页面的类型一共有五种
      loading 题目加载失败...
      compatible 暂不支持当前浏览器...
      multiple 对于同一场练习，暂不支持打开多个标签页...
      upload 答案上传失败...
      save 数据保存失败...`,
      TableComponent,
    }
  })