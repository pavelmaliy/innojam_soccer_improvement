var timestamp = 0,
    timer = null,
    track = false;

window.playbackTracker = {};

function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function enableTrackMouse() {
    track = true;
    $(window.video).on('mousemove', throttle(function (event) {
        timestamp++;
        console.log(event.pageX, event.pageY, timestamp);
        //window.playbackTracker[timestamp] = [event.pageX, event.pageY, timestamp];
    }, 1000));
}

function disableTrackMouse() {
    track = false;
    window.clearTimeout(timer);
    $(window.video).off('mousemove');
}

$(document).ready(function () {

    window.video = document.getElementById("video");
    window.video.playbackRate = .2;
    window.video.play();

    window.video.onclick = function () {
        track ?
            disableTrackMouse() :
            enableTrackMouse();
    };
});
