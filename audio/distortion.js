function Distortion() {
  this.node = context.createWaveShaper();
  this.node.curve = makeDistortionCurve(10);
  this.node.oversample = '4x';

  this.connect = function(target) {
    this.node.connect(target);
  }

  this.disconnect = function() {
    this.node.disconnect();
  }
}

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50;
  var samples = 44100;
  var curve = new Float32Array(samples);
  var deg = Math.PI / 180;
  var i = 0;
  var x = 0;
  for (; i < samples; ++i) {
    x = i * 2 / samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}
