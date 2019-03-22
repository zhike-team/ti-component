import React, { Component } from 'react';
import 'katex/dist/katex.min.css';
import { View } from '@zhike/ti-ui';
import { InlineMath, BlockMath } from 'react-katex';
import MathJax from 'react-mathjax2';

// 录音
export default class Katex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '\\int_0^\\infty x^2 dx',
      ascii: 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))',
      tex: 'f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi',
    };
    this.MathJaxStart = false;
  }

  // 渲染
  render() {
    const { formula, ascii, tex } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <View>提问产品经理</View>
        <br />
        <View>&nbsp;&nbsp;1.Athene添加数学公式，想做成的具体效果是什么样的：</View>
        <View>&nbsp;目前通过初步的调研， 可以使用 MathJax 或者Katex两种插件</View>
        <br />
        <View>Tip:</View>
        <View>老的Athene题库使用的是：MathJax + 根据语法编辑公式</View>
        <View>如果产品想要实现一个完善的数学编辑器的效果</View>
        <View>&nbsp;&nbsp;类似于<a target="_blank" rel="noopener noreferrer" href="https://www.edrawsoft.cn/math/" >亿图公式编辑器 </a></View>
        <View>时间成本上可能要多一些，需要尽早交流</View>
        <br />
        <br />
        <View>&nbsp;&nbsp;&nbsp;采用和老的Athene题库 一样的方案，开发较快：</View>
        <View>1）老师需要根据相应的数学公式的语法，在Athene后台可以实现在线验证的效果
            &nbsp;&nbsp;类似于<a target="_blank" rel="noopener noreferrer" href="https://katex.org/" >在线验证</a>
        </View>
        <View>2）在富文本中添加对应的行内样式，前端直接渲染。</View>
        <div>
          <View> 测试一：使用katex</View>
          支持输入TeX数学公式：
          <input
            style={{ marginRight: '10px' }}
            onChange={e => this.setState({ formula: e.target.value })}
            value={formula}
            placeholder="请输入TeX公式语法~"
          />
          <a target="_blank" rel="noopener noreferrer" href="https://katex.org/docs/support_table.html" > katex 语法参考网站：</a>
          {
            formula &&
            <div style={{ marginTop: '10px' }}>
              1)渲染成行内样式（InlineMath） 效果如下：
              <InlineMath
                math={formula}
                errorColor="#cc0000"
                renderError={error => (<b>Fail: {error.name}</b>)}
              />
              <br />
              <br />
              2)渲染成块级元素（BlockMath） 效果如下：
              <BlockMath
                math={formula}
                errorColor="#cc0000"
                renderError={error => (<b>Fail: {error.name}</b>)}
              />
            </div>
          }
        </div>
        <div style={{ marginTop: '20px' }}>
          <View>测试二：</View>
            使用 Mathjax <br />
            MathJax允许页面作者使用TeX、LaTeX符号和 MathML 或者 AsciiMath 去书写公式。<br />
          （缺点项目略显老旧，书写略微复杂)
          <br />
          参考资料：
          <a target="_blank" rel="noopener noreferrer" href="http://mirrors.ctan.org/info/symbols/math/maths-symbols.pdf" > MathJax 支持的数学符号表：</a>
          <br />
          1）使用 AsciiMath 公式
          <a target="_blank" rel="noopener noreferrer" href="http://asciimath.org/" > AsciiMath 语法参考网站：</a>
          <br />
          <input
            style={{ marginRight: '10px' }}
            onChange={e => this.setState({ ascii: e.target.value })}
            value={ascii}
            placeholder="请输入AsciiMath公式语法~"
          />
          <br />
          {
            ascii &&
            <MathJax.Context
                input="ascii"
                onLoad={() => console.log('Loaded MathJax script!')}
                onError={(MathJax, error) => {
                    console.warn(error);
                    console.log('Encountered a MathJax error, re-attempting a typeset!');
                    MathJax.Hub.Queue(MathJax.Hub.Typeset());
                }}
                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                options={{
                    asciimath2jax: {
                        useMathMLspacing: true,
                        delimiters: [['$$', '$$']],
                        preview: 'none',
                    },
                }}
            >
              <MathJax.Text
                text={` 这可以是动态文本（例如用户输入的文本），
                在符号中嵌入ASCII数学，例如$$${ascii}$$`}
              />
            </MathJax.Context>
          }
          <br />
          {
            ascii &&
              <MathJax.Context input="ascii">
                <div>
                这是用AsciiMath编写的内联公式: <MathJax.Node inline>{ ascii }</MathJax.Node>
                </div>
              </MathJax.Context>
          }
          <br />
          {
              ascii &&
              <div>
                这是用AsciiMath编写的行内公式:
                <MathJax.Context>
                  <div>
                    <MathJax.Node>{ascii}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
          }
          <br />
          2）使用 LaTeX 公式
          <br />
          <input
            style={{ marginRight: '10px' }}
            onChange={e => this.setState({ tex: e.target.value })}
            value={tex}
            placeholder="请输入LaTeX公式语法~"
          />
          <br />
          {
            tex &&
              <MathJax.Context input="tex">
                <div>
                  这是用LaTeX编写的内联公式:<MathJax.Node inline>{tex}</MathJax.Node>
                </div>
              </MathJax.Context>
          }
          {
            tex &&
            <MathJax.Context input="tex">
              <div>
                这是用LaTeX编写的行内公式:
                <MathJax.Node>{tex}</MathJax.Node>
              </div>
            </MathJax.Context>
          }
        </div>
      </div>
    );
  }
}
