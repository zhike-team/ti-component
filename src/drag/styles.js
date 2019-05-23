import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#000',
    fontSize: '20px',
  },
  group: {
    width: '220px',
    background: 'rgba(211,211,211,1)',
    border: '1px solid rgba(187,187,187,1)',
    textAlign: 'center',
    position: 'fixed',
    zIndex: '1000',
    padding: '10px 6px',
  },
  group1: {
    opacity: '0',
    transition: 'all 300ms linear 30ms',
  },
  group_head: {
    cursor: 'move',
    fontSize: '15px',
    color: '#666',
    fontWeight: 'bold',
    height: '26px',
  },
  group_head_close: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  group_body: {
  },
});

