var Step = function(config){
   
    var basicConfig = {
        'id' : 'step',
        'name' : 'step',
        'type' : 'step',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
    
    this.previousValues = {
        'start' : 0,
        'end' : 1,
        'delay' : 0,
    };
    
    this.parameters = [
        {   
            'type' : 'input',
            'label' : 'Wartoœæ koñcowa',
            'value' : this.previousValues.end,
        }
    ];
}

Step.prototype = new Block();
Step.prototype.outputValue = function(y,h,time){
    console.log(this.previousValues.end);
    if(time>=this.previousValues.delay)
        return  5;        
}