var vm = new Vue({
  el: 'body',
  data: {
    text: null,
    marker: []
  },
  methods: {
    getData: function(input){
      var self = this;

      self.marker = [];

      this.$http({url: '//cdn.rawgit.com/mledoze/countries/master/dist/countries.json', method: 'GET'})
      .then(function (response) {
            console.log(response);
            response.data
            .filter(function(i){
              if(input) return i.capital.search(new RegExp(input,'i')) != -1;
              return i.latlng[0] != null || i.latlng[1] != null;
            })
            .forEach(function(x){
              self.marker.push({
                title: x.capital,
                lat: x.latlng[0],
                lng: x.latlng[1]
              })
            });
        }, function (response) {
            console.error('Server connection error');
        });
    }
  },
  ready: function(){
    this.getData(null);
  }
});
var app = {
  init: function(){
    this.map.initialize();
  },
  map: {
    map: null,
    markers: [],
    image: null,
    initialize: function(){
      var self = this;

      self.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: -33.9, lng: 151.2}
              });

              self.setMarker();
    },
    setMarker: function(){
      var self = this;

      var unsetMarkers = function(){
        if (self.markers.length > 0){
          for(var i=0;i<self.markers.length;i++){
            self.markers[i].setMap(null);
          }
          self.markers = [];
        }
      };

      self.image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
        vm.$watch('text', function(val){
          if (self.markers.length > 0){
            for(var i=0;i<self.markers.length;i++){
              self.markers[i].setMap(null);
            }
            self.markers = [];
          }
          this.getData(val);
        });
        var callback = self.callback();
        vm.$watch('marker',function(val){
          unsetMarkers();
          val.forEach(callback.bindMarkers);
        },{ deep: true});
        var marker = vm.$get('marker');
        marker.forEach(callback.bindMarkers);
      },
      callback: function(){
        return {
          bindMarkers: function(data){
            var marker = new google.maps.Marker({
              position: {lat: data.lat, lng: data.lng},
              map: app.map.map,
              icon: app.map.image,
              title: data.title,
              zIndex: data.z,
            });
            app.map.markers.push(marker);
            (function(_marker, self){
              google.maps.event.addListener(_marker, 'mouseover', function(){
                var boxText = document.createElement("div");
                boxText.style.cssText = "height: 224px; width: 224px; background: #FFF; border-radius:50%; position: relative;";
                boxText.innerHTML = "<div class='mapWinWrapper'>" +
                "<div class='mapWinName'>" + data.title + "</div>" +
                "</div>";

                var myOptions = {
                    content: boxText,
                    pixelOffset: new google.maps.Size(-140, -280),
                    boxStyle: {},
                    closeBoxURL: "",
                    infoBoxClearance: new google.maps.Size(1, 1)
                };

                self.infoWindow = new InfoBox(myOptions);
                self.infoWindow.open(self.map, _marker);

                google.maps.event.addListener(_marker, 'mouseout', function() {
                    self.infoWindow.close();
                });
              });
            })(marker, app.map);
          }
        };
      }
    }
};
var App = Object.create(app);
App.init();
