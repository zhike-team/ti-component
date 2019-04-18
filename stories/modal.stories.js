import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button, View } from '@zhike/ti-ui';
import { css } from 'aphrodite';
import axios from 'axios';
import { onShow, onHide } from './utils';
import styles from './styles';
import { Modal } from '../src';
import { answerAnalysis } from './article_data';
import TableComponent from './tableComponent';


/* eslint-disable */
storiesOf('Modal', module)
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
  .add('type ModalCorrect',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          })
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 我要纠错类型 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="我要纠错"
            onClick={() => Modal.show('ModalCorrect', {
            title: '我要纠错',
            width: 700,
            version: '1.0.0', // 请从common/config引用version字段
            source: 'ti-base', // 纠错来源
            getUploadSignature: () => {alert('上传纠错 postCorrection');},
            postCorrection: () => {alert('上传纠错 postCorrection');},
            step: {
                id: 1,
                practice: {id: 1001614, name: "测试 富文本渲染" },
                question: {id: 1006476, name: "测试 富文本渲染 Q1"},
            },
            isReport: false,
            })
            }
        />
        <Modal
            ref={modal => { Modal.instance = modal; }}
            isReport={false}
        />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('type ModalCorrect isFollowUpOrListen',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          type: 'followUpOrListen', // 纠错类型 是通用的还是跟读与精听专用的～
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          })
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 我要纠错类型 跟读与精听训练与一般练习不同 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="我要纠错"
            onClick={() => Modal.show('ModalCorrect', {
            title: '我要纠错',
            width: 700,
            version: '1.0.0', // 请从common/config引用version字段
            source: 'ti-base', // 纠错来源
            type: 'followUpOrListen', // 纠错类型 是通用的还是跟读与精听专用的～
            getUploadSignature: () => {alert('上传纠错 postCorrection');},
            postCorrection: () => {alert('上传纠错 postCorrection');},
            step: {
                id: 1,
                practice: {id: 1001614, name: "测试 富文本渲染" },
                question: {id: 1006476, name: "测试 富文本渲染 Q1"},
            },
            isReport: false,
            })
            }
        />
        <Modal
            ref={modal => { Modal.instance = modal; }}
            isReport={false}
        />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('type ModalCorrect word',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          type: 'word', // 单词检测纠错
          getUploadSignature: async params => {
            // await axios({
            //   url: 'https://api.smartstudy.com/file/upload/signature',
            //   method: 'get',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     From: 1,
            //   },
            //   params,
            //   timeout: 30000,
            // });
          },
          postCorrection: async form => {
            await axios({
              url: 'https://tiku.smartstudy.tech/correction/create',
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              data: form,
            });
          },
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          option: {
            questionType:  2,// 'BaseMean' // 'ListenMean' 'ListenSpell' 'Speak'
            wordId: 12,
            wordName: '测试小银来一波',
            source: 'ti-word',
          }
          })
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 我要纠错类型 跟读与精听训练与一般练习不同 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="我要纠错"
            onClick={() => Modal.show('ModalCorrect', {
            title: '我要纠错',
            width: 700,
            version: '1.0.0', // 请从common/config引用version字段
            source: 'ti-base', // 纠错来源
            type: 'word', // 单词检测纠错
            getUploadSignature: () => {alert('上传纠错 postCorrection');},
            postCorrection: () => {alert('上传纠错 postCorrection');},
            step: {
                id: 1,
                practice: {id: 1001614, name: "测试 富文本渲染" },
                question: {id: 1006476, name: "测试 富文本渲染 Q1"},
            },
            isReport: false,
            })
            }
        />
        <Modal
            ref={modal => { Modal.instance = modal; }}
            isReport={false}
        />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('type ModalAlert',
  () => (
    <React.Fragment>
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
          isReport: false,
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
        }, onShow, onHide)}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ), {
    info: {
      text:`
      弹框组件 提示弹框类型 使用组件方法如下：
      ~~~js
        <React.Fragment>
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
            isReport: false,
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
            }, onShow, onHide)}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('type ModalPreview',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="图片预览"
        onClick={() => Modal.show('ModalPreview', {
          src:'http://img.zcool.cn/community/01d55b569c43fa6ac725af2356a161.jpg@1280w_1l_2o_100sh.jpg',
          hideHeader: true,
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 图片预览类型 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="图片预览"
            onClick={() => Modal.show('ModalPreview', {
            src:'http://img.zcool.cn/community/01d55b569c43fa6ac725af2356a161.jpg@1280w_1l_2o_100sh.jpg',
            hideHeader: true,
            })}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
        </React.Fragment>
      ~~~
      `,
      TableComponent,
    }
  })
  .add('type ModalAnalysis',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="答案解析"
        onClick={() => Modal.show('ModalAnalysis', {
          answerAnalysis,
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 答案解析类型 用于报告页答案解析 点击全屏预览 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="答案解析"
            onClick={() => Modal.show('ModalAnalysis', {
            answerAnalysis,
            })}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('type ModalUserGrade',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="答案解析"
        onClick={() => Modal.show('ModalUserGrade', {
          background: {},
          onClickNext: ()=> { console.log('提交答案～～')},
          params: {},
          setUserInfo: ['post', 'https://tiku.smartstudy.tech/users/user/profile'],
          loginUrl: 'https://www.dev.smartstudy.com/signin?no_meiqia=1&smartRedirect=',
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 年级选择类型 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="答案解析"
            onClick={() => Modal.show('ModalUserGrade', {
            background: {},
            onClickNext: ()=> { console.log('提交答案～～')},
            params: {},
            setUserInfo: ['post', 'https://tiku.smartstudy.tech/users/user/profile'],
            loginUrl: 'https://www.dev.smartstudy.com/signin?no_meiqia=1&smartRedirect=',
            })}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  })

  .add('type onShow',
    () => (
        <React.Fragment>
        <Button
            className={styles.button}
            text="我要纠错"
            onClick={() => Modal.show('ModalCorrect', {
            title: '我要纠错',
            width: 700,
            version: '1.0.0', // 请从common/config引用version字段
            source: 'ti-base', // 纠错来源
            getUploadSignature: () => {alert('上传纠错 postCorrection');},
            postCorrection: () => {alert('上传纠错 postCorrection');},
            step: {
                id: 1,
                practice: {id: 1001614, name: "测试 富文本渲染" },
                question: {id: 1006476, name: "测试 富文本渲染 Q1"},
            },
            isReport: false,
            }, onShow, null)
            }
        />
        <Modal
            ref={modal => { Modal.instance = modal; }}
            isReport={false}
        />
        </React.Fragment>
    ), {
      info: {
        text: `
        弹框组件 onShow方法传入 使用组件方法如下：
        ~~~js
            <React.Fragment>
            <Button
                className={styles.button}
                text="我要纠错"
                onClick={() => Modal.show('ModalCorrect', {
                title: '我要纠错',
                width: 700,
                version: '1.0.0', // 请从common/config引用version字段
                source: 'ti-base', // 纠错来源
                getUploadSignature: () => {alert('上传纠错 postCorrection');},
                postCorrection: () => {alert('上传纠错 postCorrection');},
                step: {
                    id: 1,
                    practice: {id: 1001614, name: "测试 富文本渲染" },
                    question: {id: 1006476, name: "测试 富文本渲染 Q1"},
                },
                isReport: false,
                }, onShow, null)
                }
            />
            <Modal
                ref={modal => { Modal.instance = modal; }}
                isReport={false}
            />
            </React.Fragment>
        ~~~
        `,
        TableComponent,
      }
    })
  .add('type onHide',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="我要纠错"
        onClick={() => Modal.show('ModalCorrect', {
          title: '我要纠错',
          width: 700,
          version: '1.0.0', // 请从common/config引用version字段
          source: 'ti-base', // 纠错来源
          getUploadSignature: () => {alert('上传纠错 postCorrection');},
          postCorrection: () => {alert('上传纠错 postCorrection');},
          step: {
            id: 1,
            practice: {id: 1001614, name: "测试 富文本渲染" },
            question: {id: 1006476, name: "测试 富文本渲染 Q1"},
          },
          isReport: false,
          }, null, onHide)
        }
      />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 onHide方法传入 使用组件方法如下：
      ~~~js
          <React.Fragment>
          <Button
              className={styles.button}
              text="我要纠错"
              onClick={() => Modal.show('ModalCorrect', {
              title: '我要纠错',
              width: 700,
              version: '1.0.0', // 请从common/config引用version字段
              source: 'ti-base', // 纠错来源
              getUploadSignature: () => {alert('上传纠错 postCorrection');},
              postCorrection: () => {alert('上传纠错 postCorrection');},
              step: {
                  id: 1,
                  practice: {id: 1001614, name: "测试 富文本渲染" },
                  question: {id: 1006476, name: "测试 富文本渲染 Q1"},
              },
              isReport: false,
              }, null, onHide)
              }
          />
          <Modal
              ref={modal => { Modal.instance = modal; }}
              isReport={false}
          />
          </React.Fragment>
      ~~~
      `,
      TableComponent,
    }
  })
  .add('type isUnhide',
  () => (
    <React.Fragment>
      <Button
        className={styles.button}
        text="提示弹框"
        onClick={() => Modal.show('ModalAlert', {
          title: '温馨提示',
          isUnhide: true,
          buttons: [{
            title: '开始测评',
            onClick: () => {
              alert('开始测评～～');
            },
            class: 'alertTip',
          }],
          width: 400,
          isReport: false,
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
        })}
      />
      <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
    </React.Fragment>
  ), {
    info: {
      text: `
      弹框组件 isUnhide 用户是否可以选择关闭弹窗；isUnhide为true，表示不能选择隐藏； 使用组件方法如下：
      ~~~js
        <React.Fragment>
        <Button
            className={styles.button}
            text="提示弹框"
            onClick={() => Modal.show('ModalAlert', {
            title: '温馨提示',
            isUnhide: true,
            buttons: [{
                title: '开始测评',
                onClick: () => {
                alert('开始测评～～');
                },
                class: 'alertTip',
            }],
            width: 400,
            isReport: false,
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
            })}
        />
        <Modal ref={modal => { Modal.instance = modal; }} isReport={false} />
        </React.Fragment>
      ~~~
      `,
      TableComponent
    }
  });