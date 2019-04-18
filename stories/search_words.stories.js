import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { css } from 'aphrodite';
import { Scrollbar, Button, View } from '@zhike/ti-ui';
import SearchWords from '../src/search_words';
import Modal from '../show/modal';
import Article from '../show/article';
import { material1, question1, answerAnalysis } from './article_data';
import styles from './styles';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('SearchWords', module)
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
  .add('SearchWords ',
  () => (
    <div style={{width: '500px', height: '500px'}}>
      {/* <Scrollbar
        onScrollStart={() => {SearchWords.hide()}}
      > */}
        <Article material={material1} question={question1}></Article>
        <SearchWords
          ref={searchWords => { SearchWords.instance = searchWords; }}
          getSearchWord="https://api.smartstudy.com/word/brief"
        ></SearchWords>
      {/* </Scrollbar> */}
    </div>
  ), {
    info: {
      text: `
      音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
      ~~~js
        <div style={{width: '500px', height: '500px'}}>
          <Scrollbar
            onScrollStart={() => {SearchWords.hide()}}
          >
            <Article material={material1} question={question1}></Article>
            <SearchWords
              ref={searchWords => { SearchWords.instance = searchWords; }}
              getSearchWord="https://api.smartstudy.com/word/brief"
            ></SearchWords>
          </Scrollbar>
        </div>
      ~~~
    `,
    TableComponent,
    inline: false,
    }
  })
  .add('弹窗 隐藏效果',
  () => (
    <div style={{width: '500px', height: '500px'}}>
      <Scrollbar
        onScrollStart={() => {SearchWords.hide()}}
      >
        <SearchWords
          ref={searchWords => { SearchWords.instance = searchWords; }}
          getSearchWord="https://api.smartstudy.com/word/brief"
        ></SearchWords>
        <Button
          className={styles.button}
          text="提示弹框"
          onClick={() => Modal.show('ModalAlert', {
            title: '温馨提示',
            buttons: [{
              title: '开始测评',
              onClick: () => {
                alert('开始测评～～');
              },
              class: 'alertTip',
            }],
            width: 400,
            component: (
              <View className={styles.modalAlertText}>
                <View className={styles.alertText}>
                1.请尽可能完成所有题目，确保测试的准确性；
                </View>
                <View className={styles.alertText}>2.测试过程中不支持跳题或返回上一题；</View>
                <View className={styles.alertText}>3.本测试不支持
                  <span className={css(styles.tipText)}>Safari</span>
                  、<span className={css(styles.tipText)}>IE</span>和
                  <span className={css(styles.tipText)}>Edge</span>浏览器，推荐使用
                  <span className={css(styles.tipText1)}>chrome</span>；
                </View>
                <View className={styles.alertText}>4.可提前准备好耳机和纸笔。</View>
              </View>
            ),
          }, ()=> {
            // SearchWords.hide();
          } )}
        />
        <Article material={material1} question={question1}></Article>
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
      </Scrollbar>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
      ~~~js
        <div style={{width: '500px', height: '500px'}}>
          <Scrollbar
            onScrollStart={() => {SearchWords.hide()}}
          >
            <Article material={material1} question={question1}></Article>
            <SearchWords
              ref={searchWords => { SearchWords.instance = searchWords; }}
              getSearchWord="https://api.smartstudy.com/word/brief"
            ></SearchWords>
          </Scrollbar>
        </div>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('弹窗 答案解析 隐藏效果',
  () => (
    <div style={{width: '500px', height: '500px'}}>
      <Scrollbar
        onScrollStart={() => {SearchWords.hide()}}
      >
        <SearchWords
          ref={searchWords => { SearchWords.instance = searchWords; }}
          getSearchWord="https://api.smartstudy.com/word/brief"
        ></SearchWords>
        <Button
            className={styles.button}
            text="答案解析"
            onClick={() => Modal.show('ModalAnalysis', {
              answerAnalysis,
            })}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
      </Scrollbar>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
      ~~~js
        <div style={{width: '500px', height: '500px'}}>
            <Article material={material1} question={question1}></Article>
            <SearchWords
              ref={searchWords => { SearchWords.instance = searchWords; }}
              getSearchWord="https://api.smartstudy.com/word/brief"
            ></SearchWords>
        </div>
      ~~~
    `,
    TableComponent,
    }
  })