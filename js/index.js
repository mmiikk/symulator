function Toolbox($scope){
    $scope.tools = [
        {
            'id':'step',
            'name':'step',
            'type':'block',
                
        },
        {
            'id':'scope',
            'name':'scope',
            'type':'block',
               
        }
       
    ];
     
}

$(document).ready(function(){
    
   $('.spacer').each(function(){
     
      $(this).draggable({
           start: function(event, ui){
               //add  temporary object to page
               angular.element('[ng-controller=Page]').scope().addTemp($(this).children()[0].id,'block');
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

    $scope.addTemp = function(name,type){
        $scope.temps.push({
           'name':name,
           'type':type,
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
           
        }
              
       
        
        $scope.objects.push( block.settings ) ;
        $scope.$apply();
        
        block.setJsPlumb();
        block.updatePosition();
        block.setConnectors();
            
                
    }
    
    $scope.updatePosition = function(top,left)
    {
        console.log($scope.objects[0].id);
        $('#'+getLastID()).css({'top':top,'left':left});
        
    }
   
    function getMaxID(){
        return ($scope.objects.length);
    }
    function getLastID(){
        return ($scope.objects[($scope.objects.length-1)].id);
    }
    
    
    
}

var connectorSettings = [ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ];