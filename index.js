const http = require('http')
const keypress = require('keypress')
const { program } = require('commander');

program
  .requiredOption('-h, --host <host>', 'set the target hostname')
  .option('-p, --port <port>', 'set the port number, defaults to 3000', 3000)
  .option('-P, --player <number>', 'set the player number, defaults to 1', 1)

program.parse(process.argv);

const map = {
  "up": "up",
  "down": "down",
  "left": "left",
  "right": "right",
  "f": "a",
  "d": "b",
  "s": "select",
  "return": "start"
}

const held = { }

keypress(process.stdin)

function send_request(key) {
  if (key in held) {
    process.stdout.write('-')
    return
  }

  console.log('send_request', key)
  held[key] = 1

  return new Promise((resolve, reject) => {
    const options = {
      hostname: program.host,
      port: program.port,
      path: `/player${program.player}/${key}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': 0
      }
    }

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      resolve(res.statusCode)
    })

    req.on('error', reject)

    req.end()
  }).then(() => delete held[key])
}

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    console.log('exit')
    process.stdin.pause()
  }

  if (key.name in map) {
    send_request(map[key.name])
  } else {
    console.log('unmapped key', key.name)
  }

})

process.stdin.setRawMode(true)
process.stdin.resume()
