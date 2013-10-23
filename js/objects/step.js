var Step = function(config){
    var settings = {
        'id' : 'step',
        'name' : 'step',
        'type' : 'step',
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
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Step.prototype.updatePosition = function(){
    $('#'+this.settings.id).css('top',this.settings.top);
    $('#'+this.settings.id).css('left',this.settings.left);
    
    $(document).ready(updatePosition(this.settings.id,this.settings));
   
    function updatePosition(id,set){
        return function(){
            $( '#'+id).on( "drag", function( event, ui ) {
                set.top = parseInt($('#'+id).css('top'));
                set.left = parseInt($('#'+id).css('left'));
            });
            
        };
    }
}

Step.prototype.setConnectors = function(){
    console.log(this.settings.id);
    jsPlumb.ready(addInPoint(this.settings.id));
    
    function addInPoint(id){
        
        return function(){console.log(id);
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                connectorStyle:connectorPaintStyle,
                paintStyle:{ fillStyle:"#1e8151",radius:7 },
                anchor:[ 1, 0.5, 1, 0 ],
                isSource: true,
                connector: connectorSettings,	
            });
        };
    }
}
