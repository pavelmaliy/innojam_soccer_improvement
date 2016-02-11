/**
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 * Created by I062070 on 10/02/2016.
 */
(function () {

  var video,
    canvas,
    context,
    tracker,
    names = ['Pavel Maliy', 'Brad Pitt'];

  jQuery(document).on('keydown', function (e) {
    var iframe = $('iframe[id^="twitter-widget"]'),
      offset = iframe.offset();

    if ((offset.left === 60 || offset.left === 240) && e.keyCode === 27) {
      jQuery('.live-twits').trigger('click');
    }
  });

  jQuery('.live-twits').off('click').on('click', function () {

    var left = 240;
    if ($('body').hasClass('sidebar-collapse')) {
      left = 60;
    }

    var iframe = $('iframe[id^="twitter-widget"]'),
      offset = iframe.offset();

    if (offset.left === 60 || offset.left === 240) {
      left = -600;
    }

    iframe.animate({left: left}, 'fast');
  });

  jQuery('.live-recognition').on('click', function () {
    jQuery('.live-demo-content').show();
    jQuery('.video').hide();
    loadCamera();

  }.bind(this));

  jQuery('.demo-recognition').on('click', function () {
    fakeDemo();
  }.bind(this));

  function loadCamera() {
    video = document.getElementById('videoLive');
    canvas = document.getElementById('canvasLive');
    context = canvas.getContext('2d');

    tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#videoLive', tracker, {camera: true});
    var x = names;
    tracker.on('track', function (event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var counter = 0;
      event.data.forEach(function (rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.fillStyle = "#fff";
        var name = names[counter % 2];
        context.font = '16px Helvetica';
        context.fillText(name, rect.x + rect.width / 3, rect.y - 11);
        counter++;
      });
    });
  }

  function fakeDemo() {
    tracker.removeAllListeners();
    var counter = 0;
    setInterval(fakeFaceDetection, 2000);

    function fakeFaceDetection() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(draw, 1);
    }

    function draw() {
      context.font = '16px Helvetica';
      context.strokeStyle = '#a64ceb';
      context.fillStyle = "#fff";
      detectFace(0, 60, 50);
      detectFace(1, 180, 50);
    }

    function detectFace(faceIndex, x, y) {
      var delta = counter % 7;
      context.fillText(names[faceIndex], x, y);
      context.strokeRect(x - 10 + delta, 60 + delta, 70 + delta, 90 + delta);
      counter = counter + 3;
    }
  }


}())
