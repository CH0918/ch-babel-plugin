console.log("fileName: /Users/chdj/code/ch-babel-plugin/src/LogLinePlugin/sourcesCode.js,(line:1, column: 0)")
console.log(1222);
function func() {
  console.log("fileName: /Users/chdj/code/ch-babel-plugin/src/LogLinePlugin/sourcesCode.js,(line:4, column: 2)")
  console.info(2);
}
export default class Clazz {
  say() {
    console.log("fileName: /Users/chdj/code/ch-babel-plugin/src/LogLinePlugin/sourcesCode.js,(line:9, column: 4)")
    console.debug(3);
  }
  render() {
    return <div>{[console.log("fileName: /Users/chdj/code/ch-babel-plugin/src/LogLinePlugin/sourcesCode.js,(line:12, column: 17)"), console.error(4)]}</div>;
  }
}
