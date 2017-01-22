var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillator = context.createOscillator();
var gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

gain.gain.value = 0;

oscillator.type = 'sine'; // sine, triangle, square, sawtooth
oscillator.frequency.value = 330;
oscillator.start(0);

$('body')
  .on('mousedown', function() {
    gain.gain.value = 1;
  })
  .on('mouseup', function() {
    gain.gain.value = 0;
  });
