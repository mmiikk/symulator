var Scope = function(config){
    var settings = {
        'id' : 'scope',
        'name' : 'scope',
        'type' : 'block',
        'in' : '1',
        'out' : '0',
        'left' : '0',
        'top' : '0',


    };
    this.settings = $.extend({},settings,config);
        
}

Scope.prototype.outputValue = function(){
    return 5;        
}
Scope.prototype.outputConfig = function(){
    return this.settings;        
}
Scope.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
  
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Scope.prototype.updatePosition = function(){
    $('#'+this.settings.id).css('top',this.settings.top);
    $('#'+this.settings.id).css('left',this.settings.left);
    
  /*  $(document).ready(updatePosition(this.settings.id,this.settings));
   
    function updatePosition(id,set){
        return function(){
            $( '#'+id).on( "drag", function( event, ui ) {
                 
            });
            
        };
    }*/
}

Scope.prototype.setConnectors = function(){
    jsPlumb.ready(addInPoint(this.settings.id));
    
    function addInPoint(id){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:[ 0, 0.4, -1, 0 ],
                isTarget: true,
                connector: connectorSettings,	
            });
        };
    }
}
