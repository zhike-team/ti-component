import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RecorderDemo from './demo/recorder';
import { Modal } from '../src';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('Recorder', module)
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
  .add('内置了init, start, pause, resume, stop, destroy的API',
  () => (
    <React.Fragment>
      <RecorderDemo />
      <Modal
        ref={modal => { Modal.instance = modal; }}
        isReport={false}
      />
    </React.Fragment>
  ), {
    info: {
      text: `
      录音功能组件，调用了h5录音API 使用组件方法如下：
      ~~~js
        <React.Fragment>
            <RecorderDemo />
            <Modal
                ref={modal => { Modal.instance = modal; }}
                isReport={false}
            />
        </React.Fragment>
      ~~~
    `,
    TableComponent,
    }
  });