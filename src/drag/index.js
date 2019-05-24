import React, { Component } from 'react';
import { View, Image } from '@zhike/ti-ui';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * 拖拽效果
 * 目前主要应用于 GRE计算器中
 */

export default class Calculator extends Component {
  // 参数
  static defaultProps = {
    /* 销毁组件函数 */
    destroy: () => {},
    showTitle: true,
    title: '',
  };
  static propTypes = {
    /* 销毁组件函数 */
    destroy: PropTypes.func,
    showTitle: PropTypes.bool,
    title: PropTypes.string,
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      pageX: '50%',
      pageY: '80px',
      diffX: '',
      diffY: '',
      moving: false,
      isclosed: false,
    };
    this.getPosition = this.getPosition.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
  getPosition(e) {
    // 标题DOM元素titleDom
    const titleDom = e.target;
    // titleDom的坐标(视窗)
    const X = titleDom.getBoundingClientRect().left;
    // 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
    const Y = global.document.getElementById('group').offsetTop;

    // 鼠标点击的坐标(页面)
    const mouseX = e.pageX;
    const mouseY = e.screenY;
    // 鼠标点击位置与modal的位移
    const diffX = mouseX - X;
    const diffY = mouseY - Y;
    return { X, Y, mouseX, mouseY, diffX, diffY };
  }

  /**
 * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
  * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
 */

  onMouseDown(e) {
    const position = this.getPosition(e);
    global.window.onmousemove = this.onMouseMove;
    global.window.onmouseup = this.onMouseUp;
    this.setState({ moving: true, diffX: position.diffX, diffY: position.diffY });
  }

  // 松开鼠标，设置modal状态为不可移动
  onMouseUp() {
    const { moving } = this.state;
    moving && this.setState({ moving: false });
  }

  // 鼠标移动重新设置modal的位置
  onMouseMove(e) {
    const { moving, diffX, diffY } = this.state;
    if (moving) {
      // 获取鼠标位置数据
      const position = this.getPosition(e);
      // 计算modal应该随鼠标移动到的坐标
      const x = position.mouseX - diffX;
      const y = position.mouseY - diffY;
      // 窗口大小，结构限制，需要做调整，减去侧边栏宽度
      const { clientWidth, clientHeight } = global.document.documentElement;
      const modal = global.document.getElementById('group');
      if (modal) {
        // 计算modal坐标的最大值
        const maxHeight = clientHeight - modal.offsetHeight;
        const maxWidth = clientWidth - modal.offsetWidth;
        // 判断得出modal的最终位置，不得超出浏览器可见窗口
        const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0;
        const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0;
        this.setState({ pageX: left, pageY: top });
      }
    }
  }
  /**
   * 关闭窗口，清除组件
   */
  handleCancel() {
    // 调用父组件的方法清除组件
    this.props.destroy();
    this.setState({ isclosed: true });
  }
  /* eslint-disable */
  // 渲染
  render() {
    const { pageX, pageY, isclosed } = this.state;
    const { showTitle, title } = this.props;
    return (
      <View
        id="group"
        className={[styles.group, isclosed && styles.group1]}
        style={{
          left: pageX,
          top: pageY,
        }}
      >
        {
          showTitle &&
          <View
            className={styles.group_head}
            onMouseDown={this.onMouseDown}
          >
            <Image
              className={styles.group_head_close}
              src={require('./assets/close.png')}
              onClick={() => this.handleCancel()}
            />
            {title}
          </View>
        }
        <View
          className={styles.group_body}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}
