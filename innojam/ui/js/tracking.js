/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

  //jQuery('.track-player').on('click',function(){
    var vid = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    tracking.ColorTracker.registerColor('purple', function(r, g, b) {
      var dx = r - 252;
      var dy = g - 142;
      var dz = b - 44;

      if ((b - g) >= 100 && (r - g) >= 60) {
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 3500;
    });

    var tracker = new tracking.ColorTracker(['purple']);
    tracker.setMinDimension(5);

    // tracking.track('#video', tracker);
    var x = 0;
    window.trackObj = {};
    tracker.on('track', function(event) {

      context.clearRect(0, 0, canvas.width, canvas.height);
      var currFrame = [];
      trackObj[x++] = currFrame;

      event.data.forEach(function(rect) {
        currFrame.push({x: rect.x, y: rect.y, currentTime: vid.currentTime});

        if (rect.color === 'custom') {
          rect.color = tracker.customColor;
        }
        context.font = '22px Helvetica';
        context.fillStyle = "#fff";
        context.fillText(vid.currentTime + '  [x=' + rect.x + ',y=' + rect.y + "]", rect.x + rect.width - 30, rect.y - 30);
      });
    });

    jQuery('.track-player').on('click',function(){
        tracking.track('#video', tracker);
    }).bind(this);

    initGUIControllers(tracker);

  //});



}());

