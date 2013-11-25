var Integrator = function(config){
    var basicConfig = {
        'id' : 'integrator',
        'name' : 'integrator',
        'type' : 'integrator',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [{'position':positions.right}],
        'inFunc' : [null],
        'outFunc' : [null],

    };
    this.previousValues = 0;
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
        
}

Integrator.prototype = new Block();
Integrator.prototype.outputValue = function(y,h){
    console.log(y);
    var output = this.previousValues + y*h;
    this.previousValues = output;
    return output;        
}
