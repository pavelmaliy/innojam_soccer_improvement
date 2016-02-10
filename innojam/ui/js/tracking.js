/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

  window.videoStuff = {};

  window.videoStuff.playback = function() {
    var vid = document.getElementById("video");

    vid.onplay = function onplay() {
      console.log('onplay');
      window.videoStuff.currentTime = parseFloat(this.currentTime.toFixed(2)) ;

      window.videoStuff.interval = setInterval(function(){
        window.videoStuff.currentTime = parseFloat(window.videoStuff.currentTime.toFixed(2));
        window.videoStuff.currentTime += 0.01;
        var currentTime = window.videoStuff.currentTime.toString();

        if (window.playback[currentTime]) {
          var point = window.playback[currentTime];
          console.log('>>>', point);
          window.clearCanvas();
          window.paintNames(parseInt(point.x,10), parseInt(point.y,10), parseInt(point.w,10));
        }
      },10)
    };

    vid.onpause = function onpause() {
      console.log('onpause');
      window.clearInterval(window.videoStuff.interval);
    };

    vid.onseeked = function onseeked() {
      window.videoStuff.currentTime = parseFloat(this.currentTime.toFixed(2));
    };

    vid.onended = function onended() {
      console.log('onended');
      window.clearInterval(window.videoStuff.interval);
    };

    vid.onerror = function onerror() {
      console.log('onerror');
      window.clearInterval(window.videoStuff.interval);
    };

    vid.onabort = function onabort() {
      console.log('onabort');
      window.clearInterval(window.videoStuff.interval);
    };
  }

  if (window.location.search.substring(1).indexOf('dev=true') >= 0){
    jQuery('.tracking-point-list').css('display','block');
  }


  if (window.location.hash.substring(1).indexOf('play=true') >= 0){
    window.videoStuff.playback();
  }


  jQuery('.onDownloadArray').on('click', function(){
    var jsonObj = {};
    jQuery('.selected-item-from-array').each(function(){
      var arr = jQuery(this).attr('onclick').substr(23).replace(', this)','').split(',');
      var x = arr[0],
        y = arr[1],
        w = arr[2],
        t = arr[3];
      t = parseFloat(t).toFixed(2);
      var obj = {};
      jsonObj[t] = {x:x, y:y, w:w, name: "Ronaldo"};
    });
    exportToCsv('test', JSON.stringify(jsonObj));
  });

  function exportToCsv(filename, content) {
    var csvFile = "window.playback = " + content;
    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }


  jQuery('.track-player').on('click',function(){
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
    tracker.setMinDimension(10);
    window.trackingVideo = tracking.track('#video', tracker);
    var x = 0;
    window.trackObj = {};

    tracker.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        jQuery('.tracking-point-list').append('<div></div><span>');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var currFrame = [];
        if (event.data.length > 0) {
          trackObj[x] = currFrame;
          x++;
        }
        event.data.forEach(function(rect, index) {
          window.paintNames(rect.x, rect.y, rect.width);
          jQuery('.tracking-point-list').append('<span class="item-title" onmouseover="window.paintNamesFromRecord(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + vid.currentTime + ')" onclick="window.paintNamesClick(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + vid.currentTime + ', this)">  ' + index + '  </span>');
        });
      }

    });
    //initGUIControllers(tracker);
  });


  window.paintNamesClick = function(x,y, width, currentTime, obj) {
    if (jQuery(obj).hasClass('selected-item-from-array')) {
      jQuery(obj).removeClass('selected-item-from-array');
    } else {
      jQuery(obj).addClass('selected-item-from-array');
    }
    console.log('>>>>',obj);
  };

  window.clearCanvas = function clearCanvas( ) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

    window.paintNamesFromRecord = function(x,y, width, currentTime) {
    window.trackingVideo.stop();
    var canvas = document.getElementById('canvas');
    var vid = document.getElementById('video');
    var context = canvas.getContext('2d');
    vid.pause();
    vid.currentTime = currentTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '22px Helvetica';
    context.fillStyle = "#fff";
    context.fillText(vid.currentTime + '  [x=' + x + ',y=' + y + "]", x + width - 30, y - 30);
  };

  window.paintNames = function(x,y, width) {
    var canvas = document.getElementById('canvas');
    var vid = document.getElementById('video');
    var context = canvas.getContext('2d');

    context.font = '22px Helvetica';
    context.fillStyle = "#fff";
    context.fillText(vid.currentTime + '  [x=' + x + ',y=' + y + "]", x + width - 30, y - 30);
  }


}());

