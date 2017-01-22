var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var oscillator = context.createOscillator();
var gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

gain.gain.value = 0;

oscillator.start(0);

setNote('A4');

function setNote(note) {
  var freq = teoria.note(note).fq();
  oscillator.frequency.value = freq;
  $('#frequency').text(note + ' | ' + freq.toFixed(2));
}

$(document)
  .on('keydown', function(e) {
    if (keyNotes[e.keyCode]) {
      gain.gain.value = 1;
      setNote(keyNotes[e.keyCode]);
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
