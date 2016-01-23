var app = angular.module('app', ['mm.foundation','bzm-range-slider'])

app.controller('mainController',function($scope, $http) {   

    $scope.jobs = ["All Jobs","Author","Band Member"]
    $scope.selectedJob = $scope.jobs[0]
    $scope.gender = ["All Gender","Male","Female"]
    $scope.selectedGender = $scope.gender[0]
    $scope.age

    $scope.selectJob = function(job){
        $scope.selectedJob = job
        loadData()
    }
    $scope.selectGender = function(gender){
        $scope.selectedGender = gender
        loadData()
    }

    $scope.minRange = 0
    $scope.maxRange = 100

    $scope.minAge = 0
    $scope.maxAge = 100


    $scope.ageChanged = function(age,slider){
        $scope.minAge = slider.getValue(0)
        $scope.maxAge = slider.getValue(1)
        loadData()
    }   

    function loadData(){
        var data = []

        for(var i =0;i< $scope.data.length; i++){
            //if there are no filters, just take the total value
            if($scope.minAge === $scope.minRange && $scope.maxAge === $scope.maxRange && $scope.selectedGender === $scope.gender[0] && $scope.selectedJob === $scope.jobs[0]){
                data.push({
                "hc-key":$scope.data[i]["hc-key"],
                "value" :$scope.data[i].total
                })    
            }
            //else loop over values inside country objects
            else{
                var count = 0

                for(var j=0;j<$scope.data[i].value.length;j++){
                    //exit loop if maxAge is exceeded
                    if($scope.data[i].value[j].age > $scope.maxAge){
                        continue
                    }

                    //loop over age groups
                    if($scope.data[i].value[j].age >= $scope.minAge){
                        
                        //add authors
                        if($scope.selectedJob === $scope.jobs[0] || $scope.selectedJob === $scope.jobs[1]){
                            //add male authors
                            if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[1]){
                                count += $scope.data[i].value[j].author.male
                            }
                            //add female authors
                            if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[2]){
                                count += $scope.data[i].value[j].author.female
                            }
                        }
                        
                        //add band members
                        if($scope.selectedJob === $scope.jobs[0] || $scope.selectedJob === $scope.jobs[2]){
                            //add male authors
                            if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[1]){
                                count += $scope.data[i].value[j].band.male
                            }
                            //add female authors
                            if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[2]){
                                count += $scope.data[i].value[j].band.female
                            }
                        }
                    }
                }

                data.push({
                "hc-key":$scope.data[i]["hc-key"],
                "value" :count
                })   
            }
            
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