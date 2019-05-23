import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Drag from '../src/drag';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('Drag', module)
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
  .add('Drag 拖拽组件',
		(() =>
			(<Drag>
        <div style={{color: 'hotpink'}}>
          这里是body区域， 传入的子组件
          测试一下<br />
          测试一下<br />
          测试一下<br />
          测试一下<br />
          测试一下<br />
        </div>
      </Drag>)
		), {
			info: {
				text: `使用组件方法如下：
				<Drag><div style={{color: 'yellow'}}>hahhaha</div></Drag>
			  `,
			  TableComponent,
			}
		})