var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillator = context.createOscillator();
var gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

gain.gain.value = 1;

var on = true;
for (var i = 0; i < 20; i++) {
  gain.gain.linearRampToValueAtTime(on ? 1 : 0, i / 5);
  on = !on;
}

oscillator.start(0);
