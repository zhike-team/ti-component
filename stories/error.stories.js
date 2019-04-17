import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Error from '../src/error';
import styles from './styles';

/* eslint-disable */
let initAnswer = 0;
// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles.container}>
    { storyFn() }
  </div>
);

storiesOf('Error', module)
  // .addDecorator(CenterDecorator)
  .add('match',
  withInfo(`
    托福、雅思、基础题库的错误页面，统一提取出来。
    需要的传入 带有路径参数的match
    path: "/error/:type/:retryUrl?"
    使用组件方法如下：
`)
  (() => (
      <Error
      match={{
        params: {
          retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
          type: "save"
        }}}
      ></Error>
  )))
  .add('type loading',
  withInfo(`
    错误页面的类型一共有五种
    loading 题目加载失败...
    compatible 暂不支持当前浏览器...
    multiple 对于同一场练习，暂不支持打开多个标签页...
    upload 答案上传失败...
    save 数据保存失败...
  ~~~js
  <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
  ~~~
`)
  (() => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "loading"
      }}}
      ></Error>
  )))
  .add('type compatible',
  withInfo(`
    错误页面的类型一共有五种
    loading 题目加载失败...
    compatible 暂不支持当前浏览器...
    multiple 对于同一场练习，暂不支持打开多个标签页...
    upload 答案上传失败...
    save 数据保存失败...
  ~~~js
  <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
  ~~~
`)
  (() => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "compatible"
      }}}
      ></Error>
  )))
  .add('type multiple',
  withInfo(`
    错误页面的类型一共有五种
    loading 题目加载失败...
    compatible 暂不支持当前浏览器...
    multiple 对于同一场练习，暂不支持打开多个标签页...
    upload 答案上传失败...
    save 数据保存失败...
  ~~~js
  <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
  ~~~
`)
  (() => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "multiple"
      }}}
      ></Error>
  )))
  .add('type upload',
  withInfo(`
    错误页面的类型一共有五种
    loading 题目加载失败...
    compatible 暂不支持当前浏览器...
    multiple 对于同一场练习，暂不支持打开多个标签页...
    upload 答案上传失败...
    save 数据保存失败...
  ~~~js
  <Block p={p1} answer={['答案一', '答案二', '答案三', '答案四',]}></Block>
  ~~~
`)
  (() => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "upload"
      }}}
      ></Error>
  )))
  .add('type save',
  withInfo(`
    错误页面的类型一共有五种
    loading 题目加载失败...
    compatible 暂不支持当前浏览器...
    multiple 对于同一场练习，暂不支持打开多个标签页...
    upload 答案上传失败...
    save 数据保存失败...
`)
  (() => (
    <Error
    match={{
      params: {
        retryUrl: "http%3A%2F%2Flocal.smartstudy.com%3A8080%2Fpractice%2F1002100%2F4885330%2F3",
        type: "save"
      }}}
      ></Error>
  )))