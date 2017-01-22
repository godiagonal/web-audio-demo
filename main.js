var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillators = {};

function oscillatorForNote(note) {
  var freq = teoria.note(note).fq();

  if (!oscillators[freq]) {
    oscillators[freq] = new Oscillator(freq, audioBus);
  }

  return oscillators[freq];
}

var audioBus = context.createGain();
var distortion = new Distortion();
var delay = new Delay();
var mainOscillator = new Oscillator(0, audioBus);

audioBus.connect(delay.node);
//distortion.connect(delay.node);
delay.connect(context.destination);

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

$('body')
  .on('mousedown', function() {
    mainOscillator.start();
  })
  .on('mouseup', function() {
    mainOscillator.stop();
  })
  .on('mousemove', function(e) {
    var normalizedX = e.clientX / $('body').width();
    var freq = normalizedX * 1000 + 80; // Range from 80 to 1080 Hz
    mainOscillator.node.frequency.value = freq.toFixed(2);
    $('#frequency').text(Math.round(freq));
  });
