var Gain = function(config){
   
    var basicConfig = {
        'id' : 'gain',
        'name' : 'gain',
        'type' : 'gain',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],


    };
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
    
    this.previousValues = {
        'end' : 1,
        
    };
    
    this.parameters = [
        
        {   
            'type' : 'range',
            'label' : 'Wartoœæ koñcowa',
            'value' : this.previousValues.end,
            'id' : 'end',
        },
       
    ];
}

Gain.prototype = new Block();
Gain.prototype.outputValue = function(y,h,time){
    return y*this.previousValues.end;      
   
}