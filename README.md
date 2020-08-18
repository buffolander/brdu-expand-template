> Expands placeholders in a string template based on named or positional arguments. It's also possible to use complex templates including lists and conditionals.

## Installation

```
$ npm install --save @brdu/expand-template
```

## Usage

**Simple templates** accept both named and positional arguments, as well as nested named arguments.

The placeholder format for this template is `%(key)`. Simple templates are also used within conditional templates and list templates.

```
const expand = require('@brdu/expand-template')

let template = 'Hello %(name). How are you doing today?'
let args = { name: 'Buffolander' }
console.info(expand({ template, args }))
// 'Hello Buffolander. How are you doing today?'

template = 'Hello %(1) and %(0). How are you doing?'
args = ['Buffolander', 'Kelly']
console.info(expand({ template, args }))
// 'Hello Kelly and Buffolander. How are you doing?'

template = '...schedule an appointment with Dr. %(md.last_name)'
args = {
  patient: 'any',
  md: {
    first_name: 'John',
    last_name: 'Smith',
  },
}
console.info(expand({ template, args }))
// '...schedule an appointment with Dr. Smith'
```

### Conditional templates

Conditional templates use one or more keys to validate wether to expand variables within that section or to remove the section altogether.

The placeholder format for this template is `[?(keyA, keyB) <simpleTemplate>]`.

```
template = 'Hello world! [?(weather, city) It\'s a %(weather) day in %(city).]'
args = { weather: 'sunny' }
console.info(expand({ template, args }))
// 'Hello world!' // city missing in args; conditional section removed

args = { ...args, city: 'Miami' }
console.info(expand({ template, args }))
// 'Hello world! It\'s a sunny day in Miami.'
```

### List templates

Finally, list templates take an array as input for repeating text sections. The placeholder format for this template is `[[%(key) <simpleTemplate>]]`. On this template `index` is a reserved key, used to print out the position in the array.

```
template = 'Hello there, please [[%(directory) press %(index) for %(department)]].'
args = {
  company: 'Acme',
  directory: [{
    department: 'Sales',
  }, {
    department: 'Support',
  }],
}
console.info(expand({ template, args }))
// 'Hello there, please press 0 for Sales, press 1 for Support.'
```
