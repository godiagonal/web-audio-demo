function Delay() {
  this.input = context.createGain();
  this.output = context.createGain();

  var delay = context.createDelay();
  delay.delayTime.value = 0.4;

  var feedback = context.createGain();
  feedback.gain.value = 0.4;

  var filter = context.createBiquadFilter();
  filter.frequency.value = 1000;

  delay.connect(feedback);
  feedback.connect(filter);
  filter.connect(delay);

  this.input.connect(delay);
  this.input.connect(this.output);
  delay.connect(this.output);

  this.node = this.input;

  this.connect = function(target) {
    this.output.connect(target);
  }

  this.disconnect = function() {
    this.output.disconnect();
  }
}
