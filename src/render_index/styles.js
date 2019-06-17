import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  indexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 510,
    flexWrap: 'wrap',
  },
  num: {
    position: 'relative',
    marginRight: 9,
    marginBottom: 15,
    width: 28,
    minHeight: 28,
    lineHeight: '28px',
    borderRadius: '3px',
    border: 'solid 1px #878f98',
    color: '#49cf51',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  numGreen: {
    color: '#49cf51',
    ':hover': {
      backgroundColor: '#49cf51',
      color: '#fff',
      border: 'solid 1px #49cf51',
    },
  },
  numGreenActive: {
    backgroundColor: '#49cf51',
    color: '#fff',
    border: 'solid 1px #49cf51',
  },

  numRed: {
    color: '#fd5454',
    ':hover': {
      backgroundColor: '#fd5454',
      color: '#fff',
      border: 'solid 1px #fd5454',
    },
  },
  numRedActive: {
    backgroundColor: '#fd5454',
    color: '#fff',
    border: 'solid 1px #fd5454',
  },
  numBlack: {
    color: '#000',
    ':hover': {
      backgroundColor: '#000',
      color: '#fff',
      border: 'solid 1px #000',
    },
  },
  numBlackActive: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'solid 1px #000',
  },
  image: {
    width: 12,
    ':hover': {
      transform: 'rotateX(360deg)',
    },
  },
  button: {
    alignSelf: 'start',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: '#F6F8F9',
    },
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  right: {
    marginRight: 0,
  },
  answer: {
    display: 'inline-block',
    color: 'rgba(50,54,58,1)',
    lineheight: '17px',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: 400,
    paddingRight: '8px',
    fontSize: '12px',
  },
  correct: {
    color: 'rgba(73,207,81,1)',
    marginRight: '20px',
  },
  error: {
    color: 'rgba(240,65,52,1)',
  },
});
