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

    $scope.minRange = 0
    $scope.maxRange = 100

    $scope.minAge = 0
    $scope.maxAge = 100


    $scope.ageChanged = function(age,slider){
        $scope.minAge = slider.getValue(0)
        $scope.maxAge = slider.getValue(1)
    }   

    function loadData(){
        var data = []

        for(var i =0;i< $scope.data.length; i++){
            data.push({
                "hc-key":$scope.data[i]["hc-key"],
                "value" :$scope.data[i].total
                })
        }

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
                name: 'Side Jobs',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false
                }
            }]
        })
    }


    $http.get('demoData.json').success(function(response) {
        $scope.data = response
        loadData()
    })
 
})