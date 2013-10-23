var Scope = function(config){
    var settings = {
        'id' : 'scope',
        'name' : 'scope',
        'type' : 'scope',
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
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Scope.prototype.updatePosition = function(){
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

Scope.prototype.setConnectors = function(){
    jsPlumb.ready(addInPoint(this.settings.id));
    
    function addInPoint(id){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                paintStyle:{ 
                        strokeStyle:"#1e8151",
                        fillStyle:"transparent",
                        radius:7,
                        lineWidth:2 
                },	
                anchor:[ 0, 0.5, -1, 0 ],
                isTarget: true,
                connector: connectorSettings,	
            });
        };
    }
}
