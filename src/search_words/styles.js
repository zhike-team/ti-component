import { StyleSheet } from 'aphrodite';

const dot = {
  '66%': { transform: 'translateX(-3px)' },
  '33%': { transform: 'translateX(-6px)' },
  '0%': { transform: 'translateX(-10px)' },
};

const show = {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
};
export default StyleSheet.create({

  content: {
    display: 'none',
    position: 'absolute',
    zIndex: 10001,
    width: '280px',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.12)',
    userSelect: 'none',
    borderRadius: '5px',
  },
  triangle: {
    zIndex: 10000,
    display: 'none',
    width: 0,
    height: 0,
    borderWidth: '20px 20px 0  0',
    borderStyle: 'solid',
    borderColor: '#fff #fff transparent transparent ',
    position: 'absolute',
    backgroundColor: 'transparent',
    boxShadow: '0px 1px 15px 0px rgba(0,0,0,0.12)',
    transform: 'rotate(-45deg)',
    userSelect: 'none',
  },
  triangleMask: {
    zIndex: 10002,
    backgroundColor: 'white',
    boxShadow: '0px',
  },
  word: {
    fontSize: '16px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
  },
  sound: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4px',
  },
  soundMark: {
    marginRight: '8px',
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(135,143,152,1)',
    lineHeight: '17px',
  },
  soundButton: {
    cursor: 'pointer',
    width: 16,
    height: 12,
    backgroundImage: `url(${require('../assets/sound.png')})`,
    backgroundSize: '16px 12px',
    ':hover': {
      backgroundImage: `url(${require('../assets/sound_hover.png')})`,
      backgroundSize: '16px 12px ',
    },
  },
  unAvalible: {
    width: 16,
    height: 12,
    backgroundImage: `url(${require('../assets/sound.png')})`,
    backgroundSize: '16px 12px',
  },
  isPlaying: {
    cursor: 'pointer',
    width: 16,
    height: 12,
    backgroundImage: `url(${require('../assets/sound_play.gif')})`,
    backgroundSize: '16px 12px',
  },
  translate: {
    marginTop: '20px',
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
  },
  translateList: {
    flexDirection: 'row',
  },
  showContent: {
    display: 'flex',
    animationName: [show],
    animationDuration: '0.5s',
    animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
    animationIterationCount: '1',
  },
  noContent: {
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    marginTop: '20px',
    color: 'rgba(135,143,152,1)',
    lineHeight: '17px',
  },
  dot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textIndent: 0,
  },
  dotMask: {
    display: 'inline-block',
    width: '10px',
    height: '24px',
    backgroundColor: 'white',
    animationName: [dot],
    animationDuration: '1.5s',
    animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
    animationDelay: '-0.24s',
    animationIterationCount: 'infinite',
  },
  result: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searching: {
    marginTop: '20px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textIndent: '20px',
    fontSize: '12px',
    fontFamily: 'PingFang-SC-Medium',
    fontWeight: 500,
    color: 'rgba(135,143,152,1)',
    lineHeight: '24px',
  },
});
