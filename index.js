const http = require('http')
const keypress = require('keypress');

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

  if (key && key.name == 'up') {
    console.log('up')
  }

  if (key && key.name == 'down') {
    console.log('down')
  }

  if (key && key.name == 'right') {
    console.log('right')
  }

  if (key && key.name == 'left') {
    console.log('left')
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
