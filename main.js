var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

console.log(context.destination);
