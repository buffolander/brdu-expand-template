const {
  conditionalExpansion,
  listExpansion,
  simpleExpansion,
} = require('./src/expanders')

const {
  getConditionalInstances,
  getListInstances,
  getSimpleInstances,
} = require('./src/instance-getters')

const handler = ({ template, args }) => {
  let copy = ''.concat(template)
  const listInstances = getListInstances(copy)
  if (listInstances) {
    copy = listExpansion({
      template: copy,
      listInstances,
      args,
    })
  }

  const conditionalInstances = getConditionalInstances(copy)
  if (conditionalInstances) {
    copy = conditionalExpansion({
      template: copy,
      conditionalInstances,
      args,
    })
  }

  const simpleInstances = getSimpleInstances(copy)
  if (simpleInstances) {
    copy = simpleExpansion({
      template: copy,
      simpleInstances,
      args,
    })
  }

  return copy
}

module.exports = handler
