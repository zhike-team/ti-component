import axios from 'axios';
import FormData from 'form-data';
import React, { Component } from 'react';
import { View, Button, Image } from '@zhike/ti-ui';
import { formatDuration } from '../utils';

import Recorder from '../../../src/recorder';
import Player from './audio';
import styles from './styles';

// 口语题目
export default class RecorderDemo extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: 'default',
      recordStatus: 'default',
      time: 0,
      recordUrl: undefined,
    };
    this.formData = undefined;
    this.signature = undefined;
    this.isSilenceUpload = false;
    this.timeInterval = undefined;
    this.player = null;
  }

  // 模块卸载
  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    Recorder.destroy();
  }

  // 监听页面离开
  monitorPageLeave() {
    const hidden = global.document.hidden || // Opera 12.10 and Firefox 18 and later support
      global.document.msHidden ||
      global.document.webkitHidden;

    if (hidden) {
      console.log('离开');
      Recorder.pause();
    } else {
      console.log('回来');
      Recorder.resume();
    }
  }

  // 开始录音
  startRecord() {
    Recorder.start({
      mode: 'practice',
      skip: () => {},
      callback: () => {
        global.document.addEventListener('visibilitychange', this.monitorPageLeave, false);
        this.timeInterval = setInterval(() => {
          const { time } = this.state;
          this.setState({
            time: time + 10,
          });
        }, 10);
      },
    });
    this.setState({ recordStatus: 'start', time: 0, uploadStatus: 'default' });
  }

  // 停止录音
  async stopRecord() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
      this.timeInterval = undefined;
    }
    this.setState({ recordStatus: 'stop' });
    const { time } = this.state;
    console.log('Recorder.stop():', Recorder.stop());
    await Recorder.stop().then(data => {
      console.log('data:', data);
      this.setState({
        recordUrl: data.url,
      });
      this.upload({
        duration: parseInt(time / 1000, 10),
        file: data.blob,
      }).catch(error => {
        this.upload({ error });
      });

      global.document.removeEventListener('visibilitychange', this.monitorPageLeave);
    });
  }

  // 播放录音
  playRecord() {
    const { recordUrl } = this.state;

    this.setState({
      recordStatus: 'play',
    });
    this.player = new Player();
    this.player.play({
      src: recordUrl,
      onended: this.cancelPlay,
      onpause: this.cancelPlay,
    });
  }

  // 取消播放
  cancelPlay = () => {
    this.setState({
      recordStatus: 'stop',
    });
    this.player.stop();
    this.player = null;
  }

  // 上传录音
  async upload(data) {
    this.setState({
      uploadStatus: 'uploading',
    });

    let audio;
    if (data.file || data.error) {
      try {
        if (data.error) {
          this.setState({
            recordStatus: 'stop',
          });
          this.isSilenceUpload = true;
          throw data.error;
        } else if (this.formData) {
          const audioData = await axios({
            url: this.signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: this.formData,
            timeout: 30000,
          });
          audio = { src: audioData.data.data.transcodeUrl, duration: data.duration };
        } else {
          this.signature = await axios({
            url: 'https://api.smartstudy.com/file/upload/signature',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              business: 'exercise/speaking',
              fileName: `${data.duration}.webm`,
            },
            timeout: 30000,
          });
          this.formData = new FormData();
          this.formData.append('key', this.signature.data.key);
          this.formData.append('policy', this.signature.data.policy);
          this.formData.append('OSSAccessKeyId', this.signature.data.accessKeyId);
          this.formData.append('signature', this.signature.data.signature);
          this.formData.append('callback', this.signature.data.callback);
          this.formData.append('file', data.file);
          const audioData = await axios({
            url: this.signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: this.formData,
            timeout: 30000,
          });

          audio = { src: audioData.data.data.transcodeUrl, duration: data.duration };
        }
      } catch (e) {
        console.log('error:', e);
        if (this.isSilenceUpload) {
          this.setState({ uploadStatus: 'fail' });
        } else {
          this.isSilenceUpload = true;
          setTimeout(() => {
            this.upload(data);
          }, 2000);
        }
        return;
      }
    }
    this.formData = undefined;
    this.signature = undefined;
    this.setState({ uploadStatus: 'success', recordUrl: audio.src, time: audio.duration * 1000 });
  }


  // 提示信息
  generateTip() {
    const { uploadStatus } = this.state;
    if (uploadStatus === 'success') {
      setTimeout(() => {
        this.setState({ uploadStatus: 'saved' });
      }, 2000);
    }
    if (uploadStatus === 'uploading') {
      return <View className={styles.tip}>正在保存录音...</View>;
    } else if (uploadStatus === 'success') {
      return <View style={{ color: '#52B343', marginTop: '10px' }}>录音保存成功</View>;
    } else if (uploadStatus === 'fail') {
      return <View className={[styles.tip, styles.colorFD5454]}>音频保存失败，请检查网络连接或使用Chrome浏览器重录</View>;
    }
    return false;
  }

  // 渲染
  render() {
    const { recordStatus, time, recordUrl, uploadStatus } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.article}>
          <View className={styles.text}>Direction:</View>
          <View>请根据题干，回答问题：（口语答案的长度不得少于45秒）</View>
          <View className={styles.text}>Questions:</View>
          <View>Can you tell me something about your family please?</View>
        </View>
        <View className={styles.recorderBox}>
          {
            recordStatus === 'default' &&
            <Image className={styles.image} src={require('./assets/recorder.png')} />
          }
          {
            recordStatus === 'start' &&
            <Image className={styles.image} src={require('./assets/recorder.gif')} />
          }
          {
            recordStatus === 'stop' &&
            <Image className={styles.image} src={require('./assets/volume.png')} />
          }
          {
            recordStatus === 'play' &&
            <Image className={styles.image} src={require('./assets/volume.gif')} />
          }
          <View className={styles.buttons}>
            {
              recordUrl &&
                <Button
                  className={styles.button}
                  isAvailable={!(recordStatus === 'start')}
                  text={recordStatus === 'play' ? '取消播放' : '播放录音'}
                  onClick={() => {
                    if (recordStatus === 'stop') {
                      this.playRecord();
                    } else {
                      this.cancelPlay();
                    }
                  }}
                />
            }
            <Button
              className={[
                styles.button,
                recordUrl && styles.gray,
              ]}
              textClassName={recordUrl && styles.grayText}
              isAvailable={(uploadStatus !== 'uploading' && recordStatus !== 'play')}
              text={recordStatus === 'start' ? '停止录音' : recordUrl ? '重新录音' : '开始录音'}
              onClick={async () => {
                if (uploadStatus === 'uploading') return false;
                if (recordStatus === 'start') {
                  await this.stopRecord();
                } else {
                  this.startRecord();
                }
              }}
            />
          </View>
          <View className={styles.time}>
            {formatDuration(time)}
          </View>
          {this.generateTip()}
        </View>
      </View>
    );
  }
}
