var app = angular.module('app', ['mm.foundation','bzm-range-slider'])

app.controller('mainController',function($scope, $http) {   

    $scope.jobs = ["All Jobs","Author","Band Member"]
    $scope.selectedJob = $scope.jobs[0]
    $scope.gender = ["All Gender","Male","Female"]
    $scope.selectedGender = $scope.gender[0]
    $scope.age

    $scope.selectJob = function(job){
        $scope.selectedJob = job
    }
    $scope.selectGender = function(gender){
        $scope.selectedGender = gender
    }

    $scope.minAge = 0
    $scope.maxAge = 100
    $scope.ageChanged = function(age,slider){
        console.log(slider.getValue(0))
        console.log(slider.getValue(1))
    }

    $http.get('demoData.json').success(function(response) {

        var data = response

        // Initiate the chart
        $('#container').highcharts('Map', {

            title : {
                text : ''
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0
            },

            series : [{
                data : data,
                mapData: Highcharts.maps['custom/world'],
                joinBy: 'hc-key',
                name: 'Random data',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
        })

    })    
})