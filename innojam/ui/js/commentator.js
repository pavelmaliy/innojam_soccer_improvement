/**
 * Created by I022096 on 09/02/2016.
 */
(function(){

    var shlomi = new Audio('/examples/assets/shlomi.mp3');
    var muhamad = new Audio('/examples/assets/muhamad.mp3');
    var live = new Audio('/examples/assets/live.mp3');
    var meir = new Audio('/examples/assets/meir.mp3');
    live.play();
  jQuery('.live').on('click',function() {
      muhamad.pause();
      shlomi.pause();
      meir.pause();
      live.play();
  }).bind(this);

  jQuery('.shlomi').on('click',function() {
      muhamad.pause();
      shlomi.play();
      meir.pause();
      live.pause();
  }).bind(this);

  jQuery('.muhamad').on('click',function() {
      muhamad.play();
      shlomi.pause();
      meir.pause();
      live.pause();
  }).bind(this);

  jQuery('.meir').on('click',function() {
    window.videoStuff.vid.currentTime = 40;
    muhamad.pause();
    shlomi.pause();
    live.pause();
    meir.play();
  }).bind(this);

  jQuery('.mute').on('click',function() {
      muhamad.pause();
      shlomi.pause();
      live.pause();
      meir.pause();
  }).bind(this);

}());
