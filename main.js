var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillator = context.createOscillator();
var gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

gain.gain.value = 1;
gain.gain.setValueAtTime(0, 3);

oscillator.start(0);
