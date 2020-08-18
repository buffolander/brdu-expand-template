/* eslint-disable no-undef */
const {
  getConditionalInstances,
  getListInstances,
  getSimpleInstances,
} = require('../src/instance-getters')

const testsCases = {
  noPlaceholders: {
    copy: 'It\'s a beautiful day, isn\'t it?',
    instanceGetterExpects: null,
  },
  conditionalTemplate: {
    copy: '[?(season) What a lovely %(season) day]. Would you like to go for a walk?',
    conditionalGetterExpects: ['(season) What a lovely %(season) day'],
    listGetterExpects: null,
    simpleGetterExpects: ['season'],
  },
  listTemplate: {
    copy: 'Using your phone keypad, please press [[%(contacts) %(index) for %(full_name)]]',
    conditionalGetterExpects: null,
    listGetterExpects: ['(contacts) %(index) for %(full_name)'],
    simpleGetterExpects: ['contacts', 'index', 'full_name'],
  },
  'simpleTemplate A': {
    copy: 'You may call me %(name)',
    conditionalGetterExpects: null,
    listGetterExpects: null,
    simpleGetterExpects: ['name'],
  },
  'simpleTemplate B': {
    copy: 'Hi, my name\'s %(username). I\'d like to set an appointment with Dr %(name.last)',
    conditionalGetterExpects: null,
    listGetterExpects: null,
    simpleGetterExpects: ['username', 'name.last'],
  },
}

Object.keys(testsCases).map((key) => {
  let { conditionalGetterExpects } = testsCases[key]
  if (conditionalGetterExpects === undefined) {
    conditionalGetterExpects = testsCases[key].instanceGetterExpects
  }
  let { listGetterExpects } = testsCases[key]
  if (listGetterExpects === undefined) {
    listGetterExpects = testsCases[key].instanceGetterExpects
  }
  let { simpleGetterExpects } = testsCases[key]
  if (simpleGetterExpects === undefined) {
    simpleGetterExpects = testsCases[key].instanceGetterExpects
  }

  it(`${key} conditionalInstanceTest`, () => {
    expect(getConditionalInstances(testsCases[key].copy)).toStrictEqual(
      conditionalGetterExpects,
    )
  })
  it(`${key} listInstanceTest`, () => {
    expect(getListInstances(testsCases[key].copy)).toStrictEqual(
      listGetterExpects,
    )
  })
  it(`${key} simpleInstanceTest`, () => {
    expect(getSimpleInstances(testsCases[key].copy)).toStrictEqual(
      simpleGetterExpects,
    )
  })

  return null
})
