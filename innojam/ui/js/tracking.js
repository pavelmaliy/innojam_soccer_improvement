/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

  window.videoStuff = {
    vid: document.getElementById("video"),
    canvas: document.getElementById('canvas'),
    preffix_x: 0,
    preffix_y: 0
  };

  jQuery.extend(window.videoStuff, {
    context: window.videoStuff.canvas.getContext('2d'),
    isPlayMode: false,

    getURLParameter : function getURLParameter(name) {
      var value = (new RegExp('(\\?' + name + '=|&' + name + '=)(.+?)(&|$)', 'i').exec(location.search) || [null, null, null])[2];
      return value !== null ? decodeURIComponent(value) : undefined;
    },

    startCircle: function() {
      interval = setInterval(function () {
        window.videoStuff.circle();
      },1500);
    },

    circle: function circle() {
      var alpha = 1.0,   // full opacity
        interval = setInterval(function () {
          var centerX = 20;
          var centerY = 20  ;
          var radius = 10;

          window.videoStuff.context.beginPath();
          window.videoStuff.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
          window.videoStuff.context.fillStyle = "rgba(0, 255, 0, " + alpha + ")";
          window.videoStuff.context.fill();
          //window.videoStuff.context.lineWidth = 0;
          window.videoStuff.context.strokeStyle = '#003300';
          window.videoStuff.context.stroke();
          alpha = alpha - 0.05; // decrease opacity (fade out)

          if (alpha < 0) {
            window.videoStuff.canvas.width = window.videoStuff.canvas.width;
            clearInterval(interval);
          }

        },50);
    },

    fadeOutText: function fadeOutText(text) {
      var alpha = 1.0,   // full opacity
      interval = setInterval(function () {
        window.videoStuff.canvas.width = window.videoStuff.canvas.width; // Clears the canvas

        window.videoStuff.context.shadowColor = "black";
        window.videoStuff.context.shadowOffsetX = 10;
        window.videoStuff.context.shadowOffsetY = 10;
        window.videoStuff.context.shadowBlur = 7;
        window.videoStuff.context.font = "bold 40px 'Helvetica'";
        window.videoStuff.context.textBaseline = 'alphabetic';
        window.videoStuff.context.scale(1,1);
        window.videoStuff.context.fillStyle = "rgba(0, 255, 0, " + alpha + ")";
        window.videoStuff.context.fillText(text, 600, 50);

        /*window.videoStuff.context.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        window.videoStuff.context.font = "italic 40pt Arial";
        window.videoStuff.context.fillText(text, 400, 50);*/
        alpha = alpha - 0.05; // decrease opacity (fade out)
        if (alpha < 0) {
          window.videoStuff.canvas.width = window.videoStuff.canvas.width;
          clearInterval(interval);
        }
      },100);
    },

    playback: function() {

      //window.videoStuff.fadeOutText('Start Tracking');
      window.videoStuff.startCircle();

      window.videoStuff.vid.onplay = function onplay() {
        window.videoStuff.currentTime = parseFloat(this.currentTime.toFixed(2)) ;

        window.videoStuff.interval = setInterval(function(){
          window.videoStuff.currentTime = parseFloat(window.videoStuff.currentTime.toFixed(2));
          window.videoStuff.currentTime += 0.01;
          window.videoStuff.currentTime = parseFloat(window.videoStuff.currentTime.toFixed(2));
          var currentTime = window.videoStuff.currentTime.toFixed(2);

          if ( window.playback[currentTime] ) {
            var point = window.playback[currentTime];

            window.videoStuff.clearCanvas();
            window.paintNames(parseInt(point.x,10), parseInt(point.y,10), parseInt(point.w,10), point.name);
          }
        },10)
      };

      window.videoStuff.vid.onpause = function onpause() {
        console.log('onpause');
        window.clearInterval(window.videoStuff.interval);
      };

      window.videoStuff.vid.onseeked = function onseeked() {
        console.log('onseeked');
        window.videoStuff.currentTime = parseFloat(this.currentTime.toFixed(2));
      };

      window.videoStuff.vid.onended = function onended() {
        console.log('onended');
        window.clearInterval(window.videoStuff.interval);
      };

      window.videoStuff.vid.onerror = function onerror() {
        console.log('onerror');
        window.clearInterval(window.videoStuff.interval);
      };

      window.videoStuff.vid.onabort = function onabort() {
        console.log('onabort');
        window.clearInterval(window.videoStuff.interval);
      };
    },

    clearCanvas: function clearCanvas( ) {
      window.videoStuff.context.clearRect(0, 50, window.videoStuff.canvas.width, window.videoStuff.canvas.height);
    }
  });

  if (window.videoStuff.getURLParameter('y')) {
    window.videoStuff.preffix_y = parseInt(window.videoStuff.getURLParameter('y'),10);
  }
  if (window.videoStuff.getURLParameter('x')) {
    window.videoStuff.preffix_x = parseInt(window.videoStuff.getURLParameter('x'),10);
  }
  if (window.videoStuff.getURLParameter('dev') === 'true'){
    jQuery('.tracking-point-list').css('display','block');
  }
  if (window.videoStuff.getURLParameter('track') === 'true'){
    window.videoStuff.isPlayMode = true;
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

    if (window.videoStuff.isPlayMode) {
      window.videoStuff.playback();
      window.videoStuff.vid.pause();
      window.videoStuff.vid.play();
      return;
    }

    tracking.ColorTracker.registerColor('purple', function(r, g, b) {
      //Orange full
      var dx = r - 174;
      var dy = g - 113;
      var dz = b - 93;
      //orange
    /*
      var dx = r - 252;
      var dy = g - 142;
      var dz = b - 44;
    */
      //white
/*      var dx = r - 243;
      var dy = g - 254;
      var dz = b - 255;*/

      if ((b - g) >= 100 && (r - g) >= 60) {
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 3500;
    });

    var tracker = new tracking.ColorTracker(['purple']);
    tracker.setMinDimension(1);
    window.trackingVideo = tracking.track('#video', tracker);
    var x = 0;
    window.trackObj = {};

    tracker.on('track', function(event) {
      if (event.data.length === 0) {
        // No colors were detected in this frame.
      } else {
        jQuery('.tracking-point-list').append('<div></div><span>');
        window.videoStuff.context.clearRect(0, 0, window.videoStuff.canvas.width, window.videoStuff.canvas.height);
        var currFrame = [];
        if (event.data.length > 0) {
          trackObj[x] = currFrame;
          x++;
        }
        event.data.forEach(function(rect, index) {
          window.paintNames(rect.x, rect.y, rect.width);
          jQuery('.tracking-point-list').append('<span class="item-title" onmouseover="window.paintNamesFromRecord(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + window.videoStuff.vid.currentTime + ')" onclick="window.paintNamesClick(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + window.videoStuff.vid.currentTime + ', this)">  ' + index + '  </span>');
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
  };

    window.paintNamesFromRecord = function(x,y, width, currentTime) {
    if (window.trackingVideo) {
      window.trackingVideo.stop();
    }

    window.videoStuff.vid.pause();
    window.videoStuff.vid.currentTime = currentTime;
    window.videoStuff.context.clearRect(0, 0, window.videoStuff.canvas.width, window.videoStuff.canvas.height);
    window.videoStuff.context.font = '22px Helvetica';
    window.videoStuff.context.fillStyle = "#fff";
    window.videoStuff.context.fillText(window.videoStuff.vid.currentTime + '  [x=' + x + ',y=' + y + "]", x + width - 30, y - 30);
  };

  window.paintNames = function(x,y, width, name) {
    x += window.videoStuff.preffix_x;
    y += window.videoStuff.preffix_y;

    window.videoStuff.context.font = 'bold 22px Arial';
    window.videoStuff.context.fillStyle = "#ffffff";
    if (name) {

      window.videoStuff.context.shadowColor = "black";
      window.videoStuff.context.shadowOffsetX = 5;
      window.videoStuff.context.shadowOffsetY = 5;
      window.videoStuff.context.shadowBlur = 7;
      window.videoStuff.context.font = "bold 22px 'Helvetica'";
      window.videoStuff.context.textBaseline = 'alphabetic';
      window.videoStuff.context.scale(1,1);
      window.videoStuff.context.fillStyle = "#ffffff";
      window.videoStuff.context.fillText(name, x + width - 30, y - 30);
    } else {
      window.videoStuff.context.fillText(window.videoStuff.vid.currentTime + '  [x=' + x + ',y=' + y + "]", x + width - 30, y - 30);
    }

  }

  window.buildList = function() {
    var time = 20,
        x= 400,
        y = 400,
        w = 10;
    jQuery('.tracking-point-list').html('');
    for (var i= 0; i< 10000; i++){
      time += 0.1;
      str = '<div class="item-title" onmouseover="window.paintNamesFromRecord(' + x + ',' + y + ','  + w + ',' + time + ')" onclick="window.paintNamesClick(' + x + ',' + y + ','  + w + ',' + time + ', this)"> ' +  i + '</div> ';
      jQuery('.tracking-point-list').append(str);
    }
  }


}());

