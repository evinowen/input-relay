const http = require('http')
const keypress = require('keypress');

keypress(process.stdin);

function send_request(hostname, port, player, key) {
  console.log('send_request', hostname, port, player, key)

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
  })
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
