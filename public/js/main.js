$(function() {
  // Contact Scroll
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

     $('html, body').stop().animate({
         'scrollTop': $target.offset().top
    }, 900, 'swing');
  });

  var vid = document.getElementById("bgvid");
  var pauseButton = document.querySelector("canvas");

  function vidFade() {
    vid.classList.add("stopfade");
  }

  vid.addEventListener('ended', function()
  {
  // only functional if "loop" is removed
  vid.pause();
  // to capture IE10
  vidFade();
  });


pauseButton.addEventListener("click", function() {
  vid.classList.toggle("stopfade");
  if (vid.paused) {
    vid.play();
    pauseButton.innerHTML = "Pause";
  } else {
    vid.pause();
    pauseButton.innerHTML = "Paused";
  }
});

// dots
var canvasDots = function() {
  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      colorDot = '#00bdbf',
      color = '#00bdbf';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  ctx.fillStyle = colorDot;
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = color;

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 350,
    distance: 60,
    d_radius: 100,
    array: []
  };

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random();
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function(){
      for(i = 0; i < dots.nb; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function(){
      for(i = 0; i < dots.nb; i++){
        for(j = 0; j < dots.nb; j++){
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
      dot = dots.array[i];

      dot.create();
    }

    dot.line();
    dot.animate();
  }

  window.onmousemove = function(parameter) {
    mousePosition.x = parameter.pageX;
    mousePosition.y = parameter.pageY;
  };

  mousePosition.x = window.innerWidth / 2;
  mousePosition.y = window.innerHeight / 2;

  setInterval(createDots, 1000/30);
};

window.onload = function() {
  canvasDots();
};



  /* Google Maps */
  function initMap() {
    var LatLng = {lat: 37.782570, lng: -122.411133};
    // old latlng {lat: 37.7825699, lng: -122.4116954};

    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      zoom: 16,
      center: LatLng,
      disableDefaultUI: true,
      scrollwheel: false
    });
    map.set('styles', [
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { color: '#22313F' },
          { weight: 1.6 }
        ]
      }, {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { color: '#7090AF' },
          { weight: 0.6 },
        ]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          { color: '#1A252F'}
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]);
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map,
      title: 'Silicon Valley'
    });
  }

});
