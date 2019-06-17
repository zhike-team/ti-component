import axios from 'axios';
import FormData from 'form-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concat, filter } from 'lodash';
import { View, Image, Textarea, Button } from '@zhike/ti-ui';
import Modal from '../index';
import styles from './styles';

export default class ModalCorrect extends Component {
  // 参数
  static propTypes = {
    modalId: PropTypes.string.isRequired,
    getUploadSignature: PropTypes.any.isRequired,
    postCorrection: PropTypes.func.isRequired,
    step: PropTypes.object,
    isReport: PropTypes.bool,
    option: PropTypes.object,
    type: PropTypes.string,
  };

  static defaultProps = {
    option: {},
    isReport: false,
    type: 'normal', // 我要纠错的配置项内容 默认是'normal' 'followUpOrListen' 'word'
    step: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      choices: [],
      detail: '',
      files: [],
      filesUrl: [],
    };
  }

  // 选择选项
  toggleChoice(choice) {
    const { choices } = this.state;

    if (choices.indexOf(choice) !== -1) {
      this.setState({
        choices: filter(choices, item => item !== choice),
      });
    } else {
      this.setState({
        choices: concat(choices, choice),
      });
    }
  }

  // 文字修改
  onDetailChange(e) {
    this.setState({
      detail: e.target.value.substr(0, 300),
    });
  }

  // 选择文件
  selectFile() {
    this.fileInput.click();
  }

  // 文件变化
  onFileChange(event) {
    const reader = new global.FileReader(); // eslint-disable-line
    const image = new global.Image(); // eslint-disable-line
    const file = event.target.files[0];
    const overSized = file.size > 1024 * 1024; // 判断是否大于1M

    reader.readAsDataURL(file);
    reader.onload = e => {
      image.src = e.target.result;
    };
    image.onload = () => {
      // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
      const canvas = document.createElement('canvas'); // eslint-disable-line
      const context = canvas.getContext('2d');
      let compressedUrl = image.src;

      if (overSized) {
        // 图片原始尺寸
        const originWidth = image.width;
        const originHeight = image.height;

        // 最大尺寸限制，这个尺寸下的canvas生成的图片大约是1M
        const maxWidth = 1024 * 3;
        const maxHeight = 1024 * 3;

        // 目标尺寸
        let targetWidth = originWidth;
        let targetHeight = originHeight;

        // 图片尺寸超过限制时等比缩放，横竖都要限制，考虑到细长的图片
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }

        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(image, 0, 0, targetWidth, targetHeight);

        // 压缩后的图片转base64
        // canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png'
        // qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92
        compressedUrl = canvas.toDataURL('image/jpeg', 0.92);
      }

      this.setState(prev => ({
        files: prev.files.concat([file]),
        filesUrl: prev.filesUrl.concat([compressedUrl]),
      }));

      this.fileInput.value = '';
    };
  }

  // 删除文件
  removeFile(index) {
    this.setState(prev => ({
      files: filter(prev.files, (f, i) => i !== index),
      filesUrl: filter(prev.filesUrl, (f, i) => i !== index),
    }));
  }

  // 提交表单
  async submit() {
    const {
      modalId, getUploadSignature, option,
      postCorrection, step, isReport, type,
    } = this.props;
    const { choices, detail, files } = this.state;

    this.setState({
      submitting: true,
    });

    // 上传图片
    const images = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        try {
          let signature;
          if (type !== 'word') {
            const createPromise = (action, payload) => (
              new Promise((resolve, reject) => {
                action({ payload, resolve, reject });
              })
            );

            signature = await createPromise(getUploadSignature, {
              business: 'tiku/correction',
              fileName: file.name,
            });
          } else {
            signature = await getUploadSignature(file.name);
          }
          const formData = new FormData();
          formData.append('key', signature.data.key);
          formData.append('policy', signature.data.policy);
          formData.append('OSSAccessKeyId', signature.data.accessKeyId);
          formData.append('signature', signature.data.signature);
          formData.append('callback', signature.data.callback);
          formData.append('file', file);

          const imgData = await axios({
            url: signature.data.uploadAddress,
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
            timeout: 20000,
          });

          images.push({
            src: imgData.data.code === 0 ? imgData.data.data.url : `${signature.data.uploadAddress}/${signature.data.key}`,
          });
        } catch (e) {
          console.log('error:', e);
          const { onShow, onHide } = Modal.instance.state;
          Modal.show('ModalAlert', {
            title: '错误',
            buttons: [{ title: 'OK' }],
            width: 400,
            isReport,
            component: (
              <View className={styles.modalAlert}>
                上传图片出现错误，请刷新重试
              </View>
            ),
          }, onShow, onHide);
          // console.log(e);
          this.setState({
            submitting: false,
          });
          return;
        }
      }
    }

    // 上传纠错信息
    let form;
    if (type === 'word') { // 如果是单词检测的题目
      form = {
        type: choices,
        questionType: option.questionType,
        wordId: option.wordId,
        wordName: option.wordName,
        detail,
        images,
        source: option.source,
      };
    } else {
      form = {
        type: choices,
        referenceName: step.question ? step.question.name : step.practice.name,
        referenceType: step.question ? 'Question' : 'Practice',
        referenceId: step.question ? step.question.id : step.practice.id,
        images,
        detail,
        status: 'Pending',
        remark: '',
        version: option.version ? option.version : '1.0.0',
        source: option.source ? option.source : 'ti-base',
        ...option,
      };
    }

    await postCorrection(form);
    Modal.hide(modalId);

    // 弹出成功提示
    setTimeout(() => {
      const { onShow, onHide } = Modal.instance.state;
      Modal.show('ModalAlert', {
        title: '提交成功',
        buttons: [{ title: 'OK' }],
        width: 400,
        isReport,
        component: (
          /* eslint-disable */
          <View className={styles.modalAlert}>
            <Image
              className={styles.modalAlertImage}
              src={require('../../assets/ok.png')}
            />
            <View className={styles.modalAlertText}>
              你的反馈我们会认真查看并完善，感谢你对智课一如既往的支持呦~
            </View>
          </View>
          /* eslint-enable */
        ),
      }, onShow, onHide);
    }, 50);
  }

  // 渲染
  render() {
    const { type } = this.props;
    const { choices, detail, submitting, filesUrl } = this.state;
    let allChoices;
    if (type === 'normal') {
      allChoices = [
        {
          type: 'ReadingOriginal',
          text: '听力原文有误',
        },
        {
          type: 'Stem',
          text: '题干有误',
        },
        {
          type: 'Choices',
          text: '选项有误',
        },
        {
          type: 'Answer',
          text: '答案有误',
        },
        {
          type: 'Analysis',
          text: '文字解析有误',
        },
        {
          type: 'ListeningOriginal',
          text: '听力音频有误',
        },
        {
          type: 'ReadingTranslation',
          text: '阅读译文有误',
        },
        {
          type: 'PageStyle',
          text: '页面显示有误',
        },
        {
          type: 'Other',
          text: '其它',
        },
      ];
    } else if (type === 'followUpOrListen') {
      allChoices = [
        {
          type: 'AudioScript',
          text: '听力原文错误',
        },
        {
          type: 'ChineseTranslation',
          text: '中文翻译错误',
        },
        {
          type: 'TimeCodeRagged',
          text: '音频和听力原文时间未对齐',
        },
        {
          type: 'ListeningOriginalNoise',
          text: '听力音频有杂音',
        },
        {
          type: 'AudioNonfluency',
          text: '单句精听换句时音频卡顿',
        },
        {
          type: 'Other',
          text: '其它',
        },
      ];
    } else {
      allChoices = [
        {
          type: 'NoVocality',
          text: '单词无声音',
        },
        {
          type: 'WordPronounce',
          text: '单词发音不清晰',
        },
        {
          type: 'ChoiceTranslation',
          text: '选项释义错误',
        },
        {
          type: 'ChoiceReiteration',
          text: '选项重复',
        },
        {
          type: 'Other',
          text: '其它',
        },
      ];
    }

    return (
      <View className={styles.container}>
        <View className={styles.section}>
          <Image
            className={styles.sectionTitleType}
            src={require('../../assets/title_type.png')}
          />
          <View className={styles.choices}>
            {allChoices.map(choice => (
              <View
                key={choice.type}
                className={[
                  type === 'followUpOrListen' ? styles.choice2 : styles.choice1,
                  styles.choiceBox,
                  choices.indexOf(choice.type) !== -1
                    ? styles.choiceBoxChecked
                    : undefined,
                ]}
                onClick={() => this.toggleChoice(choice.type)}
              >
                <View className={styles.choiceText}>{choice.text}</View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.section}>
          <Image
            className={styles.sectionTitleDetail}
            src={require('../../assets/title_detail.png')}
          />

          <Textarea
            className={styles.detail}
            placeholder="将问题描述清楚，处理更及时哦~"
            value={detail}
            onChange={e => this.onDetailChange(e)}
          />
          <View className={styles.detailTip}>{detail.length}/300</View>

          <View className={styles.images}>
            {
              filesUrl.map((fileUrl, index) => (
                <View key={index} className={styles.image}>
                  <Image
                    className={styles.imageShow}
                    src={fileUrl}
                  />

                  <Image
                    className={styles.imageRemove}
                    src={require('../../assets/remove.png')}
                    onClick={() => this.removeFile(index)}
                  />
                </View>
              ))
            }

            {
              filesUrl.length < 3 &&
              <View
                className={styles.imageUpload}
                onClick={() => this.selectFile()}
              >
                <Image
                  className={styles.imageUploadPlus}
                  src={require('../../assets/plus.png')}
                />
              </View>
            }
          </View>
        </View>

        <Button
          className={styles.btn}
          textClassName={styles.button}
          text="提交"
          onClick={() => this.submit()}
          isAvailable={!submitting && choices.length > 0}
        />

        <input
          ref={fileInput => { this.fileInput = fileInput; }}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          style={{ display: 'none' }}
          onChange={e => this.onFileChange(e)}
        />
      </View>
    );
  }
}
