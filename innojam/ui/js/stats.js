jQuery('.ronstats').on('click',function () {
  if (!!window.overlayActive) {
    $(".overlay_parent").html('');
    window.overlayActive = false;
    return;
  }
  window.overlayActive = true;
  $(".overlay_parent").html('<div class="overlay"><div class="face"><img src="/ui/dist/img/ronaldo.gif"/></div><div class="statsparent"><div class="ball" style="text-align: center"><img height="90px" src="/ui/dist/img/football.gif"/></div><div class="typed"></div></div></div>');
  $('.ball').hover(function () {
    $(this).addClass('magictime puffIn');
  });
  $(".typed").typed({
    strings: ['<h1>Cristiano Ronaldo</h1><p>Goals: 1 </p><p>Assists: 1</p><p> Distance covered: 1500m</p><div class="stats"></div>'],
    typeSpeed: 0,
    callback : function() {
      $(".stats").typed({
        strings: ['<div class="stamina"><div style="float:left; color:white; padding:15px 15px 0px 30px">Stamina</div><div id="staminabar" class="progbar" style="overflow: hidden;"></div></div><div class="accuracy"></div>'],
        callback: function() {
          var startColor = '#FC5B3F';
          var endColor = '#6FD57F';

          var element = document.getElementById('staminabar');
          var circle = new ProgressBar.Circle(element, {
            color: startColor,
            trailColor: '#eee',
            trailWidth: 1,
            duration: 2000,
            easing: 'bounce',
            strokeWidth: 5,
            svgStyle: {

            },
            text: {
              className: "staminaTxt",
              value: "75%",
              style: {
                color: "green",
                width: "auto"
              }
            },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
            }
          });

          circle.animate(0.75, {
            from: {color: startColor},
            to: {color: endColor}
          });

          var stamina = 75;
          setInterval(function() {
            circle.animate(--stamina / 100, {
              from: {color: startColor},
              to: {color: endColor  }
            }, function () {
              circle.setText(stamina + "%");
            });

          }, 3000);

          $(".accuracy").typed({
            strings: ['<div style="float:left; color:white; padding:15px 15px 0px 30px">Shot Accuracy</div><div id="accubar" style="overflow: hidden;" class="progbar"></div>'],
            callback: function() {
              var startColor = '#FC5B3F';
              var endColor = '#FF7C26';

              var element = document.getElementById('accubar');
              var circle = new ProgressBar.Circle(element, {
                color: startColor,
                trailColor: '#eee',
                trailWidth: 1,
                duration: 2000,
                easing: 'bounce',
                strokeWidth: 5,
                svgStyle: {

                },
                text: {
                  className: "staminaTxt",
                  value: "42%",
                  style: {
                    color: "orange",
                    width: "auto"
                  }
                },
                // Set default step function for all animate calls
                step: function(state, circle) {
                  circle.path.setAttribute('stroke', state.color);
                }
              });

              circle.animate(0.42, {
                from: {color: startColor},
                to: {color: endColor}
              });
            }
          })
        }
      })
    }
  });


});
