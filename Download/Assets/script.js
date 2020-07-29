var myLoader = new loader($('#loader'));
myLoader.start();

// test: example finish after 8 secs manually
setTimeout(function() {
  
  myLoader.finish(function(){
      // callback when animation completed
      console.log('done finishing loading animation');
  });
  
}, 9000);

/**
 * Progression Bar 
 * @params <Element> $el jQuery element
 */
function loader($el) {
  var self = {
      onUpdate: function(onFinish) {
        var $percentage = $el.find('span.percentage');
        var $time = $el.find('span.time');
        var percentage = parseInt((this.target.attr('style').split(': ')[1]).split('%')[0]);
        var _elapsedTime = (!onFinish ? this._startTime + this._time : this._startTime);
        var elapsedTime = parseFloat(_elapsedTime).toFixed(2);
        $percentage.text(percentage);
        $time.text(elapsedTime);
      },
      start: function() {
          var $target = $el.find('div.progress');
          TweenMax.killTweensOf($target);
          TweenMax.set($target, {width: 0});
          TweenMax.to($target, 5, {
            width: '50%', 
            ease: Power0.easeNone, 
            onUpdate: self.onUpdate,
            onCompleteParams: [$target],
            onComplete: self.stillPending
          });
      },
      stillPending: function($target) {
          TweenMax.to($target, 15, {
            width: '90%', 
            onUpdate: self.onUpdate,
            ease: Power0.easeNone
          });
      },
      finish: function(callback) {
        var $target = $el.find('div.progress');
        TweenMax.killTweensOf($target);
        TweenMax.to($target, 0.5, {
            width: '100%', 
            onUpdate: self.onUpdate,
            onUpdateParams: [true],
            ease: Power0.easeNone,
            onComplete: callback,
            onCompleteParams: []
        });
      }
  }
  return self;
}