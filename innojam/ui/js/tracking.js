/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

  jQuery('.onDownloadArray').on('click', function(){
    var rows = [];
    jQuery('.selected-item-from-array').each(function(){
      var arr = jQuery(this).attr('onclick').substr(23).replace(', this)','').split(',');
      rows.push(arr);
      var x = arr[0];
      var y = arr[2];
      var t = arr[3];
    })
    exportToCsv('test', rows);
  });


  function exportToCsv(filename, rows) {
    var processRow = function (row) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
        var innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        };
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
          result = '"' + result + '"';
        if (j > 0)
          finalVal += ',';
        finalVal += result;
      }
      return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
    }

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
        jQuery('.tracking-point-list').append('<div></div>');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var currFrame = [];
        if (event.data.length > 0) {
          trackObj[x] = currFrame;
          x++;
        }
        event.data.forEach(function(rect, index) {
          window.paintNames(rect.x, rect.y, rect.width);
          jQuery('.tracking-point-list').append('<span class="item-title" onmouseover="window.paintNamesFromRecord(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + vid.currentTime + ')" onclick="window.paintNamesClick(' + rect.x + ',' + rect.y + ','  + rect.width + ',' + vid.currentTime + ', this)">  ' + index + '  </span>');
          /*currFrame.push({x: rect.x, y: rect.y, width: rect.width, currentTime: vid.currentTime});
          if (rect.color === 'custom') {
            rect.color = tracker.customColor;
          }
          context.font = '22px Helvetica';
          context.fillStyle = "#fff";
          context.fillText(vid.currentTime + '  [x=' + rect.x + ',y=' + rect.y + "]", rect.x + rect.width - 30, rect.y - 30);*/
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

