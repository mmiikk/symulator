function Toolbox($scope){
    $scope.tools = [
        {
            'id':'step',
            'name':'step',
            'type':'step',
                
        },
        {
            'id':'scope',
            'name':'scope',
            'type':'scope',
               
        },
        {
            'id':'integrator',
            'name':'integrator',
            'type':'integrator',
               
        },
        {
            'id':'sum',
            'name':'sum',
            'type':'sum',
               
        },
        {
            'id':'feedback',
            'name':'feedback',
            'type':'feedback',
               
        },
       
    ];
     
}

$(document).ready(function(){
   $('#run').click(function(){
      $().solver('init',[jsPlumb.getAllConnections(),angular.element('[ng-controller=Page]').scope().objects]);   
   });
   $('.spacer').each(function(){
     
      $(this).draggable({
           start: function(event, ui){
               //add  temporary object to page
               angular.element('[ng-controller=Page]').scope().addTemp($(this).children()[0].id);
               $(this).children().addClass('invisible');
               
           },
           drag: function( event, ui ) {
               //update temporary object position
               
               angular.element('[ng-controller=Page]').scope().updateTemp($(this).offset());
           },
           stop: function( event, ui ) {
              
               //remove temporary objevy
               angular.element('[ng-controller=Page]').scope().removeTemp();
               
               $(this).children().removeClass('invisible');
               angular.element('[ng-controller=Page]').scope().addObject( $(this).offset(), $('#toolbox').width(), $(this).children()[0].id  );
               
                //set block to default position
               $(this).css('left','0px');
               $(this).css('top','0px');
           }
       }); 
   });
});

function Page($scope){
    $scope.objects = [
        
    ];
    
    $scope.temps = [];

    $scope.addTemp = function(name){
        var type = _.filter(angular.element('[ng-controller=Toolbox]').scope().tools,function(obj){ return obj.id == name});
        
        $scope.temps.push({
           'name':name,
           'type':type[0].type,
        });
        $scope.$apply();
    }
    
    $scope.updateTemp = function(position)
    {
        $('#temp').css({'top':position.top,'left':position.left-$('#toolbox').width()});
    }

    $scope.removeTemp = function(){
        $scope.temps = [];
        $scope.$apply();
    }
    
    $scope.addObject = function(position, toolboxWidth, id){
        
        switch (id){
            case 'step':
                    var block = new Step({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':position.left-toolboxWidth,
                                 'top':position.top,
                    });
                break;
                
            case 'scope':
                    var block = new Scope({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':position.left-toolboxWidth,
                                 'top':position.top,
                    });
                break;
            case 'integrator':
                    var block = new Integrator({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':position.left-toolboxWidth,
                                 'top':position.top,
                    });
                break;
           case 'sum':
                    var block = new Sum({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':position.left-toolboxWidth,
                                 'top':position.top,
                    });
                break;
            case 'feedback':
                    var block = new Feedback({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':position.left-toolboxWidth,
                                 'top':position.top,
                    });
                break;
           
        }
              
       
        
        $scope.objects.push( block ) ;
        console.log($scope.objects);
        $scope.$apply();
        
        block.setJsPlumb();
        console.log('a');
        block.updatePosition(); console.log('a');
        block.setConnectors();
            
                
    }
    
    $scope.updatePosition = function(top,left)
    {
        
        $('#'+getLastID()).css({'top':top,'left':left});
        
    }
   
    function getMaxID(){
        return ($scope.objects.length);
    }
    function getLastID(){
        return ($scope.objects[($scope.objects.length-1)].settings.id);
    }
    
    
    
}

jsPlumb.ready(function(){
   jsPlumb.Defaults.ConnectionOverlays =[ ["Arrow", { location:1 } ] ]; 
});

var connectorSettings = [ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ];

var positions = {
  left: [ 0, 0.4, -1, 0 ],
  right:  [ 1, 0.4, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  bottom:   [ 0.5, 1 , 0, 0],
};

var connectorPaintStyle = {
				lineWidth:4,
				strokeStyle:"#deea18",
				joinstyle:"round",
				outlineColor:"#eaedef",
				outlineWidth:2
			};