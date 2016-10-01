angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.qRScannerDefault', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/qRScannerDefault.html',
        controller: 'qRScannerDefaultCtrl'
      }
    }
  })

  .state('tabsController.locationDefaultPage', {
    url: '/page3',
    views: {
      'tab1': {
        templateUrl: 'templates/locationDefaultPage.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tabsController.discoverDefaultPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/discoverDefaultPage.html',
        controller: 'discoverDefaultPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/page2')

  

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  console.log("HAHAHA");
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var latLng2 = new google.maps.LatLng(3.05982300, 101.61672300);
    var latLng3 = new google.maps.LatLng(3.06382400, 101.61621800);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    console.log($scope.map);
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      var marker2 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng2
      });  

      var marker3 = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng3
      });        

      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      var infoWindow2 = new google.maps.InfoWindow({
          content: "D'Kaffe"
      });

      var infoWindow3 = new google.maps.InfoWindow({
          content: "Subway"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

      google.maps.event.addListener(marker2, 'click', function () {
          infoWindow2.open($scope.map, marker2);
      });

      google.maps.event.addListener(marker3, 'click', function () {
          infoWindow3.open($scope.map, marker3);
      });

    });

  }, function(error){
    console.log("Could not get location");
  });
});



