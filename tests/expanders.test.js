/* eslint-disable no-undef */
const {
  getConditionalInstances,
  getListInstances,
  getSimpleInstances,
} = require('../src/instance-getters')

const {
  conditionalExpansion,
  listExpansion,
  simpleExpansion,
} = require('../src/expanders')

it('simpleExpansion (no args defined in template)', () => {
  const template = 'Hello world'
  const simpleInstances = getSimpleInstances(template)
  const args = []
  expect(simpleExpansion({
    template,
    simpleInstances,
    args,
  })).toStrictEqual(template)
})

it('simpleExpansion (named argument)', () => {
  const template = 'Hello %(name)'
  const simpleInstances = getSimpleInstances(template)
  const args = { name: 'Buffolander' }
  expect(simpleExpansion({
    template,
    simpleInstances,
    args,
  })).toStrictEqual('Hello Buffolander')
})

it('simpleExpansion (multiple occurences of same argument)', () => {
  const template = 'Hello %(name). How are you doing today %(name)?'
  const simpleInstances = getSimpleInstances(template)
  const args = { name: 'Buffolander' }
  expect(simpleExpansion({
    template,
    simpleInstances,
    args,
  })).toStrictEqual('Hello Buffolander. How are you doing today Buffolander?')
})

it('simpleExpansion (positional arguments)', () => {
  const template = 'Hello %(1) and %(0). How are you doing?'
  const simpleInstances = getSimpleInstances(template)
  const args = ['Buffolander', 'Kelly']
  expect(simpleExpansion({
    template,
    simpleInstances,
    args,
  })).toStrictEqual('Hello Kelly and Buffolander. How are you doing?')
})

it('conditionalExpansion (no args defined in template)', () => {
  const template = 'Hello world. It\'s a %(weather) day.'
  const conditionalInstances = getConditionalInstances(template)
  const args = []
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual(template)
})

it('conditionalExpansion (sentence removed: conditional arg missing)', () => {
  const template = 'Hello world! [?(weather) It\'s a %(weather) day.]'
  const conditionalInstances = getConditionalInstances(template)
  const args = []
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual('Hello world!')
})

it('conditionalExpansion (sentence removed: one of the conditional args missing)', () => {
  const template = 'Hello world! [?(weather,city) It\'s a %(weather) day in %(city).] '
    + 'We\'re going to the %(destination)'
  const conditionalInstances = getConditionalInstances(template)
  const args = { weather: 'sunny', destination: 'beach' }
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual('Hello world! We\'re going to the %(destination)')
})

it('conditionalExpansion (success: single conditional (positional) argument)', () => {
  const template = 'Hello world! [?(0) It\'s a %(0) day.]'
  const conditionalInstances = getConditionalInstances(template)
  const args = ['rainy']
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual('Hello world! It\'s a rainy day.')
})

it('conditionalExpansion (success: single conditional (nested) argument)', () => {
  const template = 'Hello there! [?(name.first) My name is %(name.first).]'
  const conditionalInstances = getConditionalInstances(template)
  const args = { name: { first: 'Buffolander', last: 'Smith' } }
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual('Hello there! My name is Buffolander.')
})

it('conditionalExpansion (success: multiple conditional argument)', () => {
  const template = 'Hello world! [?(weather,city) It\'s a %(weather) day in %(city).] '
    + 'We\'re going to the %(destination)'
  const conditionalInstances = getConditionalInstances(template)
  const args = { weather: 'sunny', city: 'Miami', destination: 'beach' }
  expect(conditionalExpansion({
    template,
    conditionalInstances,
    args,
  })).toStrictEqual('Hello world! It\'s a sunny day in Miami. We\'re going to the %(destination)')
})

it('listExpansion (no args defined in template)', () => {
  const template = 'Hello world. It\'s a %(weather) day.'
  const listInstances = getListInstances(template)
  const args = []
  expect(listExpansion({
    template,
    listInstances,
    args,
  })).toStrictEqual(template)
})

it('listExpansion (success)', () => {
  const template = 'Hello there, please [[%(directory) press %(index) for %(department)]].'
  const listInstances = getListInstances(template)
  const args = {
    company: 'Acme',
    directory: [{
      department: 'Sales',
    }, {
      department: 'Support',
    }],
  }
  expect(listExpansion({
    template,
    listInstances,
    args,
  })).toStrictEqual('Hello there, please press 0 for Sales, press 1 for Support.')
})
