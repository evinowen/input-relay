var keypress = require('keypress');

keypress(process.stdin);

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
