var Feedback = function(config){
    var settings = {
        'id' : 'feedback',
        'name' : 'feedback',
        'type' : 'feedback',
        'in' : '1',
        'out' : '2',
        'left' : '0',
        'top' : '0',


    };
    this.settings = $.extend({},settings,config);
        
}

Feedback.prototype.outputValue = function(y,h){
    return y*h;        
}
Feedback.prototype.outputConfig = function(){
    return this.settings;        
}
Feedback.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Feedback.prototype.updatePosition = function(){
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

Feedback.prototype.setConnectors = function(){
    
    jsPlumb.ready(addTarget(this.settings.id,positions.left));
    jsPlumb.ready(addSource(this.settings.id,positions.bottom));
    jsPlumb.ready(addSource(this.settings.id,positions.right));
    
    function addSource(id,position){
        return function(){console.log(position);
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:position,
                isSource: true,
                connector: connectorSettings,
                connectorStyle: connectorPaintStyle,
                paintStyle:{ fillStyle:"#1e8151",radius:7 },
            });
        };
    }
    
     function addTarget(id,position){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:position,
                paintStyle:{ 
                        strokeStyle:"#1e8151",
                        fillStyle:"transparent",
                        radius:7,
                        lineWidth:2 
                },	
                isTarget: true,
                connectorPaintStyle: connectorPaintStyle,
                connector: connectorSettings,	
            });
        };
    }
}
