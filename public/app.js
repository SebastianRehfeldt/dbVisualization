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
            
            var count = 0
							var country = $scope.data[i]["hc-key"]
							var totalActorInCountry = $scope.data[i].total.female + $scope.data[i].total.male
							var totalInput = 0

            for(var j=0;j<$scope.data[i].value.length;j++){
                //exit loop if maxAge is exceeded
                if($scope.data[i].value[j].age > $scope.maxAge){
                    continue
                }

                //loop over age groups
                if($scope.data[i].value[j].age >= $scope.minAge){

											//add authors
                    if($scope.selectedJob === $scope.jobs[0] || $scope.selectedJob === $scope.jobs[1]){
                        // var overall = $scope.data[i].value[j].author.total
                        // var pMale = 0;
                        //add male authors
                        if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[1]){
                            // count += $scope.data[i].value[j].author.male
															count += ( $scope.data[i].value[j].author.male / totalActorInCountry ) * 100
															totalInput += $scope.data[i].value[j].author.male
                        }
                        //add female authors
                        if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[2]){
                            // count += $scope.data[i].value[j].author.female
															count += ( $scope.data[i].value[j].author.female / totalActorInCountry ) * 100
															totalInput += $scope.data[i].value[j].author.female
                        }
                    }

                    //add band members
                    if($scope.selectedJob === $scope.jobs[0] || $scope.selectedJob === $scope.jobs[2]){
                        //add male authors
                        if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[1]){
                            // count += $scope.data[i].value[j].band.male
															count += ( $scope.data[i].value[j].band.male / totalActorInCountry ) * 100
															totalInput += $scope.data[i].value[j].band.male
                        }
                        //add female authors
                        if($scope.selectedGender === $scope.gender[0] || $scope.selectedGender === $scope.gender[2]){
                            // count += $scope.data[i].value[j].band.female
															count += ( $scope.data[i].value[j].band.female / totalActorInCountry ) * 100
															totalInput += $scope.data[i].value[j].band.female
                        }
                    }
                }
            }
							if(country == 'us')
								console.log(totalActorInCountry, totalInput)

            data.push({
            "hc-key":$scope.data[i]["hc-key"],
            "value" : count
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


    // $http.get('demoData.json').success(function(response) {
    //     $scope.data = response
		// 		console.log(response)
    //     loadData()
    // })
		$http.get('actors_and_side_jobs.json').success(function(response) {
        $scope.data = response
				console.log(response)
        loadData()
    })

})

function p2f(percentage){
  var p = percentage.replace('%', '')
  p = parseInt(p)
  return (p / 100)
}
