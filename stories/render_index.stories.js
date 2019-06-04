import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RenderIndex from '../src/render_index';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('RenderIndex', module)
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
  .add('练习报告页 索引',
		(() =>
			(<RenderIndex 
         params={match}
  
      />)
		), {
			info: {
				text: `索引组件案例  使用组件方法如下：
				<RenderIndex></RenderIndex>
			  `,
			  TableComponent,
			}
		})