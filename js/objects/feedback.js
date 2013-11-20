var Feedback = function(config){
    var basicConfig = {
        'id' : 'feedback',
        'name' : 'feedback',
        'type' : 'feedback',
        'in' : '1',
        'out' : '2',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [{'position':positions.right},{'position':positions.bottom}],
        'inFunc' : [null],
        'outFunc' : [null,null],

    };
    this.previousValues = 0;
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
    
}

Feedback.prototype = new Block();
Feedback.prototype.outputValue = function(){
    return this.previousValues;        
}
Feedback.prototype.updatePreviousValues = function(value){
    this.previousValues = value;
}
