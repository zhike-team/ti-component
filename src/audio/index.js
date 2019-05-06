import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { View, Image, Scrollbar } from '@zhike/ti-ui';
import { remove, get } from 'lodash';
import Article from '../article';
import Parser from './utils';
import SearchWords from '../search_words';
import styles from './styles';

const audioContainer = [];

// 没有播放组件的
export class Player {
  // 构造
  constructor() {
    this.player = null;
  }
  // 开始播放
  play(options = {}) {
    this.player = new global.window.Audio(options.src);
    this.player.onended = options.onended;
    this.player.onpause = options.onpause;
    audioContainer.forEach(audio => {
      audio.pause();
    });
    audioContainer.push(this.player);
    this.player.play();
  }
  // 停止播放
  stop() {
    remove(audioContainer, audio => audio === this.player);
    this.player.onpause = null;
    this.player.onended = null;
    this.player.src = '';
    this.player = null;
  }
}

export default class Audio extends Component {
  // 参数
  static defaultProps = {
    src: '',
    showPlayer: true,
    cdnUrl: 'https://media8.smartstudy.com', // 默认是线上路径，需要外部传入
    text: '',
    materialType: '',
  };

  static propTypes = {
    /**  音频地址 */
    src: PropTypes.string,
    /** 是否显示播放器 */
    showPlayer: PropTypes.bool,
    /** cdnUrl 线上与dev 有差别 */
    cdnUrl: PropTypes.string,
    /** 支持传入材料原文 和音频译文  支持时间码和富文本结构 */
    text: PropTypes.any,
    /** 传入的材料类型 目前支持 听力原文和范例音频 'listenTranslation', 'exampleOriginal'
     想要支持查看音频对应的原文或者译文， 必须要传 materialType 字段
     */
    materialType: PropTypes.string,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      width: (props.text || props.materialType) ? 250 : 338,
      text: '',
      materialType: props.materialType,
      playing: false,
      duration: 0,
      currtime: '00:00',
      progress: 0,
      show: false,
      isload: true,
      isFirst: true, // 测评音频只能播放一次
      isTest: global.location.pathname.match(/\/([^\/]*)\//) && // eslint-disable-line
      global.location.pathname.match(/\/([^\/]*)\//)[1] === 'test', // eslint-disable-line
    };
    this.audio = null;
    this.isTry = 0;
  }

  componentDidMount() {
    this.setWidth();
  }

  componentWillMount() {
    this.setAudio(this.props.src);
    this.handleText(this.props.text);
  }

  // 模块接受参数
  componentWillReceiveProps(nextProps) {
    if (this.props.src === nextProps.src) return false;
    if (this.audio) {
      remove(audioContainer, audio => audio === this.audio);
      this.audio.onloadedmetadata = null;
      this.audio.ontimeupdate = null;
      this.audio.onplaying = null;
      this.audio.onpause = null;
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.src = '';

      this.audio = null;
      this.setAudio(nextProps.src);
      this.handleText(nextProps.text);
      this.setWidth();
    }
  }

  componentWillUnmount() {
    if (this.audio) {
      remove(audioContainer, audio => audio === this.audio);
      this.audio.onloadedmetadata = null;
      this.audio.ontimeupdate = null;
      this.audio.onplaying = null;
      this.audio.onpause = null;
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.src = '';
      this.audio = null;
    }
  }

  // 生成aduio
  generateAudio() {
    const { playing, progress, duration, currtime, width, isload, isFirst, isTest } = this.state;
    const playClass = [styles.default];
    playing ? playClass.push(styles.pause) : playClass.push(styles.play);
    const blueWidth = width * progress / 100;
    // 是否限制音频播放
    const closeAudio = isFirst === false && isTest;
    return (
      <View className={styles.audioBox}>
        <View
          className={playClass}
          onClick={() => { if (!closeAudio) { this.handleClickPlay(); } }}
          style={{ opacity: `${closeAudio ? '0.5' : '1'}` }}
        />
        <View>{currtime}</View>
        <View className={styles.progressBox} style={{ width: `${width}px` }}>
          <View
            className={styles.progress}
            onClick={e => { if (!closeAudio) { this.handleClickProgress(e); } }}
          >
            <View className={styles.blueProgress} style={{ width: `${blueWidth}px` }} />
          </View>
          <View
            className={styles.dot}
            style={{ left: `${blueWidth - 6}px` }}
            onTouchStart={() => { if (!closeAudio) { this.onTouchStart(); } }}
            onTouchMove={() => { if (!closeAudio) { this.onTouchMove(); } }}
            onTouchEnd={() => { if (!closeAudio) { this.onTouchEnd(); } }}
          />
        </View>
        <View>{duration.toFixed(0) > 0 ? this.timeFormat(duration.toFixed(0)) : this.timeFormat(1)}</View>
        {
          isload &&
            <View className={styles.mask}>
              <View className={styles.spot} />
              <View className={styles.spot} />
              <View className={styles.spot} />
            </View>
        }
      </View>
    );
  }

  // 生成空audio
  generateEmptyAudio() {
    return (
      <View className={styles.audioBox}>
        <View className={[styles.default, styles.gray]} />
        <View className={styles.color878F98}>暂无范例音频</View>
        <View className={styles.progressBox} style={{ width: '203px' }}>
          <View className={styles.progress} />
        </View>
        <View className={styles.color878F98}>00:00</View>
      </View>
    );
  }

  // 生成听力译文
  generateListeningText() {
    const { text, show } = this.state;
    if (Array.isArray(text)) {
      return (
        <View>
          {
            text.map((item, index) =>
              (
                <View className={styles.raw} key={index}>
                  <View className={styles.rawText}>{item.raw}</View>
                  {
                    show && item.translation && <View className={styles.rawText}>{item.translation}</View>
                  }
                </View>
              ))
          }
        </View>
      );
    } else if (typeof text === 'string') {
      return (
        <View style={{ paddingBottom: '18px' }} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
      );
    }
    return (
      <Article material={text} isReport />
    );
  }

  // 圆点onTouchStart
  onTouchStart = e => {
    console.log(e, 'start');
  }

  // 圆点onTouchMove
  onTouchMove = e => {
    console.log(e, 'move');
  }

  // 圆点onTouchEnd
  onTouchEnd = e => {
    console.log(e, 'end');
  }

  // 创建音频
  setAudio = src => {
    const newSrc = src.indexOf('//') === -1 ? `${this.props.cdnUrl}/${src}` : src;
    if (!src) {
      this.setState({ show: false, isload: true });
      return false;
    }
    this.audio = new global.window.Audio(newSrc);
    this.audio.onplaying = this.handlePlay;
    this.audio.onpause = this.handlePause;
    this.audio.onended = this.handleEnded;
    this.audio.onerror = this.handleError;
    this.handleClickProgress = this.handleClickProgress;
    this.audio.onloadedmetadata = this.handleLoadedmetadata;
    this.audio.onloadedmetadata = this.handleLoadedmetadata;
    this.audio.ontimeupdate = this.handleTimeupdate;

    this.setState({
      playing: false,
      duration: 0,
      currtime: '00:00',
      progress: 0,
      show: false,
      isload: true,
    });
    audioContainer.push(this.audio);
  }
  // 设置进度条宽度
  setWidth = () => {
    if (!this.props.showPlayer) return false;
    // 根据audio 的父元素的宽度 设置进度条的宽度；
    const element = ReactDOM.findDOMNode(this.container); // eslint-disable-line
    setTimeout(() => {
      if (element.parentElement && element.parentElement.offsetWidth) {
        const width = this.props.materialType ?
          element.offsetWidth - 260 : element.offsetWidth - 162;
        this.setState({
          width,
        });
      }
    }, 100);
  }
  // 处理text
  handleText = text => {
    let mdRet;
    if (typeof text === 'object') {
      const isSpecialText = get(text, 'paragraphs.0.text') && get(text, 'paragraphs.0.text').indexOf('}}');
      if (isSpecialText && isSpecialText !== -1) {
        const parser = new Parser();
        for (let i = 0; i < text.paragraphs.length; i += 1) {
          mdRet += text.paragraphs[i].text;
        }
        mdRet = parser.parse(mdRet, false);
      } else {
        mdRet = text;
      }
    } else if (typeof text === 'string') {
      const isSpecialText = text.indexOf('}}');
      if (isSpecialText && isSpecialText !== -1) {
        const parser = new Parser();
        mdRet = parser.parse(text, false);
      } else {
        mdRet = text;
      }
    }
    this.setState({
      text: mdRet || this.state.text,
    });
  }
  // 音频加载完
  handleLoadedmetadata = () => {
    this.setState({
      isload: false,
      duration: this.audio ? this.audio.duration : 45,
    });
  }

  // 进度条
  handleTimeupdate = () => {
    const { duration } = this.state;
    if (this.audio && this.audio.currentTime) {
      const currentTime = this.timeFormat(this.audio.currentTime.toFixed(0));

      this.setState({
        currtime: currentTime,
        progress: this.audio.currentTime / duration * 100,
      });
    }
  }

  // 处理时间
  timeFormat(times) {
    let day = 0;
    let hour = 0;
    let minute = 0;
    let seconds = 0;
    let newTimes = times;
    if (newTimes > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      seconds = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }

    if (minute <= 9) minute = `0${minute}`;
    if (seconds <= 9) seconds = `0${seconds}`;
    newTimes = `${minute}:${seconds}`;

    return newTimes;
  }

  // 播放
  handlePlay = () => {
    this.setState({ playing: true });
  }

  // 暂停
  handlePause = () => {
    this.setState({ playing: false });
  }

  // 播放结束
  handleEnded = () => {
    this.setState({
      playing: false,
      progress: 0,
      currtime: '00:00',
      isFirst: false,
    });
  }

  // 点击播放
  handleClickPlay = () => {
    if (!this.state.playing) {
      audioContainer.forEach(audio => {
        audio.pause();
      });
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  // 点击进度条
  handleClickProgress = e => {
    const { duration, width } = this.state;
    this.audio.currentTime = e.nativeEvent.offsetX / width * duration;
  }

  // 报错信息
  handleError = () => {
    if (this.isTry < 2) {
      setTimeout(() => {
        if (!this.audio) return false;
        const oldSrc = this.audio.src;
        remove(audioContainer, audio => audio === this.audio);
        this.audio = null;
        this.setAudio(oldSrc);
      }, 2000);
      this.isTry += 1;
    }
  }

  // 显示原文
  handleShow = () => {
    const { materialType, text } = this.state;
    if (materialType === 'listenTranslation' && (!Array.isArray(text) || !text[0].translation)) return false;
    if (materialType === 'exampleOriginal' && (!text || (Array.isArray(text.paragraphs) && text.paragraphs.length === 0))) return false;
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { playing, show, text } = this.state;
    const { showPlayer, materialType } = this.props;
    if (!showPlayer) return false;
    const playClass = [styles.default];
    playing ? playClass.push(styles.pause) : playClass.push(styles.play);
    return (
      <View
        className={styles.container}
        ref={node => { this.container = node; }}
      >
        <View className={styles.content}>
          {
            this.audio ? this.generateAudio() : this.generateEmptyAudio()
          }
          <View className={styles.textStatus}>
            {
              materialType === 'exampleOriginal' &&
              <View
                className={[styles.showArrow,
                  show && styles.arrowRotate,
                  (!text || (Array.isArray(text.paragraphs) && text.paragraphs.length === 0))
                  && styles.arrowGray,
                ]}
                onClick={this.handleShow}
              />
            }
            {
              materialType === 'exampleOriginal' &&
              <View
                className={[styles.showText,
                  (!text || (Array.isArray(text.paragraphs) && text.paragraphs.length === 0))
                   && styles.textGray]
                }
                onClick={this.handleShow}
              >
                {show ? '收起原文' : '显示原文'}
              </View>
            }
            {
              materialType === 'listenTranslation' &&
              <View className={styles.lBox}>
                <View
                  className={[styles.strip, show && styles.stripActive]}
                  onClick={this.handleShow}
                >
                  <View className={[styles.round, show && styles.roundActive]} />
                </View>
                <View
                  className={[styles.listeningBtn,
                  (!Array.isArray(text) || !text[0].translation) && styles.listeningBtnGray]}
                >
                  显示译文
                </View>
              </View>
            }
          </View>
        </View>
        {
          text && show && materialType === 'exampleOriginal' &&
          <View className={styles.textBox}>
            {this.generateListeningText()}
          </View>
        }
        {
          text && materialType === 'listenTranslation' &&
          <Scrollbar className={styles.textContent} onScrollStart={() => { SearchWords.hide(); }}>
            {this.generateListeningText()}
          </Scrollbar>
        }
        {
          !text && show && materialType === 'listenTranslation' &&
          <View className={styles.articleEmpty}>
            <Image
              className={styles.empty}
              src={require('../assets/article-gray.png')}
            />
            暂无原文哦~
          </View>
        }
      </View>
    );
  }
}
