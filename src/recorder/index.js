import React, { Component } from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { View, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import Modal from '../modal';
import styles from './styles';

// 录音
export default class Recorder extends Component {
  static instance;
  static isInit;
  static recorder;

  // 初始化
  static init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;

    navigator.getUserMedia = // eslint-disable-line
      navigator.getUserMedia || navigator.webkitGetUserMedia; // eslint-disable-line
  }

  // 开始录音
  static start({ mode, skip, callback = () => {} }) {
    this.init();
    this.destroy();
    if (!navigator.getUserMedia) { // eslint-disable-line
      return this.onError({ mode, skip });
    }

    navigator.getUserMedia( // eslint-disable-line
      { audio: true },
      stream => {
        this.recorder = new RecordRTCPromisesHandler(stream, { type: 'audio' });
        this.recorder.startRecording()
          .then(() => callback())
          .catch(() => this.onError({ mode, skip }));
      },
      () => this.onError({ mode, skip }),
    );
  }

  // 暂停录音
  static pause() {
    try {
      // 组件库有问题，升级之后似乎并未内置该方法
      this.recorder.pauseRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 继续录音
  static resume() {
    try {
      // 组件库有问题，升级之后似乎并未内置该方法
      this.recorder.resumeRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 停止录音
  static stop() {
    return this.recorder.stopRecording()
      .then(url => {
        const blob = this.recorder.getBlob();
        return { url, blob };
      });
  }

  // 卸载录音
  static destroy() {
    if (this.recorder && this.recorder.destroy) {
      this.recorder.destroy();
    }
  }

  // 错误监听
  static onError({ mode, skip }) {
    const buttons = [
      {
        title: '刷新页面',
        onClick: () => global.location.reload(), // eslint-disable-line
      },
    ];

    if (mode && mode === 'mock') {
      buttons.push({
        title: '跳过口语',
        class: 'gray',
        onClick: () => skip(),
      });
    }

    const { onShow, onHide } = Modal.instance.state;
    Modal.show('ModalAlert', {
      title: '录音错误提示',
      buttons,
      width: 400,
      component: (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image src={require('../assets/fail.png')} style={{ width: '80px', margin: '20px 0 30px' }} />
          <span className={css(styles.text)}>
            1.请检查浏览器是否允许使用麦克风权限；<br />
            2.请在修改该权限后，刷新页面。
          </span>
        </View>
      ),
    }, onShow, onHide);
  }

  // 渲染
  render() {
    return (
      <View />
    );
  }
}
