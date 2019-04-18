import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TableComponent from './tableComponent';
import Header from '../src/header';

const headerData = {
  params: { mode: 'package' },
  name: '智课题库项目组 测试header组件',
  step: {
		index: 7,
		practice: {
			"id": 1002113,
			"name": "测试雅思-听力",
			"shortName": null,
			"status": "Visible",
			"examId": 2,
			"subjectId": 6,
			"conciseId": null,
			"textbookId": 80,
			"topicId": null,
			"canIntensiveListening": false,
			"canFollowUp": null,
			"difficulty": null,
			"dimension": null,
			"audition": false,
			"practiceTypeId": null,
			"recommendDuration": 1200,
			"createdAt": "2019-02-28T06:57:22.000Z",
			"updatedAt": "2019-02-28T06:57:22.000Z",
			"material": {
				"id": 3123,
				"title": "",
				"origin": {
					"paragraphs": [
						{
							"id": "0b0615d4-056f-f908-9e12-d33ca1ddd00f",
							"text": "就是不肯努力的；1",
							"type": "Text"
						}
					]
				},
				"translation": {},
				"images": null,
				"audios": null,
				"practiceId": 1002113
			},
		},
		practiceId: 1002113,
		question: {
			"id": 1007184,
			"name": "测试雅思-听力 Q1-Q2",
			"status": "Visible",
			"type": "Blank",
			"questionTagId": null,
			"rank": 3,
			"difficulty": null,
			"exampleNum": 0,
			"stem": {
				"paragraphs": [
					{
						"id": "c9924a76-5e66-59b1-e3bd-5e7a4e257d23",
						"text": "阿升级换代不可能离开；了",
						"type": "Text"
					}
				],
				"inlineMarkup": [
					{
						"pid": "c9924a76-5e66-59b1-e3bd-5e7a4e257d23",
						"type": "InsertBlank",
						"index": 2,
						"length": 2
					},
					{
						"pid": "c9924a76-5e66-59b1-e3bd-5e7a4e257d23",
						"type": "InsertBlank",
						"index": 5,
						"length": 2
					}
				]
			},
			"extra": {
				"qNum": [
					"1",
					"2"
				],
				"answer": [
					"1|1|2",
					"2|1|3"
				],
				"audioText": {},
				"instructions": {
					"paragraphs": [
						{
							"id": "92e48313-9018-a70d-be63-ce9a95d4912e",
							"text": "阿斯顿艰苦；了",
							"type": "Text"
						}
					]
				},
				"audioMaterial": {
					"src": ""
				},
				"headingNumber": "3",
				"imageMaterial": {
					"src": ""
				},
				"answerAnalysis": {
					"paragraphs": [
						{
							"id": "6c9a0c4b-1232-2f7d-d63c-be1d56878ce8",
							"text": "阿斯顿就",
							"type": "Text"
						}
					]
				},
				"instructionalAudio": {
					"src": ""
				}
			},
			"practiceId": 1002113,
			"examId": 2,
			"videoTimeRangeId": null,
			"subjectId": 6,
			"conciseId": null,
			"audition": false,
			"textbookId": 80,
			"recommendDuration": 240,
			"practiceTypeId": null,
			"createdAt": "2019-02-28T06:57:22.000Z",
			"updatedAt": "2019-02-28T06:57:22.000Z",
			"materials": [
				{
					"id": 28270,
					"qNum": [
						1
					],
					"rank": 1,
					"subStem": null,
					"image": null,
					"audio": null,
					"audioReference": null,
					"reference": null,
					"direction": null,
					"videoTimeRangeId": null,
					"choices": null,
					"insertSentence": null,
					"positionTip": null,
					"answer": [
						"1|1|2"
					],
					"analysis": null,
					"examples": null,
					"questionId": 1007184,
					"origin": null,
					"score": null,
					"labels": null
				},
				{
					"id": 28271,
					"qNum": [
						2
					],
					"rank": 2,
					"subStem": null,
					"image": null,
					"audio": null,
					"audioReference": null,
					"reference": null,
					"direction": null,
					"videoTimeRangeId": null,
					"choices": null,
					"insertSentence": null,
					"positionTip": null,
					"answer": [
						"2|1|3"
					],
					"analysis": null,
					"examples": null,
					"questionId": 1007184,
					"origin": null,
					"score": null,
					"labels": null
				}
			]
		},
		questionCount: 8,
		questionId: 1007184,
		questionIndex: 6,
		questionMaterialIds: [
		  {
			answerIndexs: [0],
			qNum: [1],
			questionId: 1007184,
			questionMaterialId: 28270,
		  },
		  {
			answerIndexs: [1],
			qNum: [2],
			questionId: 1007184,
			questionMaterialId: 28271,
		  },
		],
		subject: "Reading",
		type: "ReadingQuestion",
  },
    stepList: [{}, {}],
    timer: {},
    setTimer: () => {},
    getUploadSignature: () => {},
    postCorrectionImage: () => {},
    postCorrection: () => {},
    postDuration: () => {},
};

/* eslint-disable */
storiesOf('Header', module)
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
  .add('题库项目必用组件，用来控制当前步骤和练习计时',
		() =>
			(<Header 
				{...headerData}
			/>)
		, {
			info: {
				text: `音频播放器组件案例  使用组件方法如下：
				<Header {...headerData}></Header>
			`,
			TableComponent
			}
		})