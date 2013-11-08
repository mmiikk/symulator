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
    
    $scope.removeObject = function(id){
        var oldObjects = $scope.objects;
        //console.log(id);
        $scope.objects = [];
        angular.forEach(oldObjects, function(object) {
            //console.log(object);
            if (object.settings.id!==id) $scope.objects.push(object);
          });
        //console.log($scope.objects);
    }
    
    $scope.getEveryEndpoint = function(id){
        return _.filter($scope.objects,function(obj){return obj.settings.id===id;});        
    }
    
    $scope.addObject = function(position, toolboxWidth, id){
        //console.log(toolboxWidth);
        switch (id){
            case 'step':
                    var block = new Step({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left)-parseInt(toolboxWidth),
                                 'top':position.top,
                    });
                break;
                
            case 'scope':
                    var block = new Scope({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left)-parseInt(toolboxWidth),
                                 'top':position.top,
                    });
                break;
            case 'integrator':
                    var block = new Integrator({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left)-parseInt(toolboxWidth),
                                 'top':position.top,
                    });
                break;
           case 'sum':
                    var block = new Sum({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left)-parseInt(toolboxWidth),
                                 'top':position.top,
                    });
                break;
            case 'feedback':
                    var block = new Feedback({'id':id+getMaxID(),
                                 'name':id + ' ' + getMaxID(),
                                 'left':parseInt(position.left)-parseInt(toolboxWidth),
                                 'top':position.top,
                    });
                break;
           
        }
              
       
        
        $scope.objects.push( block ) ;
        
        $scope.$apply();
        
        block.setJsPlumb();
       
        block.updatePosition(); 
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

function Properties($scope){
    $scope.properties = [];
    
    $scope.addObject = function(obj)
    {
        $scope.properties.push(obj);
    }

}



jsPlumb.ready(function(){
   jsPlumb.Defaults.ConnectionOverlays =[ ["Arrow", { location:1 } ] ]; 
   jsPlumb.Defaults.Connector = [ "Flowchart", { stub:[40, 60], gap:1, cornerRadius:5, alwaysRespectStubs:true } ];		
});

var connectorSettings = [ "Flowchart", { stub:[100, 100], gap:1, cornerRadius:5, alwaysRespectStubs:false, midPoint: 1 } ];

var positions = {
  left: [ 0, 0.5, -1, 0 ],
  right:  [ 1, 0.5, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  bottom:   [ 0.5, 1 , 0, 1],
};

var connectorPaintStyle = {
				lineWidth:4,
				strokeStyle:"#deea18",
				joinstyle:"round",
				outlineColor:"#eaedef",
				outlineWidth:2
			};
                        
function clickable(selector){
    return function(){
        var obj = $('#page').find('#'+selector);
           obj.click(function(){
               
                if(obj.hasClass('clicked'))
                    {
                        obj.removeClass('clicked');
                        if( $('#page').find('.clicked').length === 0 )
                        {
                            $('#remove').addClass('ui-disabled');
                            $('#propertiesbtn').addClass('ui-disabled');
                        }
                    }
                else
                    {
                        obj.addClass('clicked');
                        if( $('#page').find('.clicked').length !== 0 )
                            $('#remove').removeClass('ui-disabled');
                        
                    }
                         
            });
        
    };
}

$(document).ready(function(){
    
  
   $('#remove').bind('click',function(event,ui){
       
       console.log($('#page').find('.clicked'));
       var toDelete = $('#page').find('.clicked');
       var endpoints = [];
 
       for(var i=0; i< toDelete.length; i++)
           {
               endpoints = angular.element('[ng-controller=Page]').scope().getEveryEndpoint(toDelete[i].id);
               angular.element('[ng-controller=Page]').scope().removeObject(toDelete[i].id);
               
               for(var j=0; j< endpoints[0].endpoints.length; j++)
                    jsPlumb.deleteEndpoint(endpoints[0].endpoints[j]);
               jsPlumb.detachAllConnections(toDelete[i]);
               

               $(toDelete[i]).remove();
           }
       $(this).addClass('ui-disabled');

   });
   
   
   
   $('#build').bind('click',function(event,ui){
        angular.element('[ng-controller=Page]').scope().addObject( {left:'100px',top:'100px'}, $('#toolbox').width(), 'step'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'200px',top:'100px'}, $('#toolbox').width(), 'sum'  );
      //  angular.element('[ng-controller=Page]').scope().addObject( {left:'300px',top:'100px'}, $('#toolbox').width(), 'sum'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'400px',top:'100px'}, $('#toolbox').width(), 'integrator'  );
       // angular.element('[ng-controller=Page]').scope().addObject( {left:'400px',top:'100px'}, $('#toolbox').width(), 'sum'  );
       // angular.element('[ng-controller=Page]').scope().addObject( {left:'400px',top:'200px'}, $('#toolbox').width(), 'step'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'500px',top:'100px'}, $('#toolbox').width(), 'feedback'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'600px',top:'100px'}, $('#toolbox').width(), 'integrator'  );
         angular.element('[ng-controller=Page]').scope().addObject( {left:'700px',top:'100px'}, $('#toolbox').width(), 'feedback'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'800px',top:'100px'}, $('#toolbox').width(), 'scope'  );
//angular.element('[ng-controller=Page]').scope().addObject( {left:'300px',top:'450px'}, $('#toolbox').width(), 'integrator'  );
//
//
//
//
        //jsPlumb.connect({source:'step0',target:'sum1'});
       
       jsPlumb.connect({source:angular.element('[ng-controller=Page]').scope().getEveryEndpoint('step0')[0].endpoints[0],target:angular.element('[ng-controller=Page]').scope().getEveryEndpoint('scope6')[0].endpoints[0]});
        

/*
 * 
 *  angular.element('[ng-controller=Page]').scope().addObject( {left:'100px',top:'100px'}, $('#toolbox').width(), 'step'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'200px',top:'100px'}, $('#toolbox').width(), 'sum'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'300px',top:'100px'}, $('#toolbox').width(), 'integrator'  );
       // angular.element('[ng-controller=Page]').scope().addObject( {left:'400px',top:'100px'}, $('#toolbox').width(), 'sum'  );
       // angular.element('[ng-controller=Page]').scope().addObject( {left:'400px',top:'200px'}, $('#toolbox').width(), 'step'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'500px',top:'100px'}, $('#toolbox').width(), 'feedback'  );
        angular.element('[ng-controller=Page]').scope().addObject( {left:'600px',top:'100px'}, $('#toolbox').width(), 'scope'  );
//angular.element('[ng-controller=Page]').scope().addObject( {left:'300px',top:'450px'}, $('#toolbox').width(), 'integrator'  );
 */

   });
   
   
});

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};