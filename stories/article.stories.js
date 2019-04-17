import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { css } from 'aphrodite';
import Article from '../show/article';
import SearchWords from '../src/search_words';
import { material1, material2, material3, tableBlank,
  material5, material6, material7, material8, material9,
  material10, material11, material12, material13, material14, material15,
  question1, question2 } from './article_data';
import styles from './styles';
import { create } from '@storybook/theming';


/* eslint-disable */
let initAnswer = 0;
// 故事书装饰者
const CenterDecorator = (storyFn) => (
  <div style={styles.container}>
    { storyFn() }
  </div>
);
  storiesOf('Article', module).addParameters({
    options: {
      theme: create({
        base: 'light',
        brandTitle: 'Storybook',
        brandUrl: 'https://storybook.js.org',
        // To control appearance:
        // brandImage: 'http://url.of/some.svg',
      }),
      isFullscreen: false,
      panelPosition: 'right',
      isToolshown: true,
    },
  })
  .add('段落定位',
    withInfo(`
    富文本渲染组件 具有段落定位的功能 使用组件方法如下：
    ~~~js
      <Article material={material1} question={question1}></Article>
      <SearchWords
        getSearchWord="https://tiku.smartstudy.tech/word/brief"
      ></SearchWords>
    ~~~
  `)(() =>
      <div style={styles.container}>
      富文本 文章样式：
        <br />
        <Article material={material1} question={question1}></Article>
        <SearchWords
          getSearchWord="https://tiku.smartstudy.tech/word/brief"
        ></SearchWords>
      </div>
  )
  )
  .add('高亮/加粗/斜体/下划线', 
  withInfo(`
    富文本渲染组件 具有高亮/加粗/斜体/下划线的功能，使用组件方法如下：
    ~~~js
    <Article material={material2}></Article>
    ~~~
  `)(() => (
      <div style={styles.container}>
        富文本 行内样式（一）
        <br />
        <Article material={material2}></Article>
      </div>
  )))
  .add('大/小标题 普通 上/下标', 
  withInfo(`
  富文本渲染组件 具有大/小标题 普通 上/下标的功能，使用组件方法如下：
  ~~~js
    <Article material={material5}></Article>
  ~~~
`)(() => (
      <div style={styles.container}>
      富文本 行内样式（二）
      <br />
      <Article material={material5}></Article>
      </div>
  )))
  .add('插入耳机， 插入黑块️， 插入箭头', 
  withInfo(`
  富文本渲染组件 具有大/小标题 普通 上/下标的功能，使用组件方法如下：
  ~~~js
    <Article material={material5}></Article>
  ~~~
`)(() => (
    <div style={styles.container}>
      富文本 行内样式（三）
      <br />
      <br />
      <Article
        material={material6}
        handleAnswer={e => { console.log('插入题 答案保存～', e)}}
        answer={['answer1']}
      ></Article>
    </div>
  )))
  .add('插入题 报告页演示', 
  withInfo(`
  插入题 报告页演示，使用组件方法如下：
  ~~~js
    <Article
      material={material14}
      question={question2}
      handleAnswer={e => { console.log('插入题 答案保存～', e)}}
      isReport={true}
    >
    </Article>
  ~~~
`)
  (() => (
      <div style={styles.container}>
      富文本 行内样式（三）
      <br />
      <br />
      <Article
        material={material14}
        question={question2}
        handleAnswer={e => { console.log('插入题 答案保存～', e)}}
        isReport={true}
      ></Article>
      </div>
  )))
  .add('插入短横线， 插入中横线， 插入长横线', 
  withInfo(`
    插入短横线， 插入中横线， 插入长横线的功能，使用组件方法如下：
    ~~~js
      <Article material={material7}></Article>
    ~~~
`)
  (() => (
    <div style={styles.container}>
      富文本 行内样式（四）
      <br />      
      <Article material={material7}></Article>
    </div>
  )))
  .add('数学公式',
  withInfo(`
  目前主要是 基础题库的选项有插入数学公式的需求，使用组件方法如下：
  ~~~js
    <Article material={material15} isReport={false}></Article>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Article material={material15} isReport={false}></Article>
      </div>
  )))
  .add('左对齐', 
  withInfo(`
  左对齐，使用组件方法如下：
  ~~~js
    <Article material={material9}></Article>
  ~~~
`)
  (() => 
  (
      <div style={styles.container}>
        富文本 段落样式（一）
        <br />      
        <Article material={material9}></Article>
      </div>
  )))
  .add('右对齐', 
  withInfo(`
  右对齐，使用组件方法如下：
  ~~~js
    <Article material={material10}></Article>
  ~~~
  `)
  (() => (
    <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article material={material10}></Article>
    </div>
  )))
  .add('居中', 
  withInfo(`
  居中，使用组件方法如下：
  ~~~js
    <Article material={material11}></Article>
  ~~~
  `)
  (() => (
    <div style={styles.container}>
      富文本 段落样式（三）
      <br />      
      <Article material={material11}></Article>
    </div>
  )))
  .add('缩进', 
  withInfo(`
  缩进，使用组件方法如下：
  ~~~js
    <Article material={material8}></Article>
  ~~~
  `)
  (() => (
    <div style={styles.container}>
      富文本 段落样式（一）
      <br />      
      <Article material={material8}></Article>
    </div>
  )))
  .add('添加图片',
  withInfo(`
  缩进，使用组件方法如下：
  ~~~js
  <Article
    material={material12}
    paragraphClassName={styles.paragraph1}
  >
  </Article>
  ~~~
`)
  (() => (
    <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article
        material={material12}
        paragraphClassName={styles.paragraph1}
      >
      </Article>
    </div>
  )))
  .add('添加音频', 
  withInfo(`
  添加音频，使用组件方法如下：
  ~~~js
    <Article
      material={material13}
      paragraphClassName={styles.paragraph2}
    >
    </Article>
  ~~~
`)
  (() => (
      <div style={styles.container}>
      富文本 段落样式（二）
      <br />      
      <Article
        material={material13}
        paragraphClassName={styles.paragraph2}
      ></Article>
      </div>
  )))
  .add('雅思报告页',
  withInfo(`
  雅思报告页，使用组件方法如下：
  ~~~js
  <table className={css(styles.table)}>
  {
    Array.isArray(tableBlank) &&
    <tbody className={css(styles.tbody)}>
      {
        Array.isArray(tableBlank) && tableBlank.map((line, index) => (
          <tr
            key={index}
            className={css(styles.tr)}
          >
            {
              Array.isArray(line) && line.map((row, index1) => {
                let count = 0;
                if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                  count = row.content.inlineMarkup.filter(item =>
                    item.type === 'BlankTable').length;
                }
                initAnswer += count;
                return (
                  <th className={css(styles.tableCell)} key={index1}>
                    <Article
                      material={row.content}
                      isIelts={true}
                      answerRsult={[
                        {answer: "answer1|answer2|answer3", userAnswer: "answer and", isCorrect: false},
                        {answer: "answer1|answer2|answer3", userAnswer: "answer2", isCorrect: true},
                        {answer: "answer1|answer2|answer3", userAnswer: "answer1", isCorrect: true},
                        {answer: "answer1|answer2|answer3", userAnswer: "smart", isCorrect: false},
                        {answer: "answer1|answer2|answer3", userAnswer: "study", isCorrect: false},
                      ]}
                      answer={['答案一', '答案二', '答案三', '答案四']}
                      // qNum={['10', '11', '12', '13', '14']}
                      externalInitAnswer={initAnswer - count}
                      materialIds={[26142, 26143, 26144, 26145, 26146]}
                      isReport={true}
                      paragraphClassName={styles.paragraphClass}
                    />
                  </th>
                );
              })
            }
          </tr>
        ))
      }
    </tbody>
  }
</table>
  ~~~
`)
  (() => (
      <div style={styles.container}>
      <table className={css(styles.table)}>
          {
            Array.isArray(tableBlank) &&
            <tbody className={css(styles.tbody)}>
              {
                Array.isArray(tableBlank) && tableBlank.map((line, index) => (
                  <tr
                    key={index}
                    className={css(styles.tr)}
                  >
                    {
                      Array.isArray(line) && line.map((row, index1) => {
                        let count = 0;
                        if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                          count = row.content.inlineMarkup.filter(item =>
                            item.type === 'BlankTable').length;
                        }
                        initAnswer += count;
                        return (
                          <th className={css(styles.tableCell)} key={index1}>
                            <Article
                              material={row.content}
                              isIelts={true}
                              answerRsult={[
                                {answer: "answer1|answer2|answer3", userAnswer: "answer and", isCorrect: false},
                                {answer: "answer1|answer2|answer3", userAnswer: "answer2", isCorrect: true},
                                {answer: "answer1|answer2|answer3", userAnswer: "answer1", isCorrect: true},
                                {answer: "answer1|answer2|answer3", userAnswer: "smart", isCorrect: false},
                                {answer: "answer1|answer2|answer3", userAnswer: "study", isCorrect: false},
                              ]}
                              answer={['答案一', '答案二', '答案三', '答案四']}
                              // qNum={['10', '11', '12', '13', '14']}
                              externalInitAnswer={initAnswer - count}
                              materialIds={[26142, 26143, 26144, 26145, 26146]}
                              isReport={true}
                              paragraphClassName={styles.paragraphClass}
                            />
                          </th>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
      <br />
      </div>
  )))
  .add('雅思 填空题',
  withInfo(`
    雅思 填空题，使用组件方法如下：
    ~~~js
      <Article material={material3}></Article>
    ~~~
  `)
  (() => (
    
      <div style={styles.container}>
      <Article material={material3}></Article>
      <br />
      </div>
    
  )))
  .add('雅思 表格填空题',
  withInfo(`
  雅思 填空题，使用组件方法如下：
  ~~~js
  <table className={css(styles.table)}>
  {
    Array.isArray(tableBlank) &&
    <tbody className={css(styles.tbody)}>
      {
        Array.isArray(tableBlank) && tableBlank.map((line, index) => (
          <tr
            key={index}
            className={css(styles.tr)}
          >
            {
              Array.isArray(line) && line.map((row, index1) => {
                let count = 0;
                if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                  count = row.content.inlineMarkup.filter(item =>
                    item.type === 'BlankTable').length;
                }
                initAnswer += count;
                return (
                  <th className={css(styles.tableCell)} key={index1}>
                    <Article
                      material={row.content}
                      isIelts={true}
                      // handleAnswer={() => { alert('～处理答案的回调函数～')}}
                      // handleQuestionSelect={() => { alert('～处理子题选中的回调函数～')}}
                      answer={['答案一', '答案二', '答案三', '答案四']}
                      qNum={['10', '11', '12', '13', '14']}
                      externalInitAnswer={initAnswer - count}
                      materialIds={[26142, 26143, 26144, 26145, 26146]}
                      isReport={false}
                      paragraphClassName={styles.paragraphClass}
                    />
                  </th>
                );
              })
            }
          </tr>
        ))
      }
    </tbody>
  }
</table>
  ~~~
`)
  (() => (
      <div style={styles.container}>
      <table className={css(styles.table)}>
          {
            Array.isArray(tableBlank) &&
            <tbody className={css(styles.tbody)}>
              {
                Array.isArray(tableBlank) && tableBlank.map((line, index) => (
                  <tr
                    key={index}
                    className={css(styles.tr)}
                  >
                    {
                      Array.isArray(line) && line.map((row, index1) => {
                        let count = 0;
                        if (row.content.inlineMarkup && Array.isArray(row.content.inlineMarkup)) {
                          count = row.content.inlineMarkup.filter(item =>
                            item.type === 'BlankTable').length;
                        }
                        initAnswer += count;
                        return (
                          <th className={css(styles.tableCell)} key={index1}>
                            <Article
                              material={row.content}
                              isIelts={true}
                              // handleAnswer={() => { alert('～处理答案的回调函数～')}}
                              // handleQuestionSelect={() => { alert('～处理子题选中的回调函数～')}}
                              answer={['答案一', '答案二', '答案三', '答案四']}
                              qNum={['10', '11', '12', '13', '14']}
                              externalInitAnswer={initAnswer - count}
                              materialIds={[26142, 26143, 26144, 26145, 26146]}
                              isReport={false}
                              paragraphClassName={styles.paragraphClass}
                            />
                          </th>
                        );
                      })
                    }
                  </tr>
                ))
              }
            </tbody>
          }
        </table>
      <br />
      </div>
  )))
  .add('question',
  withInfo(`
  雅思 填空题，使用组件方法如下：
  ~~~js
    <Article material={material1} question={question1}></Article>
  ~~~
`)
  (() => (
      <div style={styles.container}>
        <Article material={material1} question={question1}></Article>
      </div>
  )))