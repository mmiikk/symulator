var Block = function(config){
    var settings = {
        'id' : 'block',
        'name' : 'block',
        'type' : 'block',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [],
        'outPos' : []

    };
   
    this.settings = $.extend({},settings,config);
        
}

Block.prototype.outputConfig = function(){
    return this.settings;        
}
Block.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Block.prototype.updatePosition = function(){
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

Block.prototype.setConnectors = function(){
    
    jsPlumb.ready(addInPoint(this.settings.id));
    
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
