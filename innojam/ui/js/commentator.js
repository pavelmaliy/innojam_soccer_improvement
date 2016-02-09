/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

    var trackES = new Audio('/examples/assets/trackES.mp3');
    var trackAR = new Audio('/examples/assets/trackAR.mp3');
    var trackEN = new Audio('/examples/assets/trackEN.mp3');
    var i = 0;
    var changeTrack = function() {

        if((i%3) === 0) {
            trackAR.pause();
            trackES.pause();
            trackEN.play();
        } else if ((i%3) === 1){
            trackAR.pause();
            trackES.play();
            trackEN.pause();
        } else {
            trackAR.play();
            trackES.pause();
            trackEN.pause();
        }
        i++;
    }

  jQuery('.change-commentator').on('click',function() {
      changeTrack();
  }).bind(this);

}());
