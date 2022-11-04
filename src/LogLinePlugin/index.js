const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const path = require('path');
const fs = require('fs');

// 1.读取代码
const sourceCode = fs.readFileSync(
  path.resolve(__dirname, './sourcesCode.js'),
  { encoding: 'utf8' }
);
// console.log(sourceCode);
// 2.将代码解析生成ast
const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx'],
});
// 3.遍历ast节点，在console.log();前面加上所在的行和列
const propertyNames = ['log', 'info', 'error', 'warn', 'debug'].map(
  (name) => `console.${name}`
);
traverse(ast, {
  CallExpression(path, state) {
    const callee = path.node.callee;
    // const targetName = generate(callee).code;
    const targetName = path.get('callee').toString();
    if (propertyNames.includes(targetName)) {
      const logArgs = path.node.arguments;
      const { line, column } = path.node.loc.start;
      logArgs.unshift(
        types.stringLiteral(`fileName: (line:${line},column:${column})`)
      );
    }
  },
});
// 4.将ast还原回代码
const { code } = generate(ast);
fs.writeFileSync(path.resolve(__dirname, './bundle1.js'), code, {
  encoding: 'utf8',
});
