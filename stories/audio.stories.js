
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Audio from '../show/audio';
import TableComponent from './tableComponent';
import { material1 } from './article_data';

/* eslint-disable */
storiesOf('Audio', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      // Make a default for all stories in this book,
      inline: false, // where the components are inlined
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
      },
    },
  )
  .add('src',
  () => (
    <div style={{ width: '500px', height: '100px'}} >
        <Audio
        src={'http://media8.smartstudy.com/atheneBackend/1544499183839yRX4EW.mp3'}
        cdnUrl={'https://media8.smartstudy.com/'}
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 可以传入需要播放的音频路径 使用组件方法如下：
      ~~~js
        <div>
          <Audio
            src={'/atheneBackend/1539519944613QFkn3X.mp3'}
            cdnUrl={'https://media8.smartstudy.com/'}
          ></Audio>
        </div>
      ~~~
    `,
      TableComponent,
    }
  })
	.add('src 错误的情况',
	() => (
      <div style={{ width: '500px', height: '100px'}} >
        <Audio
          src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3.mp3'}
        ></Audio>
      </div>
  ), {
    info: {
      text: `
      音频播放组件 如果音频错误，则在一直加载。使用组件方法如下：
      ~~~js
        <div>
          <Audio
            src={'https://media8.smartstudy.com//atheneBackend/1539519944613QFkn3.mp3'}
            showPlayer={false}
          ></Audio>
        </div>
      ~~~
    `,
    TableComponent,
    }
  })
	.add('cdnUrl (必传)',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
            src={'/atheneBackend/1539519944613QFkn3X.mp3'}
            cdnUrl={'https://media8.smartstudy.com/'}
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539519944613QFkn3X.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
        ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 听力译文 listenTranslation 时间码(不带译文)',
	() => (
    <div style={{ width: '510px', height: '100px' }} >
        <Audio
            src={'/atheneBackend/1539519944613QFkn3X.mp3'}
            cdnUrl={'https://media8.smartstudy.com/'}
            text={"{{time}}1.86/10.55{{end}}↵{{raw}}In my presentation, I'm going to talk about coffee, and its importance both in economic and social terms.{{end}}↵{{time}}10.55/24.15{{end}}↵{{raw}}We think it was first drunk in the Arab world, but there's hardly any documentary evidence of it before the 1500s, although of course that doesn't mean that people didn't know about it before then.{{end}}↵{{time}}24.15/34.14{{end}}↵{{raw}}However, there is evidence that coffee was originally gathered from bushes growing wild in Ethiopia, in the northeast of Africa.{{end}}↵{{time}}34.14/44.42{{end}}↵{{raw}}In the early sixteenth century, it was being bought by traders, and gradually its use as a drink spread throughout the Middle East.{{end}}↵{{time}}44.42/58.35{{end}}↵{{raw}}It's also known that in 1522, in the Turkish city of Constantinople, which was the centre of the Ottoman Empire, the court physician approved its use as a medicine.{{end}}↵{{time}}58.35/72.25{{end}}↵{{raw}}By the mid-1500s, coffee bushes were being cultivated in the Yemen and for the next hundred years this region produced most of the coffee drunk in Africa and the Arab world.{{end}}↵{{time}}72.25/78.1{{end}}↵{{raw}}What's particularly interesting about coffee is its effect on social life.{{end}}↵{{time}}78.1/84.58{{end}}↵{{raw}}It was rarely drunk at home, but instead people went to coffee houses to drink it.{{end}}↵{{time}}84.58/91.74{{end}}↵{{raw}}These people, usually men, would meet to drink coffee and chat about issues of the day.{{end}}↵{{time}}91.74/108.97{{end}}↵{{raw}}But at the time, this chance to share ideas and opinions was seen as something that was potentially dangerous, and in 1623 the ruler of Constantinople demanded the destruction of all the coffee houses in the city.{{end}}↵{{time}}108.97/115.89{{end}}↵{{raw}}although after his death many new ones opened, and coffee consumption continued.{{end}}↵{{time}}115.89/129.18{{end}}↵{{raw}}In the seventeenth century, coffee drinking spread to Europe, and here too coffee shops became places where ordinary people, nearly always men, could meet to exchange ideas.{{end}}↵{{time}}129.18/136.68{{end}}↵{{raw}}Because of this, some people said that these places performed a similar function to universities.{{end}}↵{{time}}136.68/159.4{{end}}↵{{raw}}The opportunity they provided for people to meet together outside their own homes and to discuss the topics of the day had an enormous impact on social life, and many social movements and political developments had their origins in coffee house discussions.{{end}}↵{{time}}159.4/171.36{{end}}↵{{raw}}In the late 1600s, the Yemeni monopoly on coffee production broke down and coffee production started to spread around the world, helped by European colonisation.{{end}}↵{{time}}171.36/181.47{{end}}↵{{raw}}Europeans set up coffee plantations in Indonesia and the Caribbean and production of coffee in the colonies skyrocketed.{{end}}↵{{time}}181.47/196.31{{end}}↵{{raw}}Different types of coffee were produced in different areas, and it's interesting that the names given to these different types, like Mocha or Java coffee, were often taken from the ports they were shipped to Europe from.{{end}}↵{{time}}196.31/203.02{{end}}↵{{raw}}But if you look at the labour system in the different colonies, there were some significant differences.{{end}}↵{{time}}203.02/213.84{{end}}↵{{raw}}In Brazil and the various Caribbean colonies, coffee was grown in huge plantations and the workers there were almost all slaves.{{end}}↵{{time}}213.84/229.31{{end}}↵{{raw}}But this wasn't the same in all colonies; for example in Java, which had been colonised by the Dutch, the peasants grew coffee and passed a proportion of this on to the Dutch, so it was used as a means of taxation.{{end}}↵{{time}}229.31/240.05{{end}}↵{{raw}}But whatever system was used, under the European powers of the eighteenth century, coffee production was very closely linked to colonisation.{{end}}↵{{time}}240.05/253.28{{end}}↵{{raw}}Coffee was grown in ever-increasing quantities to satisfy the growing demand from Europe, and it became nearly as important as sugar production, which was grown under very similar conditions.{{end}}↵{{time}}253.28/267.57{{end}}↵{{raw}}However, coffee prices were not yet low enough for people to drink it regularly at home, so most coffee consumption still took place in public coffee houses and it still remained something of a luxury item.{{end}}↵{{time}}267.57/281.45{{end}}↵{{raw}}In Britain, however, a new drink was introduced from China, and started to become popular, gradually taking over from coffee, although at first it was so expensive that only the upper classes could afford it.{{end}}↵{{time}}281.45/288.14{{end}}↵{{raw}}This was tea, and by the late 1700s it was being widely drunk.{{end}}↵{{time}}288.14/302.66{{end}}↵{{raw}}However, when the USA gained independence from Britain in 1776, they identified this drink with Britain, and coffee remained the preferred drink in the USA, as it still is today.{{end}}↵{{time}}302.66/309.55{{end}}↵{{raw}}So, by the early nineteenth century, coffee was already being widely produced and consumed.{{end}}↵{{time}}309.55/315.85{{end}}↵{{raw}}But during this century, production boomed and coffee prices started to fall.{{end}}↵{{time}}315.85/322.95{{end}}↵{{raw}}This was partly because new types of transportation had been developed which were cheaper and more efficient.{{end}}↵{{time}}322.95/329.98{{end}}↵{{raw}}So now, working people could afford to buy coffee - it wasn't just a drink for the middle classes.{{end}}↵{{time}}329.98/335.38{{end}}↵{{raw}}And this was at a time when large parts of Europe were starting to work in industries.{{end}}↵{{time}}335.38/343.02{{end}}↵{{raw}}And sometimes this meant their work didn't stop when it got dark: they might have to continue throughout the night.{{end}}↵{{time}}343.02/351.49{{end}}↵{{raw}}So, the use of coffee as a stimulant became important - it wasn't just a drink people drank in the morning, for breakfast.{{end}}↵{{time}}351.49/354.45{{end}}↵{{raw}}There were also changes in cultivation ...{{end}}"}
            materialType="listenTranslation"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539519944613QFkn3X.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
                      text={"{{time}}1.86/10.55{{end}}↵{{raw}}In my presentation, I'm going to talk about coffee, and its importance both in economic and social terms.{{end}}↵{{time}}10.55/24.15{{end}}↵{{raw}}We think it was first drunk in the Arab world, but there's hardly any documentary evidence of it before the 1500s, although of course that doesn't mean that people didn't know about it before then.{{end}}↵{{time}}24.15/34.14{{end}}↵{{raw}}However, there is evidence that coffee was originally gathered from bushes growing wild in Ethiopia, in the northeast of Africa.{{end}}↵{{time}}34.14/44.42{{end}}↵{{raw}}In the early sixteenth century, it was being bought by traders, and gradually its use as a drink spread throughout the Middle East.{{end}}↵{{time}}44.42/58.35{{end}}↵{{raw}}It's also known that in 1522, in the Turkish city of Constantinople, which was the centre of the Ottoman Empire, the court physician approved its use as a medicine.{{end}}↵{{time}}58.35/72.25{{end}}↵{{raw}}By the mid-1500s, coffee bushes were being cultivated in the Yemen and for the next hundred years this region produced most of the coffee drunk in Africa and the Arab world.{{end}}↵{{time}}72.25/78.1{{end}}↵{{raw}}What's particularly interesting about coffee is its effect on social life.{{end}}↵{{time}}78.1/84.58{{end}}↵{{raw}}It was rarely drunk at home, but instead people went to coffee houses to drink it.{{end}}↵{{time}}84.58/91.74{{end}}↵{{raw}}These people, usually men, would meet to drink coffee and chat about issues of the day.{{end}}↵{{time}}91.74/108.97{{end}}↵{{raw}}But at the time, this chance to share ideas and opinions was seen as something that was potentially dangerous, and in 1623 the ruler of Constantinople demanded the destruction of all the coffee houses in the city.{{end}}↵{{time}}108.97/115.89{{end}}↵{{raw}}although after his death many new ones opened, and coffee consumption continued.{{end}}↵{{time}}115.89/129.18{{end}}↵{{raw}}In the seventeenth century, coffee drinking spread to Europe, and here too coffee shops became places where ordinary people, nearly always men, could meet to exchange ideas.{{end}}↵{{time}}129.18/136.68{{end}}↵{{raw}}Because of this, some people said that these places performed a similar function to universities.{{end}}↵{{time}}136.68/159.4{{end}}↵{{raw}}The opportunity they provided for people to meet together outside their own homes and to discuss the topics of the day had an enormous impact on social life, and many social movements and political developments had their origins in coffee house discussions.{{end}}↵{{time}}159.4/171.36{{end}}↵{{raw}}In the late 1600s, the Yemeni monopoly on coffee production broke down and coffee production started to spread around the world, helped by European colonisation.{{end}}↵{{time}}171.36/181.47{{end}}↵{{raw}}Europeans set up coffee plantations in Indonesia and the Caribbean and production of coffee in the colonies skyrocketed.{{end}}↵{{time}}181.47/196.31{{end}}↵{{raw}}Different types of coffee were produced in different areas, and it's interesting that the names given to these different types, like Mocha or Java coffee, were often taken from the ports they were shipped to Europe from.{{end}}↵{{time}}196.31/203.02{{end}}↵{{raw}}But if you look at the labour system in the different colonies, there were some significant differences.{{end}}↵{{time}}203.02/213.84{{end}}↵{{raw}}In Brazil and the various Caribbean colonies, coffee was grown in huge plantations and the workers there were almost all slaves.{{end}}↵{{time}}213.84/229.31{{end}}↵{{raw}}But this wasn't the same in all colonies; for example in Java, which had been colonised by the Dutch, the peasants grew coffee and passed a proportion of this on to the Dutch, so it was used as a means of taxation.{{end}}↵{{time}}229.31/240.05{{end}}↵{{raw}}But whatever system was used, under the European powers of the eighteenth century, coffee production was very closely linked to colonisation.{{end}}↵{{time}}240.05/253.28{{end}}↵{{raw}}Coffee was grown in ever-increasing quantities to satisfy the growing demand from Europe, and it became nearly as important as sugar production, which was grown under very similar conditions.{{end}}↵{{time}}253.28/267.57{{end}}↵{{raw}}However, coffee prices were not yet low enough for people to drink it regularly at home, so most coffee consumption still took place in public coffee houses and it still remained something of a luxury item.{{end}}↵{{time}}267.57/281.45{{end}}↵{{raw}}In Britain, however, a new drink was introduced from China, and started to become popular, gradually taking over from coffee, although at first it was so expensive that only the upper classes could afford it.{{end}}↵{{time}}281.45/288.14{{end}}↵{{raw}}This was tea, and by the late 1700s it was being widely drunk.{{end}}↵{{time}}288.14/302.66{{end}}↵{{raw}}However, when the USA gained independence from Britain in 1776, they identified this drink with Britain, and coffee remained the preferred drink in the USA, as it still is today.{{end}}↵{{time}}302.66/309.55{{end}}↵{{raw}}So, by the early nineteenth century, coffee was already being widely produced and consumed.{{end}}↵{{time}}309.55/315.85{{end}}↵{{raw}}But during this century, production boomed and coffee prices started to fall.{{end}}↵{{time}}315.85/322.95{{end}}↵{{raw}}This was partly because new types of transportation had been developed which were cheaper and more efficient.{{end}}↵{{time}}322.95/329.98{{end}}↵{{raw}}So now, working people could afford to buy coffee - it wasn't just a drink for the middle classes.{{end}}↵{{time}}329.98/335.38{{end}}↵{{raw}}And this was at a time when large parts of Europe were starting to work in industries.{{end}}↵{{time}}335.38/343.02{{end}}↵{{raw}}And sometimes this meant their work didn't stop when it got dark: they might have to continue throughout the night.{{end}}↵{{time}}343.02/351.49{{end}}↵{{raw}}So, the use of coffee as a stimulant became important - it wasn't just a drink people drank in the morning, for breakfast.{{end}}↵{{time}}351.49/354.45{{end}}↵{{raw}}There were also changes in cultivation ...{{end}}"}
          materialType="listenTranslation"
        ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 听力译文 listenTranslation 时间码(译带文)',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text='{{time}}1.06/6.67{{end}}{{raw}}Listen to a conversation between a student and a librarian.{{end}}{{translation}}接下来听一段学生和图书管理员之间的对话。{{end}}{{time}}6.67/11.29{{end}}{{raw}}Student:Hi, I need to get into special collections, in particular the British Literature.{{end}}{{translation}}学生：嗨，我需要阅读一些特色馆藏，尤其是英国文学（方面的）。{{end}}{{time}}11.29/13.95{{end}}{{raw}}I was working with some of the William Blake books.{{end}}{{translation}}我正着手于威廉•布莱克的一些书籍。{{end}}'
          materialType="listenTranslation"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text='{{time}}1.06/6.67{{end}}{{raw}}Listen to a conversation between a student and a librarian.{{end}}{{translation}}接下来听一段学生和图书管理员之间的对话。{{end}}{{time}}6.67/11.29{{end}}{{raw}}Student:Hi, I need to get into special collections, in particular the British Literature.{{end}}{{translation}}学生：嗨，我需要阅读一些特色馆藏，尤其是英国文学（方面的）。{{end}}{{time}}11.29/13.95{{end}}{{raw}}I was working with some of the William Blake books.{{end}}{{translation}}我正着手于威廉•布莱克的一些书籍。{{end}}'
          materialType="listenTranslation"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 时间码 支持富文本结构',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="listenTranslation"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="listenTranslation"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 范例音频 exampleOriginal 时间码结构',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="exampleOriginal"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text='{{time}}1.06/6.67{{end}}{{raw}}Listen to a conversation between a student and a librarian.{{end}}{{translation}}接下来听一段学生和图书管理员之间的对话。{{end}}{{time}}6.67/11.29{{end}}{{raw}}Student:Hi, I need to get into special collections, in particular the British Literature.{{end}}{{translation}}学生：嗨，我需要阅读一些特色馆藏，尤其是英国文学（方面的）。{{end}}{{time}}11.29/13.95{{end}}{{raw}}I was working with some of the William Blake books.{{end}}{{translation}}我正着手于威廉•布莱克的一些书籍。{{end}}'
          materialType="exampleOriginal"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 范例音频 exampleOriginal 富文本结构',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="exampleOriginal"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="exampleOriginal"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 范例音频 无音频时 支持查看原文',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="exampleOriginal"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="exampleOriginal"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('text 范例音频 支持无原文可听音频',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={{paragraphs: []}}
          materialType="exampleOriginal"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      音频播放组件 cdnUrl为cdn路径的前缀，dev和线上不同 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          materialType="exampleOriginal"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('test',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={{
            inlineMarkup: [
              {pid: "9c7ff09a-5980-5088-83d5-a8b55af45573", type: "Underline", index: 8, length: 3},
              {pid: "9c7ff09a-5980-5088-83d5-a8b55af45573", type: "Underline", index: 0, length: 4}
            ],
            paragraphs: [
              {id: "9c7ff09a-5980-5088-83d5-a8b55af45573", text: "正在测试↵换行测试↵如果不行，还是需要换行", type: "Text"}
            ],
          }}
          materialType="listenTranslation"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      test 测试富文本存在的问题 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="listenTranslation"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
  .add('test',
	() => (
    <div style={{ width: '500px', height: '100px' }} >
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={{
            inlineMarkup: [
              {pid: "9c7ff09a-5980-5088-83d5-a8b55af45573", type: "Underline", index: 8, length: 3},
              {pid: "9c7ff09a-5980-5088-83d5-a8b55af45573", type: "Underline", index: 0, length: 4}
            ],
            paragraphs: [
              {id: "9c7ff09a-5980-5088-83d5-a8b55af45573", text: "正在测试↵换行测试↵如果不行，还是需要换行", type: "Text"}
            ],
          }}
          materialType="listenTranslation"
        ></Audio>
    </div>
  ), {
    info: {
      text: `
      test 测试富文本存在的问题 使用组件方法如下：
      ~~~js
        <Audio
          src={'/atheneBackend/1539170674668uukska.mp3'}
          cdnUrl={'https://media8.smartstudy.com/'}
          text={material1}
          materialType="listenTranslation"
          ></Audio>
      ~~~
    `,
    TableComponent,
    }
  })
