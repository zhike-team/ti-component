import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import AudioPlayerDemo from './demo/audio_player';
import TableComponent from './tableComponent';

/* eslint-disable */
storiesOf('AudioPlayer', module)
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
  .add('内置了play, pause, unload, getStatus, setVolume的API',
		(() =>
			(<AudioPlayerDemo />)
		), {
			info: {
				text: `音频播放器组件案例  使用组件方法如下：
				<AudioPlayerDemo></AudioPlayerDemo>
			  `,
			  TableComponent,
			}
		})