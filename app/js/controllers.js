'use strict';

/* Controllers */

(function() {
    
    var ItemsController = function ($scope,$routeParams, $log, $filter, itemsFactory, appSettings) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.items = [];
        $scope.appSettings = appSettings;
        
        function init() {
			var param1 = $routeParams.parentId;
			var filteredList;
			console.log('value in param is: ' + param1);
            itemsFactory.getItemsList()
                .then(function(response) {
					filteredList = $filter('filter')(response.data, function (d) {return d.parentid == param1;});
					console.log('Filtered Data: '+ filteredList);
					
					checkLastNode(filteredList,response.data);
					
                    $scope.items = filteredList;
					$scope.orderProp = 'name';
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        }
		
		function checkLastNode(filteredList,mainList)
		{
			for (var obj in filteredList)
			{
				var pitemid = filteredList[obj].itemid;
				var isLastNode = false;
				for (var obj2 in mainList)
				{
					if (mainList[obj2].parentid == pitemid )
						isLastNode = true;
				}
				filteredList[obj].islastnode = isLastNode;
				console.log('obj= ' + angular.toJson(filteredList[obj]));
			}
			return filteredList;
		}
        
        init();
        
        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };
    };
    
    ItemsController.$inject = ['$scope','$routeParams', '$log','$filter', 'itemsFactory', 
                                   'appSettings'];

    angular.module('exploreMyWorld')
      .controller('ItemsController', ItemsController);
    
}());

/////////////////////////////////////////////////
(function() {
	
	var DetailsController = function ($scope,$routeParams, $log, itemDetailFactory, appSettings) {
        $scope.itemDetail = [];
        $scope.appSettings = appSettings;
		
	function init(){
		var param1 = $routeParams.itemId;
		
		itemsFactory.getItemDetail()
			.then(function(response){
				
				$scope.itemDetail= response.data;
			},function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                
			});
		
	}

	init();
	
	};
	
	DetailsController.$inject = ['$scope','$routeParams', '$log', 'itemDetailFactory', 
                                   'appSettings'];
								   
	angular.module('exploreMyWorld')
      .controller('DetailsController', DetailsController);
}());

