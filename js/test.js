function Page($scope){
    $scope.objects = [
     
      
      // scope(),
       //integrator(),
    ];
    
    $scope.addObject = function(){
                  //console.log(step);
                  console.log('a');
                  
    };
    
    $scope.solve = function(){
       var s = new Step({
           'id' : 'step1',
           'name' : 'step 1',
           'type' : 'block'
       });
       console.log(s);
       $scope.objects.push(s);
       $().solver('init',[jsPlumb.getAllConnections(),$scope.objects]);  
    
    };
    
   
    
    function scope(){
        var settings = {
            'id' : 'scope',
            'name' : 'scope',
            'type' : 'block',
            'in' : '1',
            'out' : '0',
        };
        return settings;
    }
    
     function integrator(){
        var settings = {
            'id' : 'integrator',
            'name' : 'integrator',
            'type' : 'block',
            'in' : '1',
            'out' : '1',
        };
        return settings;
    }
    
};



jsPlumb.ready(function() {
      jsPlumb.draggable('step1');
     
      jsPlumb.draggable('scope');
      jsPlumb.draggable('integrator');
     
        jsPlumb.addEndpoint('step1', {
            connector:[ "Flowchart" ],
            paintStyle:{ width:10, height:10, fillStyle:'#666' },
            //connectorOverlays:[ [ "Arrow", { width:20, length:30, location:[0.5, 1.5],  id:"arrow" } ]],
            isSource:true,
            isTarget:false,
            anchor:["RightMiddle", "Continuous"],
            
        });
       
        
        jsPlumb.addEndpoint('scope', {
            connector:[ "Flowchart" ],
            paintStyle:{ width:10, height:10, fillStyle:'#666' },
            //connectorOverlays:[ [ "Arrow", { width:20, length:30, location:[0.5, 1.5],  id:"arrow" } ]],
            isSource:false,
            isTarget:true,
            anchor:["LeftMiddle", "Continuous"],
            
        });
         jsPlumb.addEndpoint('integrator', {
            connector:[ "Flowchart" ],
            paintStyle:{ width:10, height:10, fillStyle:'#666' },
            //connectorOverlays:[ [ "Arrow", { width:20, length:30, location:[0.5, 1.5],  id:"arrow" } ]],
            isSource:false,
            isTarget:true,
            anchor:["LeftMiddle", "Continuous"],
            
        });
        
         jsPlumb.addEndpoint('integrator', {
            connector:[ "Flowchart" ],
            paintStyle:{ width:10, height:10, fillStyle:'#666' },
            //connectorOverlays:[ [ "Arrow", { width:20, length:30, location:[0.5, 1.5],  id:"arrow" } ]],
            isSource:true,
            isTarget:false,
            anchor:["RightMiddle", "Continuous"],
            
        });
       
     
});