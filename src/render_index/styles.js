import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  indexBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 510,
    borderBottom: 'solid 1px #c3ccd1',
  },
  num: {
    position: 'relative',
    marginLeft: 8,
    marginBottom: 15,
    width: 28,
    height: 28,
    lineHeight: '28px',
    borderRadius: '3px',
    border: 'solid 1px #878f98',
    color: '#49cf51',
    textAlign: 'center',
    cursor: 'pointer',
  },
  triangle: {
    position: 'absolute',
    width: 10,
    height: 6,
    top: 37,
    left: 8,
    backgroundImage: `url(${require('./assets/top.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
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
    height: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: '#F6F8F9',
    },
  },
  disabled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,54,58,0.3)',
    ':hover': {
      backgroundColor: 'rgba(50,54,58,0.3)',
    },
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    marginRight: 6,
  },
});
