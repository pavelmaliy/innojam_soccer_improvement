/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

    var trackES = new Audio('/examples/assets/trackES.mp3');
    var trackAR = new Audio('/examples/assets/trackAR.mp3');
    var trackEN = new Audio('/examples/assets/trackEN.mp3');

  jQuery('.live').on('click',function() {
      trackAR.pause();
      trackES.pause();
      trackEN.play();
  }).bind(this);

  jQuery('.shlomi').on('click',function() {
      trackAR.pause();
      trackES.play();
      trackEN.pause();
  }).bind(this);

  jQuery('.muhamad').on('click',function() {
      trackAR.play();
      trackES.pause();
      trackEN.pause();
  }).bind(this);

  jQuery('.mute').on('click',function() {
      trackAR.pause();
      trackES.pause();
      trackEN.pause();
  }).bind(this);

}());
