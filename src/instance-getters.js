const {
  conditionalRegExp,
  headRegExp,
  listRegExp,
  simpleRegExp,
} = require('./expressions')

const getConditionalInstances = (template) => (
  template.match(conditionalRegExp)
)

const getListInstances = (template) => (
  template.match(listRegExp)
)

const getSectionHead = (section) => (
  section.match(headRegExp)
)

const getSimpleInstances = (template) => (
  template.match(simpleRegExp)
)

module.exports = {
  getConditionalInstances,
  getListInstances,
  getSectionHead,
  getSimpleInstances,
}
