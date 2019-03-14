import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { View, Image, Button } from '@zhike/ti-ui';
import { history } from 'routers';
import cookie from 'cookie';
import { css } from 'aphrodite';
import { get } from 'lodash';
import axios from 'axios';
import Modal from '../modal';
import AudioPlayer from '../audio_player';
import Recorder from '../recorder';
import Utils from '../utils';
import { tipData, suggestTime, sectionIds } from './constants';
import styles from './styles';

const { formatDuration, redirectToLoginPage } = Utils;
const search = global.location.search; // eslint-disable-line
const isFull = decodeURIComponent(search.match(new RegExp('[?#&]isFull=([^?#&]+)', 'i')) ? RegExp.$1 : '');
// 初始状态
const initialOptions = {
  exerciseId: undefined,
  stepId: undefined,
  title: '',
  showButtons: [], // 'correct', 'volume', 'back', 'next'
  unavailableButtons: [], // 'correct', 'volume', 'back', 'next', 'testNext', 'testStop'
  isShowTime: true,
  onClickNext: undefined,
  onClickContinue: undefined,
  onClickBack: undefined,
  onClickGoToQuestion: undefined,
  onClickReturn: undefined,
};
// 页面头部
export default class Header extends Component {
  static instance;

  // 设置头部
  static config(options = {}) {
    if (this.instance) {
      this.instance.setState({
        options: Object.assign(
          {},
          initialOptions,
          options.inherit ? this.instance.state.options : {},
          options,
        ),
      });

      const { step, params, name } = this.instance.props;
      if (params.mode === 'package') {
        global.document.title = `${name || ''} - 智课`;
      } else {
        global.document.title = `${step.practice.name}${options.title ? ' ' : ''}${options.title || ''} - 智课`;
      }
    } else {
      setTimeout(() => {
        this.config(options);
      }, 100);
    }
  }

  // 上一步
  static back() {
    this.instance && this.instance.back();
  }

  // 下一步
  static next() {
    this.instance && this.instance.next();
  }

  // 我要纠错
  static handleCorrect() {
    this.instance && this.instance.handleCorrect();
  }

  // 上传失败
  static uploadFailed() {
    this.instance && this.instance.handleTimeExpried();
  }

  // 设置倒计时
  static setTimer(options) {
    this.instance && this.instance.setTimer(options);
  }

  // 清空倒计时
  static cleanTimer() {
    if (this.instance) {
      this.instance.cleanTimer();
    }
  }

  // 开启计时
  static startTimer() {
    this.instance && this.instance.setState({
      isPauseTimer: false,
    });
  }

  // 暂停计时
  static pauseTimer() {
    this.instance && this.instance.setState({
      isPauseTimer: true,
    });
  }

  // 开启计时（弹窗）
  static startTimerForModal() {
    this.instance && this.instance.setState({
      isPauseTimerForModal: false,
    });
  }

  // 暂停计时（弹窗）
  static pauseTimerForModal() {
    this.instance && this.instance.setState({
      isPauseTimerForModal: true,
    });
  }

  // 获取计时
  static getTime() {
    return this.instance.props.timer ? (this.instance.props.timer.time || 0) : 0;
  }
  static defaultProps = {
    name: '',
    setTimer: () => {},
    getUploadSignature: () => {},
    postCorrectionImage: () => {},
    postCorrection: () => {},
    postDuration: () => {},
    loginUrl: 'https://www.smartstudy.com/signin?no_meiqia=1&smartRedirect=',
    getUserInfo: ['get', '//api.smartstudy.com/tiku/users/get-user-base-info'],
    setUserInfo: ['post', '//api.smartstudy.com/tiku/users/user/profile'],
    createPromise: () => {},
  };
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    name: PropTypes.string,
    step: PropTypes.object.isRequired,
    stepList: PropTypes.array.isRequired,
    timer: PropTypes.object.isRequired,
    setTimer: PropTypes.func,
    getUploadSignature: PropTypes.func,
    postCorrectionImage: PropTypes.func,
    postCorrection: PropTypes.func,
    postDuration: PropTypes.func,
    loginUrl: PropTypes.string,
    getUserInfo: PropTypes.array,
    setUserInfo: PropTypes.array,
    createPromise: () => {},
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = Object.assign({
      options: initialOptions,
      isPauseTimer: false,
      isPauseTimerForModal: false,
      isShowVolume: true,
      volume: 1,
      isShowTip: this.props.step.questionIndex === 1,
      isShowShortcutTip: false,
      grade: '',
      background: {},
    });
    this.saveDurationTime = 0;
    this.setIntervalTime = null;
    this.alertUpdateInfo = false;
  }

  // 模块加载
  componentDidMount() {
    const { step, params } = this.props;
    const { mode } = params;
    if (mode === 'package') {
      if (['ToeflListenPlayer', 'Tip'].indexOf(step.type) === -1) {
        setTimeout(() => {
          this.resetTimer(this.props);
          if (!this.setIntervalTime) this.setIntervalTime = setInterval(() => this.countDown(), 1000);
        }, 100);
      }
    } else {
      setTimeout(() => {
        this.resetTimer(this.props);
      }, 100);
      this.setIntervalTime = setInterval(() => this.countDown(), 1000);
    }
    if (mode === 'test' || mode === 'package') {
      global.document.addEventListener('keydown', this.onArrowRightDown);
    }
  }

  // 模块接受参数
  componentWillReceiveProps(nextProps) {
    const { step, params } = nextProps;
    const { mode } = params;
    // 判断如果sectionId 不同就重新打开tip
    if (this.props.step.sectionId && (nextProps.step.sectionId !== this.props.step.sectionId)) {
      this.setState({ isShowTip: true });
    }
    if (mode === 'package') {
      setTimeout(() => {
        this.resetTimer(this.props);
        if (['ToeflListenPlayer', 'Tip'].indexOf(step.type) === -1) {
          if (!this.setIntervalTime) this.setIntervalTime = setInterval(() => this.countDown(), 1000);
        }
      }, 100);
    }
    if (isFull === 'true') {
      this.resetTimer(nextProps);
    }
  }

  // 模块销毁
  componentWillUnmount() {
    const { mode } = this.props.params;
    if (this.setIntervalTime) {
      clearInterval(this.setIntervalTime);
    }
    if (mode === 'test' || mode === 'package') {
      global.document.removeEventListener('keydown', this.onArrowRightDown);
    }
  }

  // 设置计时器
  setTimer(value) {
    const { timer, setTimer } = this.props;
    const { mode, exerciseId } = this.props.params;
    setTimer({
      mode,
      id: exerciseId,
      value: Object.assign({}, timer, value),
    });
  }

  // 清空计时器
  cleanTimer() {
    const { setTimer } = this.props;
    const { mode, exerciseId } = this.props.params;

    setTimer({
      mode,
      id: exerciseId,
      value: {},
    });
  }

  // 重设计时器
  resetTimer(nextProps) {
    const { timer, step } = nextProps;
    const { sectionId, examId, isOtherPage } = step;
    // 监测是否开始阅读倒计时
    if (
      timer.subject !== 'Base' &&
      step.mode === 'Base'
    ) {
      this.setTimer({
        subject: 'Base',
        time: 0,
        isEnd: false,
      });
    }
    // 监测是否开始测评倒计时
    if (timer.subject !== 'Test' && step.mode === 'Test') {
      this.setTimer({
        subject: 'Test',
        time: 30 * 60 * 1000,
        isCountDown: true,
        isEnd: false,
      });
      this.alertTimeExpried = false;
    }
    if (step.mode === 'FullTest' && isOtherPage) {
      this.pauseTimer();
      return false;
    }
    // 监测是否开始，重置或者清除 完整版测评倒计时
    if (
      step.mode === 'FullTest' && sectionId !== timer.sectionId
    ) {
      const suggestTime1 = suggestTime[examId] && suggestTime[examId][sectionId - 1];
      this.startTimer();
      this.setTimer({
        subject: 'FullTest',
        sectionId: step.sectionId,
        time: suggestTime1 * 60 * 1000,
        isCountDown: true,
        isEnd: false,
      });
      this.alertTimeExpried = false;
    }
    // 如果是阶段测评 开始计时
    if (step.mode === 'Package' && timer.subject !== 'Package') {
      this.setTimer({
        subject: 'Package',
        time: timer.time || 30 * 60 * 1000,
        isCountDown: true,
        isEnd: false,
      });
    }
  }

  // 暂停计时
  pauseTimer() {
    this.setState({
      isPauseTimer: true,
    });
  }

  // 开启计时
  startTimer() {
    this.setState({
      isPauseTimer: false,
    });
  }

  // 保存时间
  saveDuration() {
    if (this.saveDurationTime === 5) {
      const { postDuration, timer, createPromise } = this.props;
      const { exerciseId } = this.props.params;
      const time = timer && timer.time || 0;
      createPromise(postDuration, { exerciseId, duration: parseInt(time / 1000, 10) });
      this.saveDurationTime = 0;
    }
    this.saveDurationTime += 1;
  }

  // 上一步
  back() {
    const { step } = this.props;
    const { mode, exerciseId, practiceId } = this.props.params;
    const search = global.location.search; // eslint-disable-line
    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index - 1}${search}`);
  }

  // 下一步
  next() {
    const { timer, step, params } = this.props;
    const { mode, exerciseId, practiceId } = params;
    const search = global.location.search; // eslint-disable-line
    // 完整版的测评 有一个进度提示的弹框
    if (isFull === 'true' && !step.isOtherPage) {
      const { sectionId, examId } = step;
      const suggestTime1 = suggestTime[examId] && suggestTime[examId][sectionId - 1];
      const timeOverHalf = (timer.time / (suggestTime1 * 60 * 1000)) <= 0.5;
      const questionNoHalf = step.questionIndex / step.questionCount <= 0.5;
      // 如果时间过半 但题目未过半，出现弹窗提示
      this.alertTimeNote = timeOverHalf && questionNoHalf;
      if (this.alertTimeNote) {
        Modal.show('ModalAlert', {
          title: '提示',
          width: 400,
          isUnhide: true,
          buttons: [
            { title: 'OK',
              class: 'alertTip',
              onClick: () => {
                this.alertTimeNote = false;
                history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index + 1}${search}`);
              },
            },
          ],
          component: (
            <View className={styles.modalAlert}>
              <View className={styles.modalAlertText}>
                时间已过半，要加快进度哦~
              </View>
            </View>
          ),
        }, this.onShow, this.onHide);
        return;
      }
    }
    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index + 1}${search}`);
  }

  // 处理倒计时结束
  handleTimeExpried() {
    const { stepList, step } = this.props;
    const { mode, exerciseId, practiceId } = this.props.params;
    const search = global.location.search; // eslint-disable-line
    if (isFull === 'true') {
      // 当前科目时间耗尽，将跳转至下一科目
      history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index + 1 + step.questionCount - step.questionIndex}${search}`);
      return;
    }
    const stepId = stepList[stepList.length - 1] && stepList[stepList.length - 1].index;
    history.push(`/${mode}/${practiceId}/${exerciseId}/${stepId}${search}`);
  }

  // 倒计时
  countDown() {
    const { timer, step, params } = this.props;
    const { isPauseTimer, isPauseTimerForModal } = this.state;
    // 如果是非做题页或者休息页 不保存时间
    if (!step.isOtherPage && step.questionType !== 'Resting' && params.mode !== 'package') {
      this.saveDuration();
    }
    if (timer.isEnd && timer.isCountDown && !this.alertTimeExpried &&
      (timer.subject === 'Test' ||
      (timer.subject === 'FullTest' && timer.sectionId !== 7)
      )
    ) {
      Modal.show('ModalAlert', {
        title: '提示',
        width: 400,
        isUnhide: true,
        buttons: [
          { title: isFull !== 'true' ? '提交' : 'OK', onClick: () => this.handleTimeExpried() },
        ],
        component: isFull !== 'true' ? (
          <View className={styles.modalAlert}>
            <Image
              className={styles.modalAlertImage}
              src={require('../assets/default.png')}
            />
            <View className={styles.modalAlertText}>
              时间已耗尽，点击“提交”生成测评报告
            </View>
          </View>
        ) : (
          <View className={styles.modalAlert}>
            <View className={styles.modalAlertText}>
              时间已耗尽，点击
              {
                step.sectionId === 6 ? '“提交”生成测评报告' : '“Next”继续'
              }
            </View>
          </View>
        ),
      }, this.onShow, this.onHide);
      this.alertTimeExpried = true;
    }

    if (timer.isEnd || isPauseTimer || isPauseTimerForModal) {
      return;
    }

    let cntTime;
    if (timer.isCountDown) {
      cntTime = Math.max(0, timer.time - 1000);
    } else {
      cntTime = timer.time + 1000;
    }
    const cntIsEnd = cntTime === 0;
    this.setTimer({
      time: cntTime,
      isEnd: cntIsEnd,
    });
  }

  // 隐藏显示时间
  toggleTimer() {
    const { timer } = this.props;

    this.setTimer({
      isHide: !timer.isHide,
    });
  }

  // 隐藏显示音量
  toggleVolume() {
    const { isShowVolume } = this.state;
    this.setState({
      isShowVolume: !isShowVolume,
    });
  }

  // 调整音量
  adjustVolume(status, event) {
    if (status === 'start') {
      global.window.onmouseup = () => this.adjustVolume('end');
      global.window.onmousemove = event => this.adjustVolume('adjust', event);
    }

    if (status === 'end') {
      global.window.onmouseup = undefined;
      global.window.onmousemove = undefined;
    }

    if (status === 'adjust') {
      const processBar =
        /* eslint-disable */
        ReactDOM.findDOMNode(this.volumeProcessBar).getBoundingClientRect();
        /* eslint-enable */
      const offset = event.x - (processBar.x || processBar.left);
      const volume = Math.max(Math.min(offset / processBar.width, 1), 0);

      this.setState({
        volume,
      });

      AudioPlayer.setVolume(volume);
    }
  }

  // 生成test 进度条
  // 生成 圆形
  generateSubject(id) {
    const { step } = this.props;
    const { questionIndex, questionCount, sectionId } = step;
    let strokeDasharray;
    let isFinish;
    if (id === sectionId) {
      const turn = ((questionIndex - 1) / questionCount).toFixed(2) * 158;
      strokeDasharray = `${turn} 158`;
    } else if (id < sectionId) {
      isFinish = true;
      strokeDasharray = '158 158';
    } else {
      strokeDasharray = '0 158';
    }
    return (
      <View className={styles.bground}>
        { isFinish && <Image className={styles.finishIcon} src={require('../assets/finish.png')} /> }
        <svg
          style={{ transform: 'rotate(-90deg)', background: '#5f7dbe', borderRadius: '50%' }}
          width="16px"
          height="16px"
          viewBox="0 0 100 100"
        >
          <circle r="25" cx="50" cy="50" fill="#5f7dbe" stroke="#fff" strokeWidth="50" strokeDasharray={strokeDasharray} />
        </svg>
      </View>
    );
  }
  generateProgress() {
    const { step } = this.props;
    const { examId } = step;
    return (
      <View className={styles.subjectBox}>
        <View className={styles.subjects}>
          <View className={styles.line} />
          <View className={styles.subject}>
            {this.generateSubject(1)}
            {examId === 1 ? 'Reading' : 'Listening'}
          </View>
          <View className={styles.subject}>
            {this.generateSubject(2)}
            {examId === 2 ? 'Reading' : 'Listening'}
          </View>
          <View className={styles.subject}>
            {this.generateSubject(3)}
            Speaking
          </View>
          <View className={styles.subject}>
            {this.generateSubject(4)}
            Writing
          </View>
        </View>
      </View>
    );
  }

  // 3秒弹窗
  tipCard() {
    const { isShowTip } = this.state;
    const { step } = this.props;
    const { questionIndex, sectionId, examId } = step;

    if (questionIndex !== 1 || !sectionId || !isShowTip) return null;
    setTimeout(() => this.setState({ isShowTip: false }), 4000);
    return (
      <View className={styles.tipBox}>
        <View className={styles.tipClose}>
          <View onClick={() => this.setState({ isShowTip: false })} className={styles.close} />
        </View>
        <View className={styles.tipContent}>
          <View className={styles.tipText}>
            {tipData[examId] && tipData[examId][sectionId]}
          </View>
          <Image
            width="64px"
            height="75px"
            src={sectionId === 1 ? require('../assets/default.png') : require('../assets/success.png')}
          />
        </View>
      </View>
    );
  }

  // 按下rightArrow键（绑定this到实例，并确保事件可卸载）
  onArrowRightDown = event => {
    const { step, params } = this.props;
    const { altKey, ctrlKey, metaKey, shiftKey, keyCode } = event;
    const { unavailableButtons } = this.state.options;
    let isAvailable = unavailableButtons.indexOf('testNext') === -1;
    if (params.mode === 'package') isAvailable = unavailableButtons.indexOf('next') === -1;
    isAvailable && !altKey && !ctrlKey && !metaKey && !shiftKey && keyCode === 39 &&
    !this.alertTimeExpried && !this.alertTimeNote && !this.alertUpdateInfo &&
    this.updateUserInfo(step.sectionId, step.questionIndex === step.questionCount);
  }

  // 点击下一题
  async nextStep(onClickNext, unavailableButtons = []) {
    const { step } = this.props;
    if (onClickNext && !(isFull === 'true' && step.questionIndex === step.questionCount)) {
      await onClickNext();
    } else {
      this.next();
    }

    this.toggleShortcut(unavailableButtons, false);
  }

  // Next按钮鼠标hover提示快捷键
  toggleShortcut(unavailableButtons, isShowShortcutTip) {
    const { params } = this.props;
    let isAvailable = unavailableButtons.indexOf('testNext') === -1;
    if (params.mode === 'package') isAvailable = unavailableButtons.indexOf('next') === -1;
    this.setState({
      isShowShortcutTip: isAvailable && isShowShortcutTip,
    });
  }

  // 点击提交按钮时，判断信息是否需要完善
  async updateUserInfo(sectionId, isCompeleted) {
    const { setUserInfo, getUserInfo, loginUrl, params } = this.props;
    const { exerciseId } = params;
    const { onClickNext } = this.state.options;
    this.alertUpdateInfo = sectionId === 4 && isCompeleted && isFull !== 'true';
    if (this.alertUpdateInfo) {
      // getUserInfo 用户‘年级’信息不存在, 弹框提示
      const search = global.location.search; // eslint-disable-line
      const tokenUrl = decodeURIComponent(search.match(new RegExp('[?#&]token=([^?#&]+)', 'i')) ? RegExp.$1 : '');
      let token;
      if (tokenUrl) {
        token = tokenUrl;
      } else {
        try {
          const user = JSON.parse(cookie.parse(global.document.cookie).ss_user);
          token = user.token; // eslint-disable-line
        } catch (e) {
          redirectToLoginPage(loginUrl);
          return;
        }
      }
      const message = await axios({
        url: getUserInfo[1],
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          From: 1,
        },
        params: {
          token,
          fields: 'background',
          exerciseId,
        },
      });
      const gradeNum = get(message, 'data.data.background.grade');
      const background = get(message, 'data.data.background');
      if (!gradeNum) {
        Modal.show('ModalUserGrade', {
          title: '信息完善',
          background: background || {},
          params: this.props.params,
          onClickNext,
          setUserInfo,
          loginUrl,
        }, this.onShow, this.onHide);
      } else {
        this.nextStep(onClickNext);
      }
    } else {
      this.nextStep(onClickNext);
    }
  }

  // 我要纠错
  handleCorrect = () => {
    const { getUploadSignature, postCorrectionImage, postCorrection, step } = this.props;
    const { pathname } = global.location;
    const isFollowUpOrListen = pathname.includes('repeat') || pathname.includes('listen');

    Modal.show('ModalCorrect', {
      title: '我要纠错',
      width: 700,
      getUploadSignature,
      postCorrectionImage,
      postCorrection,
      step,
      option: {
        version: '1.0.0',
        source: 'ti-base',
      },
      type: isFollowUpOrListen ? 'followUpOrListen' : 'normal',
    }, this.onShow, this.onHide);
  }

  onShow = () => {
    AudioPlayer.pause();
    this.setState({
      isPauseTimerForModal: true,
    });
  }

  onHide = () => {
    this.setState({
      isPauseTimerForModal: false,
    });
    AudioPlayer.resume();
  }

  // 渲染
  render() {
    const { timer, step, params, name } = this.props;
    const search = global.location.search; // eslint-disable-line
    const noPause = decodeURIComponent(search.match(new RegExp('[?#&]noPause=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    const redirect = decodeURIComponent(search.match(new RegExp('[?#&]redirect=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    const {
      title, showButtons, isShowTime, unavailableButtons, onClickBack, onClickNext,
    } = this.state.options;
    const { mode, exerciseId, practiceId } = params;
    const { questionIndex, questionCount } = step;
    const { volume, isShowVolume, isShowShortcutTip } = this.state;
    console.log('unavailableButtons:', unavailableButtons);
    return (
      <View className={[styles.container, mode === 'test' && styles.containerTest]}>
        {mode === 'test' && isFull !== 'true' && this.tipCard()}
        <View className={styles.title}>
          <Image
            className={styles.titleLogo}
            src={require('../assets/logo.png')}
          />
          <View className={styles.titleSplit} />
          <View className={styles.titleText}>
            {mode === 'package' && name}
            {/* 需要传入题目， IELTS 还是TOEFL 入学测评 */}
            {isFull !== 'true' && mode !== 'package' && `${step.practice.name}${title ? ' ' : ''}${title || ''}`}
            {isFull === 'true' && mode !== 'package' && `${step.examId === 1 ? 'TOEFL' : 'IELTS'}智能测评系统${!step.isOtherPage && step.questionType !== 'Resting' ? ` - ${sectionIds[step.examId][step.sectionId - 1]}` : ''}`}
          </View>
        </View>

        {
          (mode !== 'test' && mode !== 'package') || (mode === 'package' && step.questionIndex > 1) &&
            <View className={styles.question}>
              {
                questionIndex && questionCount &&
                <View>Question {questionIndex} of {questionCount}</View>
              }
            </View>
        }
        {
          isFull === 'true' &&
          <View className={styles.question1}>
            {
              questionIndex && questionCount &&
              <View>Question {questionIndex} of {questionCount}</View>
            }
          </View>
        }

        {
          mode === 'test' && isFull !== 'true' && this.generateProgress()
        }
        <View>
          <View className={styles.normalButtons}>
            {
              isShowTime && mode === 'package' &&
              <View className={styles.button}>
                {
                  !timer.isHide &&
                  <View className={styles.buttonTimePackage}>
                    {formatDuration(timer.time || 0, true)}
                  </View>
                }
              </View>
            }
            {
              showButtons.indexOf('correct') !== -1 &&
              mode !== 'package' &&
              <Button
                className={styles.button}
                leftIcon={require('../assets/correct.png')}
                isAvailable={unavailableButtons.indexOf('correct') === -1}
                text="我要纠错"
                onClick={() => this.handleCorrect()}
              />
            }

            {
              showButtons.indexOf('volume') !== -1 &&
              mode !== 'package' &&
              <View className={styles.volumeWrapper}>
                <Button
                  className={styles.button}
                  leftIcon={require('../assets/volume.png')}
                  isAvailable={unavailableButtons.indexOf('volume') === -1}
                  text="Volume"
                  onClick={() => this.toggleVolume()}
                />
                {
                  isShowVolume &&
                  <View
                    className={styles.volume}
                  >
                    <View
                      ref={
                        volumeProcessBar => {
                          this.volumeProcessBar = volumeProcessBar;
                        }
                      }
                      className={styles.volumeProcessBarWrapper}
                    >
                      <View
                        className={styles.volumeProcessBar}
                        style={{ width: volume * 66 }}
                      />
                      <View
                        className={styles.volumeProcessCircle}
                        style={{ left: volume * 66 - 5 }}
                        onMouseDown={() => this.adjustVolume('start')}
                      />
                    </View>
                    <View className={styles.volumeTriangle} />
                  </View>
                }
                {
                  isShowVolume &&
                  <View
                    className={styles.volumeBodyWrapper}
                    onClick={() => this.toggleVolume()}
                  />
                }
              </View>
            }

            {
              showButtons.indexOf('back') !== -1 &&
              mode !== 'package' &&
              <Button
                className={styles.button}
                leftIcon={require('../assets/back.png')}
                isAvailable={unavailableButtons.indexOf('back') === -1}
                text="上一题"
                onClick={async () => {
                  if (onClickBack) {
                    await onClickBack();
                  } else {
                    this.back();
                  }
                  // const canGoBack = onClickBack ? onClickBack() : true;
                  // if (canGoBack) {
                  //   this.back();
                  // }
                }}
              />
            }
            {
              showButtons.indexOf('viewText') !== -1 &&
              <Button
                className={styles.button}
                isAvailable={unavailableButtons.indexOf('viewText') === -1}
                text="View Text"
                onClick={() => {
                  history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index}/ViewText${search}`);
                }}
              />
            }
            {
              showButtons.indexOf('viewQuestion') !== -1 &&
              <Button
                className={styles.button}
                isAvailable={unavailableButtons.indexOf('viewQuestion') === -1}
                text="View Question"
                onClick={() => {
                  history.push(`/${mode}/${practiceId}/${exerciseId}/${step.index}${search}`);
                }}
              />
            }

            {
              showButtons.indexOf('next') !== -1 && mode !== 'package' &&
              <Button
                className={styles.button}
                rightIcon={require('../assets/next.png')}
                isAvailable={unavailableButtons.indexOf('next') === -1}
                text={step.questionIndex === step.questionCount ? '提交' : '下一题'}
                onClick={() => this.nextStep(onClickNext)}
              />
            }
            {
              (showButtons.indexOf('next') !== -1 ||
              showButtons.indexOf('submit') !== -1)
              && mode === 'package' &&
              <View
                className={styles.shortcutTipWrapper}
                onMouseEnter={() => this.toggleShortcut(unavailableButtons, true)}
                onMouseLeave={() => this.toggleShortcut(unavailableButtons, false)}
              >
                <Button
                  className={styles.button}
                  rightIcon={require('../assets/next.png')}
                  isAvailable={unavailableButtons.indexOf('next') === -1}
                  text={step.questionIndex && step.questionIndex === step.questionCount ? 'Submit' : 'Next'}
                  onClick={() => this.nextStep(onClickNext)}
                />
                {
                  isShowShortcutTip &&
                  <View className={styles.shortcutTip}>快捷键：&#8594;</View>
                }
              </View>
            }
            {
              isShowTime && mode === 'test' &&
              <View>
                {
                  !timer.isHide &&
                  <View className={styles.buttonTimeTest}>
                    <Image className={styles.timeIcon} src={require('../assets/time.png')} />
                    {formatDuration(timer.time || 0, true)}
                  </View>
                }
              </View>
            }

            {
              showButtons.indexOf('testStop') !== -1 && !noPause &&
              <Button
                className={[styles.button, styles.buttonTest]}
                leftIcon={require('../assets/quit.png')}
                isAvailable={unavailableButtons.indexOf('testStop') === -1}
                text="退出测评"
                onClick={() => {
                  // 弹框提示，确认退出页面
                  Modal.show('ModalAlert', {
                    title: '提示',
                    width: 400,
                    isReport: true,
                    buttons: [
                      { title: 'ok',
                        onClick: () => {
                          // 如果传入redirect 测跳转redirect 反之则跳转到测评起始页
                          if (redirect) {
                            global.top.location.href = redirect;
                          } else {
                            history.push(`/entrance/${step.examId}${search}`);
                          }
                        },
                        class: 'alertTip',
                      },
                    ],
                    component: (
                      /* eslint-disable */
                      <View className={styles.modalAlert}>
                        <div className={css(styles.modalAlertText1)}>
                          系统会<span className={css(styles.tipAlertText)}>保留</span>你的做题进度,
                          下次可以<span className={css(styles.tipAlertText)}>继续测评</span>哦～
                        </div>
                      </View>
                      /* eslint-enable */
                    ),
                  }, this.onShow, this.onHide);
                }}
              />
            }

            {
              showButtons.indexOf('testNext') !== -1 &&
              <View
                className={styles.shortcutTipWrapper}
                onMouseEnter={() => this.toggleShortcut(unavailableButtons, true)}
                onMouseLeave={() => this.toggleShortcut(unavailableButtons, false)}
              >
                <Button
                  className={[styles.button, styles.buttonTest]}
                  rightIcon={redirect ? undefined : require('../assets/test_next.png')}
                  isAvailable={unavailableButtons.indexOf('testNext') === -1}
                  text={(isFull === 'true' ? step.sectionId === 6 : step.sectionId === 4) &&
                  !step.isOtherPage && step.questionIndex === step.questionCount ? '提交' :
                  (step.questionType !== 'Resting' ? 'Next' : 'Continue')}
                  onClick={() => {
                    if (isFull) { this.nextStep(onClickNext); return false; } else {
                      this.updateUserInfo(step.sectionId, step.questionIndex === step.questionCount);
                    }
                  }
                  }
                />
                {
                  isShowShortcutTip &&
                  <View className={styles.shortcutTip}>快捷键：&#8594;</View>
                }
              </View>
            }
          </View>
          {
            isShowTime && mode !== 'test' && mode !== 'package' &&
            <View className={styles.timeButtons}>
              {
                !timer.isHide &&
                <View className={styles.buttonTime}>
                  {formatDuration(timer.time || 0, true)}
                </View>
              }
              {
                mode !== 'package' &&
                <Button
                  className={styles.button}
                  theme="darken"
                  text={!timer.isHide ? 'Hide Time' : 'Show Time'}
                  onClick={() => this.toggleTimer()}
                />
              }
            </View>
          }
        </View>

        <Modal ref={modal => { Modal.instance = modal; }} />
        <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
        <Recorder ref={recorder => { Recorder.instance = recorder; }} />
      </View>
    );
  }
}
