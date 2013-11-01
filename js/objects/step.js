

var Step = function(config){
    var settings = {
        'id' : 'step',
        'name' : 'step',
        'type' : 'step',
        'in' : '0',
        'out' : '1',
        'left' : '0',
        'top' : '0',


    };
    
    this.settings = $.extend({},settings,config);
        console.log(this);
}

Step.prototype = new Block();
Step.prototype.outputValue = function(){
    return 5;        
}