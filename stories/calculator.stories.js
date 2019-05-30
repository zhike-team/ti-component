import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Calculator from '../src/calculator';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('Calculator GRE考试计算器', module)
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
      },
    },
  )
  .add('transferResult',() =>
			(<Calculator
        destroy={() => {}}
        transferResult={ data => {
          alert(`我拿到了计算结果为:${data}`)
          }
        }
        />), {
			info: {
				text: `计算结果获取函数  使用组件方法如下：
        <Calculator
        transferResult={ data => alert(
          '我拿到了计算结果～', data
        )}
        ></Calculator>
			  `,
			  TableComponent,
			}
    })
    .add('transferVisible',() =>
    (<Calculator
      transferVisible={true}
      destroy={() => {}}
      transferResult={ data => {
        alert(`我拿到了计算结果为:${data}`)
        }
      }
      />), {
    info: {
      text: `是否可以点击 获取结果（默认是不可点击）  使用组件方法如下：
      <Calculator
      transferVisible={true}
      destroy={() => {}}
      transferResult={ data => alert(
        '我拿到了计算结果～', data
      )}
      ></Calculator>
      `,
      TableComponent,
    }
  })
  .add('destroy',
  () =>
    (<Calculator
      destroy={() => console.log('组件销毁回调函数')}
    />)
  , {
    info: {
      text: `组件销毁回调函数  使用组件方法如下：
      <Calculator
      destory={ () => alert(
        '组件销毁回调函数',
      )}
      ></Calculator>
      `,
      TableComponent,
    }
  })
  .add('默认显示的数值',
  () =>
    (<Calculator
        revdata='0'
    />)
  , {
    info: {
      text: `计算器默认显示的数值  使用组件方法如下：
      <Calculator
        revdata='0'
      ></Calculator>
      `,
      TableComponent,
    }
  })

