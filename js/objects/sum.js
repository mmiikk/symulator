var Sum = function(config){
    var settings = {
        'id' : 'sum',
        'name' : 'sum',
        'type' : 'sum',
        'in' : '2',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    this.settings = $.extend({},settings,config);
    this.previousValues = {
        'sub' : 0,
        'add' : 0,
    }
}

Sum.prototype.outputValue = function(){
    return parseFloat( this.previousValues.add ) - parseFloat( this.previousValues.sub );        
}
Sum.prototype.updatePreviousValues = function(func,value){
    console.log( this.previousValues[func]);
    this.previousValues[func]=value;
    console.log( this.previousValues[func]);
}

Sum.prototype.outputConfig = function(){
    return this.settings;        
}
Sum.prototype.setJsPlumb = function(){
    jsPlumb.ready(makeDraggable(this.settings.id));
    $(document).ready(clickable(this.settings.id));
    function makeDraggable(id){
        return function(){
            jsPlumb.draggable(id);
        };
    }
}
Sum.prototype.updatePosition = function(){
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

Sum.prototype.setConnectors = function(){
    
    jsPlumb.ready(addTarget(this.settings.id,positions.left,'add'));
    jsPlumb.ready(addTarget(this.settings.id,positions.bottom,'sub'));
    jsPlumb.ready(addSource(this.settings.id,positions.right));
    
    function addSource(id,position,label){
        return function(){console.log(position);
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                anchor:position,
                isSource: true,
                connector: connectorSettings,
                connectorStyle: connectorPaintStyle,
                overlays:   [[ "Label", { label:label, id:"label", location:[-0.5, -0.5] } ]],
                paintStyle:{ fillStyle:"#1e8151",radius:7 },
                
            });
        };
    }
    
     function addTarget(id,position,func){
        return function(){
            jsPlumb.addEndpoint(id, {
                endpoint:"Dot",
                connectorPaintStyle: connectorPaintStyle,
                paintStyle:{ 
                        strokeStyle:"#1e8151",
                        fillStyle:"transparent",
                        radius:7,
                        lineWidth:2 
                },	
                anchor:position,
                isTarget: true,
                connector: connectorSettings,	
                parameters:{ 
                    'func' : func,
                }
            });
        };
    }
}
