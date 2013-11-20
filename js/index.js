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
    
    $scope.getObject = function(id){
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
    
    
    $scope.updateScope = function(id, parameters)
    {
        //$scope.$watch();
        console.log(parameters);
        console.log(id);
        angular.forEach($scope.objects, function(object) {
           
            if (object.settings.id===id) {
                console.log(object);
                console.log(parameters);
                if(object.settings.type!=='sum')
                {
                    object.previousValues = parameters;
                    
                }
                else
                {
                    console.log(object.parameters[0]);
                   object.parameters[0] = $.extend({},object.parameters[0],parameters);
                }
                console.log(object);
               
                object.updateParameters();
                
            }
        });
        
        $scope.$apply();
        console.log($scope.objects);
        
    }
    
  
  
    function getMaxID(){
        return ($scope.objects.length);
    }
    function getLastID(){
        return ($scope.objects[($scope.objects.length-1)].settings.id);
    }
    
    
    
}



function changeStringToArray(string){
   
        var s = string.split(',',4);
        s = s.map(function(e) { return parseFloat(e) });
       
        return positions[findPositionByValue(s)];
}

function Form($scope){
    $scope.inputs = [];
    
    $scope.addInput = function(type,parameter) {
        $scope.inputs.push({type:type,value:parameter.value,id:'I'+parameter.id});
        $scope.$apply();
        
    }
    
    $scope.submit = function()
    {
        console.log('a');
        var parameters = {};
        var subparameters = {'func':[],'value':[],};
        var objectToReplaceId = $('#propertiesForm2').attr('data-id');
        
        $('#propertiesForm2 :input').each(function(){
            //console.log($(this));
            if( $(this).attr('type') !== 'submit')
            {
                console.log($(this).attr('type'));
                console.log($(this).attr('data-input-name'));
                if( $(this).attr('type') === 'text' && $(this).attr('data-input-name') === 'ItextPositionsIn')
                {
                    if($(this).val()!=='')
                    {
                        var func = '';
                        var positionsInOrder = [];
                        var step = 0;
                        
                        
                        for(var key in positions) {
                            positionsInOrder.push(positions[key]);                          
                        }
                        switch ($(this).val().length){
                            case 1:
                                step = 8;
                                break;
                            case 2:
                                step = 4;
                                break;
                            case 3: 
                                step = 2;
                                break;
                            default:
                                step = 2;
                                break;
                            }
                        
                        for(var i = 0 ; i < $(this).val().length ; i++){
                            if($(this).val().substring(i,i+1)==='+')
                                subparameters.func.push('add');
                            else if ($(this).val().substring(i,i+1)==='-')
                                subparameters.func.push('sub');
                        }
                            console.log(subparameters);
                            console.log($(this).val().length);
                            console.log(positionsInOrder.length);
                        for(var i = 0 ; i < 5 ; i=i+step){
                            subparameters.value.push(positionsInOrder[i]);
                             console.log(positionsInOrder[i]);
                        }
                        if ($(this).val().length > 3 ){
                            var j = 1;
                            for(var i = 3 ; i < $(this).val().length ; i++){
                                subparameters.value.push(positionsInOrder[j]);
                                j = j+2;
                            }
                        }
                   
                    }
                       
                    //console.log($(this));
                    //$('.ui-dialog').dialog('close');
                }
                else if( $(this).attr('type') !== 'checkbox' )
                    parameters[$(this).attr('id')]=$(this).val();
                
                
            }
          
        });
        console.log(subparameters);
        if(subparameters.func.length > 0)
            parameters = $.extend({}, parameters, subparameters);
        
        console.log(parameters);
        $scope.inputs = [];
        $scope.$apply();
        angular.element('[ng-controller=Page]').scope().updateScope(objectToReplaceId, parameters);
        $('.ui-dialog').dialog('close');
       // $('.ui-dialog').dialog('close');
    }
    
}




jsPlumb.ready(function(){
   jsPlumb.Defaults.ConnectionOverlays =[ ["Arrow", { location:1 } ] ]; 
   jsPlumb.Defaults.Connector = [ "Flowchart", { stub:[40, 60], gap:1, cornerRadius:5, alwaysRespectStubs:true } ];		
});

var connectorSettings = [ "Flowchart", { stub:[100, 100], gap:1, cornerRadius:5, alwaysRespectStubs:false, midPoint: 1 } ];

var positions = {
  
  left: [ 0, 0.5, -1, 0 ],
  leftBottom: [ 0.15, 0.85, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  leftTop: [ 0.15, 0.15, -1, 0 ],
  bottom:   [ 0.5, 1 , 0, 1],
  rightBottom: [ 0.85, 0.85, -1, 0 ],
  right:  [ 1, 0.5, 1, 0 ],
  rightTop: [ 0.85, 0.15, -1, 0 ],
  
  
  
};

function findPositionByValue(val)
{
   
           
    for(var key in positions) {
        if(_.isEqual(val, positions[key]))
        {
            return key;
        }
    }
    return false;
}

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
              console.log('c');
                if(obj.hasClass('clicked'))
                    {
                        obj.removeClass('clicked');
                        
                        if( $('#page').find('.clicked').length === 0 )
                            $('#remove').addClass('ui-disabled');
                           
                        if( $('#page').find('.clicked').length === 1)
                        {
                            $('#propertiesbtn').removeClass('ui-disabled');
                             console.log('b');
                           // buildProperties();
                        }
                        else
                            $('#propertiesbtn').addClass('ui-disabled');
                    }
                else
                    {
                        obj.addClass('clicked');
                        if( $('#page').find('.clicked').length !== 0 )
                        {
                            $('#remove').removeClass('ui-disabled');
                            if( $('#page').find('.clicked').length === 1)
                            {
                                $('#propertiesbtn').removeClass('ui-disabled');
                                console.log('a');
                               // buildProperties();
                                console.log('a');
                            }
                            else
                                $('#propertiesbtn').addClass('ui-disabled');
                                    
                        }
                        
                    }
                         
            });
        
    };
}

function buildProperties()
{
      var element = $('#page').find('.clicked');
       console.log(element);
         
       var a = angular.element('[ng-controller=Page]').scope().getObject(element.attr('id'));
       angular.element('[ng-controller=Properties]').scope().addObject(a[0]);
       
       var a = $('#properties').find(':input');
}


$(document).ready(function(){
    // Dialog opened 
    $('#properties').on("pageshow", function() {
        
        
        
       // console.log(angular.element('[ng-controller=Form]').scope());
        $('#propertiesForm2').trigger('create');
    });

    // Dialog closed 
    $('#properties').on("pagehide", function() {
        //console.log(angular.element('[ng-controller=Page]').scope());
        //
        //alert("Closed");
       var blockId = $('#page').find('.clicked').attr('id');
       var obj = angular.element('[ng-controller=Page]').scope().getObject(blockId);
       if(obj[0].settings.type==='sum')
       obj[0].setConnectors();
    });

  
   $('#remove').bind('click',function(event,ui){
       
       console.log($('#page').find('.clicked'));
       var toDelete = $('#page').find('.clicked');
       var endpoints = [];
 
       for(var i=0; i< toDelete.length; i++)
           {
               endpoints = angular.element('[ng-controller=Page]').scope().getObject(toDelete[i].id);
               angular.element('[ng-controller=Page]').scope().removeObject(toDelete[i].id);
               
               for(var j=0; j< endpoints[0].endpoints.length; j++)
                    jsPlumb.deleteEndpoint(endpoints[0].endpoints[j]);
               jsPlumb.detachAllConnections(toDelete[i]);
               

               $(toDelete[i]).remove();
           }
       $(this).addClass('ui-disabled');

   });
   
 
   $('#propertiesbtn').bind('click',function(event,ui){
       var blockId = $('#page').find('.clicked').attr('id');
       var obj = angular.element('[ng-controller=Page]').scope().getObject(blockId);
       
       
       
       var parameter = null;
       for(var i=0;i<obj[0].parameters.length;i++)
       {
           parameter = obj[0].parameters[i];
           console.log(obj);
           $('#propertiesForm2').append('<label for="'+ parameter.id+'">'+ parameter.label+'</label>');
           if( parameter.type === 'range')
               angular.element('[ng-controller=Form]').scope().addInput('range',parameter);
               
           
           if( parameter.type === 'textPositionsIn')
           {
               var func = '';
               var index = -1;
               var i=1;
               var inputs = '';
               
               for(var key in positions) {
                                    
                   index = parameter.value.indexOf(positions[key]);
                   
                   if(index !== -1)
                   {
                       func = parameter.func[index];
                       if (func === 'add')
                           inputs += '+';
                       else if (func === 'sub')
                           inputs += '-';
                       //inputs += func;
                   }
                   else
                   {
                       func = '';
                       //inputs += '0';
                   }
                   
                   
                 
                   
               }
              
              
               parameter.value = inputs;
               
               console.log(parameter);
               angular.element('[ng-controller=Form]').scope().addInput('text',parameter);
             
           }
         
           
           
       }
      
       $('#propertiesForm2').attr('data-id',blockId);
       
      
       $("#propertiesForm2").trigger('create');
       
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
       
       jsPlumb.connect({source:angular.element('[ng-controller=Page]').scope().getObject('step0')[0].endpoints[0],target:angular.element('[ng-controller=Page]').scope().getObject('scope6')[0].endpoints[0]});
        

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