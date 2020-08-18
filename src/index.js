const {
  conditionalExpansion,
  listExpansion,
  simpleExpansion,
} = require('./expanders')

const {
  getConditionalInstances,
  getListInstances,
  getSimpleInstances,
} = require('./instance-getters')

const handler = ({ template, args }) => {
  let copy = ''.concat(template)
  const listInstances = getListInstances(copy)
  if (listInstances) copy = listExpansion({ copy, listInstances, args })

  const conditionalInstances = getConditionalInstances(copy)
  if (conditionalInstances) copy = conditionalExpansion({ copy, conditionalInstances, args })

  const simpleInstances = getSimpleInstances(copy)
  if (simpleInstances) copy = simpleExpansion({ copy, simpleInstances, args })

  return copy
}

module.exports = handler
