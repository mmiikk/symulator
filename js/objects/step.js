var Step = function(config){
    var settings = {
        'id' : 'step',
        'name' : 'step',
        'type' : 'block',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    this.settings = $.extend({},settings,config);
        
}

Step.prototype.outputValue = function(){
    return 5;        
}
Step.prototype.outputConfig = function(){
    return this.settings;        
}
Step.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
  
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Step.prototype.updatePosition = function(){
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

Step.prototype.setConnectors = function(){
    jsPlumb.ready(addInPoint(this.settings.id));
    
    function addInPoint(id){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:[ 1, 0.4, 1, 0 ],
                isSource: true,
                connector: connectorSettings,	
            });
        };
    }
}
