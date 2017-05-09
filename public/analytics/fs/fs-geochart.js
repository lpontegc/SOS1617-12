/* global angular */

angular.
module("sos1617-12-app")
    .controller("FSGeoCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("GeoChart controller for FS initilized");
        $scope.apikey = "1234";

        $http.get("/api/v1/free-software-stats?apikey=" + $scope.apikey).then(function(response) {
            google.charts.load('current', {
                'packages': ['geochart']
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var myData = [
                    ['Province', 'Year', 'Diffusion']
                ];

                response.data.forEach(function(d) {
                    myData.push([d.province, d.year, d.diffusion]);
                });

                console.log(myData);

                var data = google
                    .visualization
                    .arrayToDataTable(myData);

                var options = {
                    region: 'ES',
                    displayMode: 'markers',
                    colorAxis: {
                        colors: ['red', 'yellow']
                    },
                    resolution: 'provinces'
                };

                var chart = new google.visualization.GeoChart(
                    document.getElementById('map'));

                chart.draw(data, options);

            }
        });
    }]);