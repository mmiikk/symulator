var Square = function(config){
    var basicConfig = {
        'id' : 'square',
        'name' : 'square',
        'type' : 'square',
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

Square.prototype = new Block();
Square.prototype.outputValue = function(y,h){
    
    return y*y;        
}
