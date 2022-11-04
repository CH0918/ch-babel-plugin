console.log("fileName(line:1, column: 0)")
console.log(1);
function func() {
  console.log("fileName(line:4, column: 2)")
  console.info(2);
}
export default class Clazz {
  say() {
    console.log("fileName(line:9, column: 4)")
    console.debug(3);
  }
  render() {
    return <div>{[console.log("fileName(line:12, column: 17)"), console.error(4)]}</div>;
  }
}