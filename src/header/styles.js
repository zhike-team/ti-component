import { StyleSheet } from 'aphrodite';

// tip 动画
const tipAnimation = {
  '0%': {
    bottom: -140,
  },
  '12.5%': {
    bottom: 8,
  },
  '87.5%': {
    bottom: 8,
  },
  '100%': {
    bottom: -140,
  },
};

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 86,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#36424D',
    alignItems: 'center',
  },

  containerTest: {
    backgroundColor: '#385DAE',
  },

  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleLogo: {
    height: 28,
  },

  titleSplit: {
    width: 1,
    height: 28,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  titleText: {
    display: 'block',
    width: 500,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  question: {
    position: 'absolute',
    fontSize: 18,
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 300,
    color: '#fff',
    marginTop: 38,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  question1: {
    position: 'absolute',
    fontSize: 18,
    bottom: 34,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 300,
    color: '#fff',
    marginTop: 38,
    fontFamily: 'PingFangSC-Semibold',
    fontWeight: 600,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },

  subjectBox: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 320,
  },

  subjects: {
    position: 'relative',
    margin: '0 auto',
    flexDirection: 'row',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '16px',
  },

  line: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 240,
    height: 1,
    background: 'rgba(255,255,255,0.2)',
    zIndex: 1,
  },

  subject: {
    width: 80,
    textAlign: 'center',
  },

  bground: {
    position: 'relative',
    margin: '0 auto',
    marginBottom: 5,
    padding: 2,
    backgroundColor: '#5f7dbe',
    width: 20,
    height: 20,
    borderRadius: '50%',
    zIndex: 2,
  },

  finishIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
    with: 16,
    height: 16,
    zIndex: 3,
  },

  normalButtons: {
    flexDirection: 'row',
  },

  button: {
    marginLeft: 10,
  },

  buttonTest: {
    backgroundColor: '#fff',
    color: '#333',
    ':hover': {
      backgroundColor: '#EDF3FF',
    },
  },

  buttonTime: {
    color: '#fff',
    alignItems: 'center',
  },
  buttonTimePackage: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  buttonTimeTest: {
    flexDirection: 'row',
    marginRight: 20,
    height: 28,
    lineHeight: '28px',
    fontSize: 14,
    color: '#FFFFFF',
  },

  timeIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    marginTop: 8,
  },

  timeButtons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  volumeWrapper: {
    position: 'relative',
  },

  volumeBodyWrapper: {
    position: 'fixed',
    zIndex: 10,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },

  volume: {
    position: 'absolute',
    zIndex: 20,
    width: 86,
    height: 20,
    left: 10,
    top: 32,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  volumeProcessBarWrapper: {
    position: 'relative',
    width: 66,
    height: 2,
    marginTop: 9,
    marginLeft: 10,
    backgroundColor: '#C3CCD1',
    borderRadius: 1,
  },

  volumeProcessBar: {
    height: 2,
    backgroundColor: '#3399FF',
    borderRadius: 1,
  },

  volumeProcessCircle: {
    position: 'absolute',
    width: 11,
    height: 11,
    top: -5,
    border: '1px solid #878F98',
    borderRadius: 11,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'background-color .15s',
    userSelect: 'none',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },

  volumeTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: -4,
    left: 38,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '4px solid #fff',
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 90,
    height: 90,
    marginTop: 20,
  },

  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },
  modalAlertText1: {
    fontSize: 14,
    marginTop: 30,
    fontWeight: 400,
  },
  modalAlertTip: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

  tipBox: {
    position: 'fixed',
    bottom: 8,
    right: 8,
    padding: '10px 10px 20px 20px',
    width: 280,
    height: 130,
    fontSize: 12,
    background: '#FFF',
    color: '#29323A',
    boxShadow: '0px 1px 10px 0px rgba(195,204,209,0.5)',
    borderRadius: 4,
    animationFillMode: 'forwards',
    animationName: [tipAnimation],
    animationDuration: '4s',
  },

  tipContent: {
    marginTop: 20,
    flexDirection: 'row',
  },

  tipText: {
    width: 160,
    alignSelf: 'center',
  },
  tipAlertText: {
    color: '#385DAE',
  },
  tipClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  close: {
    position: 'relative',
    width: 10,
    height: 10,
    cursor: 'pointer',
    ':before': {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: 1,
      height: 10,
      background: '#29323A',
      transform: 'rotate(45deg)',
    },
    ':after': {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: 1,
      height: 10,
      background: '#29323A',
      transform: 'rotate(-45deg)',
    },
  },

  shortcutTipWrapper: {
    position: 'relative',
  },

  shortcutTip: {
    position: 'absolute',
    top: 28,
    left: 10,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    lineHeight: '28px',
    userSelect: 'none',
    opacity: 0.5,
  },
  modalTip: {
    justifyItems: 'center',
  },

});
