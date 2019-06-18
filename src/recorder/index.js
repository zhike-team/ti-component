import React, { Component } from 'react';
import { RecordRTCPromisesHandler, StereoAudioRecorder } from 'recordrtc';
import { View, Image } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import Modal from '../modal';
import styles from './styles';

// 录音
export default class Recorder extends Component {
  static instance;
  static isInit;
  static recorder;

  /* eslint-disable */
  // 初始化
  static init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) { 
      navigator.mediaDevices = {};
    }

    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia 
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {

        // 首先，如果有getUserMedia的话，就获得它
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
  }

  // 开始录音
  static start({ mode, skip, callback = () => {} }) {
    this.destroy();
    this.init();
    if (!navigator.mediaDevices.getUserMedia) { // eslint-disable-line
      return this.onError({ mode, skip });
    }
    // navigator.mediaDevices.getUserMedia
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then( async stream => {
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      this.recorder = new RecordRTCPromisesHandler(stream, !isSafari ? { type: 'audio'} : { type: 'audio', recorderType: StereoAudioRecorder, });
      await this.recorder.startRecording()
      .then(() => callback())
      .catch(error => {
        console.log('getTracks:', stream.getTracks());
        this.onError({ mode, skip, key: 1 });
        console.error('startRecording failure', error)
      })
      console.log('this.recorder.recordRTC:', this.recorder.recordRTC);
    })
    .catch(err =>{
      console.log(err.name + ": " + err.message);
    });
  }

  // 暂停录音
  static pause() {
    try {
      // 组件库有问题，升级之后似乎并未内置该方法
      this.recorder && this.recorder.recordRTC && this.recorder.recordRTC.pauseRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 继续录音
  static resume() {
    try {
      this.recorder.recordRTC && this.recorder.recordRTC.resumeRecording();
    } catch (e) {
      console.log(e);
    }
  }

  // 停止录音
  static async stop () {
    await this.recorder.stopRecording();
    const url = await this.recorder.getDataURL().then(url => url);
    const blob = await this.recorder.getBlob().then(blob => blob);  
    return { url, blob };
  }

  // 卸载录音
  static destroy() {
    if (this.recorder && this.recorder.recordRTC && this.recorder.recordRTC.destroy) {
      this.recorder.recordRTC.destroy();
      this.recorder = null;
    } 
  }

  // 错误监听
  static onError({ mode, skip, key = 0 }) {
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
          {
            key === 1 &&
            <span className={css(styles.text1)}>
             因Safari浏览器录音权限限制，如果要继续录音，<br />
             请手动刷新页面（建议使用Chrome浏览器）<br />
            </span>
          }
          {
            key === 0 &&
            <span className={css(styles.text)}>
            1.请检查浏览器是否允许使用麦克风权限；<br />
            2.请在修改该权限后，刷新页面。
          </span>
          }
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
