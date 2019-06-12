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
			(
      <div style={{ width: 510 }}>
      <RenderIndex 
        params={{ questionId: '1007319', exerciseId: '12312', mode: 'practice'}}
         questions={[{
          rank: 1,
          id: 1007318,
          type: "Blank",
          materials: [
            {
              id: 37831,
                userAnswer: {
                correct: true
              }
            },
            {
              id: 37834,
              userAnswer: {
                correct: true
              }
            },
          ],
         },{
          rank: 2,
          id: 1007319,
          type: "Blank",
          materials: [
            {
              id: 37832,
              userAnswer: {
                correct: false
              }},
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          id: 1007320,
          rank: 3,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 4,
          id: 1007321,
          type: "Blank",
          materials: [
            {
              id: 37831,
                userAnswer: {
                correct: true
              }
            },
            {
              id: 37834,
              userAnswer: {
                correct: true
              }
            },
          ],
         },{
          rank: 5,
          id: 1007322,
          type: "Blank",
          materials: [
            {
              id: 37832,
              userAnswer: {
                correct: false
              }},
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          id: 1007323,
          rank: 6,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 7,
          id: 1007324,
          type: "Blank",
          materials: [
            {
              id: 37831,
                userAnswer: {
                correct: true
              }
            },
            {
              id: 37834,
              userAnswer: {
                correct: true
              }
            },
          ],
         },{
          rank: 8,
          id: 1007325,
          type: "Blank",
          materials: [
            {
              id: 37832,
              userAnswer: {
                correct: false
              }},
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 9,
          id: 1007326,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 10,
          id: 1007327,
          type: "Blank",
          materials: [
            {
              id: 37831,
                userAnswer: {
                correct: true
              }
            },
            {
              id: 37834,
              userAnswer: {
                correct: true
              }
            },
          ],
         },{
          rank: 11,
          id: 1007328,
          type: "Blank",
          materials: [
            {
              id: 37832,
              userAnswer: {
                correct: false
              }},
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 12,
          id: 1007329,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 13,
          id: 1007330,
          type: "Blank",
          materials: [
            {
              id: 37832,
              userAnswer: {
                correct: false
              }},
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 14,
          id: 1007331,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         },
         {
          rank: 15,
          id: 1007334,
          type: "Blank",
          materials: [
            {
              id: 37833,
              userAnswer: {
                correct: false
              }},
          ],
         }
        ]}
        history={() => alert('sssss')}
      />
      </div>
      )
		), {
			info: {
				text: `索引组件案例  使用组件方法如下：
				<RenderIndex></RenderIndex>
			  `,
			  TableComponent,
			}
		})