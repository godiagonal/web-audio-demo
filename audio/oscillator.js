function Oscillator(freq, output) {
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(output);

  gain.gain.value = 0;

  oscillator.frequency.value = freq;
  oscillator.start(0);

  this.node = oscillator;

  this.start = function() {
    gain.gain.value = 1;
  }

  this.stop = function() {
    gain.gain.value = 0;
  }
}
