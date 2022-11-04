const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;
const path = require('path');
const fs = require('fs');

// 1.读取代码
// const sourceCode = fs.readFileSync(
//   path.resolve(__dirname, './sourcesCode.js'),
//   { encoding: 'utf8' }
// );
// // console.log(sourceCode);
// // 2.将代码解析生成ast
// const ast = parser.parse(sourceCode, {
//   sourceType: 'unambiguous',
//   plugins: ['jsx'],
// });
// // 3.遍历ast节点，在console.log();前面加上所在的行和列
// const targetCalleeName = ['log', 'info', 'error', 'warn', 'debug'].map(
//   (name) => `console.${name}`
// );
// traverse(ast, {
//   CallExpression(path, state) {
//     if (path.node.isNewNode) return;
//     // const targetName = path.get('callee').toString();
//     const targetName = generate(path.node.callee).code;

//     if (targetCalleeName.includes(targetName)) {
//       const { line, column } = path.node.loc.start;
//       const newNode = template.expression(
//         `console.log("fileName(line:${line}, column: ${column})")`
//       )();
//       newNode.isNewNode = true;

//       if (path.findParent((path) => types.isJSXElement(path))) {
//         // console 包含在jsx里面 jsx里面只能有单个执行语句<div>{console.log(11)}</div>，多个要变成数组的形式<div>{[console.log(1), console.log(1)]}</div>
//         path.replaceWith(types.arrayExpression([newNode, path.node]));
//         path.skip();
//       } else {
//         path.insertBefore(newNode);
//       }
//     }
//   },
// });
// // 4.将ast还原回代码
// const { code } = generate(ast);
// fs.writeFileSync(path.resolve(__dirname, './bundle1.js'), code, {
//   encoding: 'utf8',
// });
const targetCalleeName = ['log', 'info', 'error', 'warn', 'debug'].map(
  (name) => `console.${name}`
);
module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNewNode) return;
        // const targetName = path.get('callee').toString();
        const targetName = generate(path.node.callee).code;

        if (targetCalleeName.includes(targetName)) {
          const { line, column } = path.node.loc.start;
          const newNode = template.expression(
            `console.log("fileName: ${
              state.filename || 'unknow'
            },(line:${line}, column: ${column})")`
          )();
          newNode.isNewNode = true;

          if (path.findParent((path) => types.isJSXElement(path))) {
            // console 包含在jsx里面 jsx里面只能有单个执行语句<div>{console.log(11)}</div>，多个要变成数组的形式<div>{[console.log(1), console.log(1)]}</div>
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};
