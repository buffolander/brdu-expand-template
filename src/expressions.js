module.exports = {
  conditionalRegExp: /(?<=\[\?)(.*?)(?=\])/g,
  headRegExp: /(?<=\()(.*?)(?=\))/g,
  listRegExp: /(?<=\[\[%)(.*?)(?=\]\])/g,
  simpleRegExp: /(?<=%\()(.*?)(?=\))/g,
}
