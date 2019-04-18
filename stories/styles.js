import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    marginTop: '50px',
    marginLeft: '50px',
  },
  container1: {
    width: '600px',
    height: '200px',
    overflowY: 'auto',
    border: '1px solid gray',
    padding: '10px',
  },
  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },
  alertText: {
    display: 'inline-block',
    marginTop: 10,
  },
  tipText: {
    color: 'red',
  },
  tipText1: {
    color: '#3399FF',
  },
  table: {
    boxSizing: 'border-box',
    width: '1100px',
    height: '40px',
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    color: 'rgba(50,54,58,1)',
    lineHeight: '24px',
    borderSpacing: '0px',
    borderPadding: '0px',
    borderCollapse: 'collapse',
  },

  tbody: {
    boxSizing: 'border-box',
    maxWidth: '1100px',
  },

  tableCell: {
    border: '1px solid rgba(195,204,209,1)',
    padding: '32px 20px',
    fontWeight: 'normal',
  },

  paragraphClass: {
    lineHeight: '48px',
  },
  paragraph1: {
    width: '300px',
  },
  paragraph2: {
    width: '500px',
  },

  // TableComponent 的样式
  tableComponent: {
    textAlign: 'left',
    fontSize: '14px',
    padding: '14px 16px',
    borderWidth: '1px 0',
    bordercolor: '#e8e8e8',
    boxSizing: 'border-box',
  },
  th: {
    padding: '14px 16px',
  },
  tr: {
    padding: '14px 16px',
    borderWidth: '0 0 2px 0',
    background: 'rgba(0,0,0,0.02)',
    color: '#5c6b77',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  tableBody: {
    padding: '14px 16px',
    fontFamily: 'SFMono-Regular',
    lineHeight: '1.5',
  },
  propTr: {
    boxSizing: 'border-box',
    borderWidth: '1px 0',
    bordercolor: '#e8e8e8',
  },
  td: {
    fontWeight: 500,
    padding: '14px 16px',
    ':first-child': {
      width: '20%',
      color: '#003a8c',
      fontWeight: 500,
    },
    borderBottom: '1px solid #ebedf0',
  },
});
