var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillators = {};

function oscillatorForNote(note) {
  var freq = teoria.note(note).fq();

  if (!oscillators[freq]) {
    oscillators[freq] = new Oscillator(freq, context.destination);
  }

  return oscillators[freq];
}

function Oscillator(freq, output) {
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  gain.gain.value = 0;

  oscillator.frequency.value = freq;
  oscillator.start(0);

  this.start = function() {
    gain.gain.value = 1;
  }

  this.stop = function() {
    gain.gain.value = 0;
  }
}

$(document)
  .on('keydown', function(e) {
    var note = keyNotes[e.keyCode];
    if (note) {
      oscillatorForNote(note).start();
      var keyId = note.replace('#', 'S');
      $('#key-' + keyId).addClass('active');
    }
  })
  .on('keyup', function(e) {
    var note = keyNotes[e.keyCode];
    if (note) {
      oscillatorForNote(note).stop();
      var keyId = note.replace('#', 'S');
      $('#key-' + keyId).removeClass('active');
    }
  });

// $('body')
//   .on('mousedown', function() {
//     gain.gain.value = 1;
//   })
//   .on('mouseup', function() {
//     gain.gain.value = 0;
//   });

// $('body').on('mousemove', function(e) {
//   var normalizedX = e.clientX / $(e.target).width();
//   var freq = normalizedX * 1000 + 80; // Range from 80 to 1080 Hz
//   oscillator.frequency.value = freq;
//   $('#frequency').text(Math.round(freq));
// });
