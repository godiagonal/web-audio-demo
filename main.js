var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillator = context.createOscillator();
oscillator.connect(context.destination);

oscillator.start(0);
oscillator.stop(1);
oscillator.start(2); // Nope :(
