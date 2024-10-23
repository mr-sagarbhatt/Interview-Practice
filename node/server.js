const fs = require('fs')
const EventEmitter = require('events')
const https = require('https')

// TODO: global: Node JS Global object
console.log({ global })

// TODO: process object or global.process object - return the current Node.js process.
console.log({ process })
console.log({ process: global.process })

// TODO: process.argv: Return arguments in terms of array of string, ex: If we run a js file it has node JS executable as first argument (for node), a file which we have run as a second argument (for server.js) and any other argument which we have passed like array, string, object etc.
console.log({
  processArgv: process.argv,
  processArgv0: process.argv[0],
  processArgv1: process.argv[1],
  processArgv2: process.argv[2],
})

console.log(`timer start`)

setTimeout(() => console.log(`setTimeout 0`), 0) // TODO: added in timer queue
setTimeout(() => console.log(`setTimeout 1`), 1000)
setTimeout(() => console.log(`setTimeout 2`))
setImmediate(() => console.log(`setImmediate 1`)) // TODO: added in check queue
setImmediate(() => console.log(`setImmediate 2`))

setTimeout(() => {
  console.log(`setTimeout 3`)
  setTimeout(() => console.log(`setTimeout 4`))
})

setImmediate(() => {
  console.log(`setImmediate 3`)
  setImmediate(() => console.log(`setImmediate 4`))
})

// TODO: added in poll queue
fs.readFile(__filename, () => {
  setTimeout(() => console.log(`setTimeout 5`), 0)
  setImmediate(() => console.log(`setImmediate 5`), 0)
  setImmediate(() => console.log(`setImmediate 6`), 1000)
  Promise.resolve().then(() => console.log(`Micro task queue 1`))
})

// TODO: added in micro task queue
Promise.resolve().then(() => console.log(`Micro task queue 2`))

// TODO: added in micro task queue
process.nextTick(() => console.log(`nextTick 1`))
process.nextTick(() => {
  setTimeout(() => console.log(`setTimeout 6`), 1000)
  setTimeout(() => console.log(`setTimeout 7`))
})

// TODO: Event Emitter
const ipl = new EventEmitter()
ipl.on('won', () => console.log(`KKR won IPL final in 2024.`))
// TODO: Multiple observers that subscribe to same event "won"
ipl.on('won', () => console.log(`SRH could have won the IPL final in 2024.`))
ipl.on('loss', () => console.log(`SRH loss IPL final in 2024.`))

ipl.emit('won')
ipl.emit('loss')

console.log(`timer end`)

// TODO: HTTPS
// * https.request()
const req = https.request('https://www.google.com/', (res) => {
  res.on('data', (chunk) => console.log(chunk))
  res.on('end', () => console.log('No more data...'))
})

req.end()

// * https.get()
https.get('https://www.google.com/', (res) => {
  res.on('data', (chunk) => console.log(chunk))
  res.on('end', () => console.log('No more data...'))
})
