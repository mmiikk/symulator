var Scope = function(config){
   
    var basicConfig = {
        'id' : 'scope',
        'name' : 'scope',
        'type' : 'scope',
        'in' : '1',
        'out' : '0',
        'left' : '0',
        'top' : '0',
        'inPos' : [positions.left],
        'outPos' : [],
        'inFunc' : [null],
        'outFunc' : [],

    };
    
    this.previousValues = [];
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    
    this.endpoints = $.extend([],this.endpoints,[]);
       
}

Scope.prototype = new Block();
Scope.prototype.outputValue = function(y,h){
    return this.previousValues.push(y);        
}
