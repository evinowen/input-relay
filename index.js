const http = require('http')
const keypress = require('keypress');

const hostname = ''
const port = 3000
const player = 1

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

keypress(process.stdin);

function send_request(hostname, port, player, key) {
  if (key in held) {
    process.stdout.write('-')
    return
  }

  console.log('send_request', hostname, port, player, key)
  held[key] = 1

  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      port: port,
      path: `/player${player}/${key}`,
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
    process.stdin.pause();
  }

  if (key.name in map) {
    send_request(hostname, port, player, map[key.name])
  } else {
    console.log('unmapped key', key.name)
  }

});

process.stdin.setRawMode(true);
process.stdin.resume();
