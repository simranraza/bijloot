'use strict';

/* Services */

(function() {
    var itemsFactory = function($http) {
    
        var factory = {};
        
        factory.getItemsList = function() {
            return $http.get('geo_data/geodata.json').success (function(data){
				
				console.log('from http service' + data);
				return data;
			});
        };
		
		factory.getItemDetail = function(){
			return $http.get('geo_data/geo_details.json').success (function(data){
				
				console.log('from http service 2' + data);
				return data;
			});
		};
              
        return factory;
    };
    
    itemsFactory.$inject = ['$http'];
        
    angular.module('exploreMyWorld').factory('itemsFactory', 
                                           itemsFactory);
                                           
}());

