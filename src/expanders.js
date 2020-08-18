/* eslint-disable arrow-parens */
const flow = require('lodash/flow')
const get = require('lodash/get')
const set = require('lodash/set')

const {
  getSectionHead,
  getSimpleInstances,
} = require('./instance-getters')

const simpleExpansion = ({
  template,
  simpleInstances,
  args,
  index = null,
}) => {
  if (!simpleInstances) return template
  let copy = ''.concat(template)

  if (index >= 0) copy = copy.replace('%(index)', index)
  simpleInstances.forEach((placeholder) => {
    copy = copy.replace(`%(${placeholder})`, get(args, placeholder))
  })
  return copy
}

const conditionalExpansion = ({ template, conditionalInstances, args }) => {
  if (!conditionalInstances) return template
  let copy = ''.concat(template)

  conditionalInstances.map((section) => {
    const slicedCopy = copy.replace(` [?${section}]`, '')
    const split = section.split(' ')
    let placeholderKeys = flow(s => s.shift(), s => getSectionHead(s))(split)[0]
    if (!placeholderKeys) {
      copy = slicedCopy
      return 'skip_section'
    }
    placeholderKeys = placeholderKeys.match(/([^,|^\s]+)/g)
    const placeholderValues = placeholderKeys.map((k) => get(args, k))
    if (placeholderValues.includes(undefined)) {
      copy = slicedCopy
      return 'skip_section'
    }
    const sectionExpansion = flow(s => s.join(' '), s => simpleExpansion({
      template: s,
      simpleInstances: getSimpleInstances(s),
      args: placeholderKeys.reduce((a, c, idx) => set(a, c, placeholderValues[idx]), {}),
    }))(split)
    copy = copy.replace(`[?${section}]`, sectionExpansion)
    return 'section_done'
  })
  return copy
}

const listExpansion = ({ template, listInstances, args }) => {
  if (!listInstances) return template
  let copy = ''.concat(template)

  listInstances.map((section) => {
    const slicedCopy = copy.replace(` [[%${section}]]`, '')
    const split = section.split(' ')
    const placeholderKey = flow((s) => s.shift(), (s) => getSectionHead(s))(split)[0]
    if (!placeholderKey) {
      copy = slicedCopy
      return 'skip_section'
    }
    const values = get(args, placeholderKey)
    if (!values || !Array.isArray(values)) {
      copy = slicedCopy
      return 'skip_section'
    }
    const sectionTemplate = split.join(' ')
    const sectionCopy = values.map((v, idx) => simpleExpansion({
      template: sectionTemplate,
      simpleInstances: getSimpleInstances(sectionTemplate),
      args: v,
      index: idx,
    }))
    copy = copy.replace(`[[%${section}]]`, sectionCopy.join(', '))
    return 'section_done'
  })
  return copy
}

module.exports = {
  conditionalExpansion,
  listExpansion,
  simpleExpansion,
}
