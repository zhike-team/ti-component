import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { View, Button } from '@zhike/ti-ui';
import cookie from 'cookie';
import { cloneDeep } from 'lodash';
import axios from 'axios';
import Modal from '../index';
import styles from './styles';

const history = require('history').createBrowserHistory();

export default class ModalComponent extends Component {
  // 参数
  static propTypes = {
    modalId: PropTypes.string.isRequired,
    background: PropTypes.object.isRequired,
    onClickNext: PropTypes.function,
    params: PropTypes.object.isRequired,
    setUserInfo: PropTypes.array.isRequired,
    loginUrl: PropTypes.string,
  };

  static defaultProps = {
    onClickNext: () => {},
    loginUrl: 'https://www.smartstudy.com/signin?no_meiqia=1&smartRedirect=',
  };
  constructor(props) {
    super(props);
    this.state = {
      grade: '0',
    };
  }

  // 下一步
  next() {
    const { mode, exerciseId, practiceId, stepId } = this.props.params;
    const search = global.location.search; // eslint-disable-line
    history.push(`/${mode}/${practiceId}/${exerciseId}/${stepId + 1}${search}`);
  }
  // 更新用户年级信息
  updateUserInfo= async () => {
    const { modalId, onClickNext, background, loginUrl, setUserInfo } = this.props;
    const { grade } = this.state;
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
        global.location.href = `${loginUrl}${encodeURIComponent(global.location.href)}`;
        return;
      }
    }
    let background1;
    if (background) {
      background1 = cloneDeep(background);
    } else {
      background1 = {};
    }
    background1.phase = grade * 1;
    background1.grade = grade * 1;
    // 将完善的'年级'信息进行提交
    try {
      await axios({
        url: setUserInfo[1],
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          From: 1,
        },
        data: {
          token,
          background: background1,
        },
      });
    } catch (e) {
      console.log('e:', e);
      setTimeout(() => {
        history.push(`/error/upload/${encodeURIComponent(global.location.href)}`);
      }, 100);
    }
    if (onClickNext) {
      await onClickNext();
    }
    Modal.hide(modalId);
  }
  componentDidMount() {

  }

  // 渲染
  render() {
    const { grade } = this.state;
    return (
      <View className={styles.modalTip}>
        <View className={styles.modalAlertTip}>
          补全年级信息后可生成专属留学规划哦~
        </View>
        <View className={styles.inputContainer}>
          <select
            onChange={e => {
              this.setState({ grade: e.target.value });
            }
          }
            className={css(styles.input)}
          >
            <option value="0">就读年级</option>
            <option value="2">初中</option>
            <option value="31">高一</option>
            <option value="32">高二</option>
            <option value="33">高三</option>
            <option value="41">大一</option>
            <option value="42">大二</option>
            <option value="43">大三</option>
            <option value="44">大四</option>
            <option value="47">研究生</option>
            <option value="7">在职</option>
            <option value="9">其他</option>
          </select>
        </View>
        <View
          style={{ color: 'white', fontSize: '12px' }}
        >
          请完善您的信息之后，再点击提交～
        </View>
        <Button
          isAvailable={grade !== '0'}
          className={styles.button}
          text="提交"
          onClick={async () => {
            await this.updateUserInfo();
          }
          }
        />
      </View>
    );
  }
}
