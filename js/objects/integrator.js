var Integrator = function(config){
    var settings = {
        'id' : 'integrator',
        'name' : 'integrator',
        'type' : 'integrator',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    this.settings = $.extend({},settings,config);
        
}

Integrator.prototype.outputValue = function(y,h){
    return y*h;        
}
Integrator.prototype.outputConfig = function(){
    return this.settings;        
}
Integrator.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Integrator.prototype.updatePosition = function(){
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

Integrator.prototype.setConnectors = function(){
    jsPlumb.ready(addInPoint(this.settings.id));
    jsPlumb.ready(addOutPoint(this.settings.id));
    
    function addInPoint(id){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                connectorStyle: connectorPaintStyle,
                paintStyle:{ fillStyle:"#1e8151",radius:7 },
                anchor:positions.right,
                isSource: true,
                connector: connectorSettings,	
            });
        };
    }
    
     function addOutPoint(id){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                paintStyle:{ 
                        strokeStyle:"#1e8151",
                        fillStyle:"transparent",
                        radius:7,
                        lineWidth:2 
                },
                anchor:[ 0, 0.4, -1, 0 ],
                isTarget: true,
                connector: connectorSettings,	
            });
        };
    }
}
