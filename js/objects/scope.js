var Scope = function(config){
   
    var basicConfig = {
        'id' : 'scope',
        'name' : 'scope',
        'type' : 'scope',
        'in' : '1',
        'out' : '0',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [],
        'inFunc' : [null],
        'outFunc' : [],

    };
    
    this.previousValues = [];
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
       
    this.parameters = [
        {   
            'type' : 'plot',
            'label' : '',
            'value' : this.previousValues,
            'id' : this.settings.id+'plot',
        },
       
    ];
}

Scope.prototype = new Block();
Scope.prototype.outputValue = function(y,h,time){
    console.log(y);
    return this.previousValues.push([time , y]);        
}
