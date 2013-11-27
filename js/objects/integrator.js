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
    this.previousValues = [0];
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
    this.integratorInRow = 0;
}

Integrator.prototype = new Block();
Integrator.prototype.outputValue = function(y,h,time){
    
   
    //var prev = this.previousValues;
    if(time===0)
        return this.previousValues[0] ; 
    else
    {
    
        var output = parseFloat(this.previousValues[this.previousValues.length-1]) + y*h;
        this.previousValues.push(output);
        this.previousValues.splice(0,1);
        console.log(this.previousValues);
         if(time>=(h+this.integratorInRow*h))
         {

            return this.previousValues[0] ; 
        }
        else
             return this.previousValues[0] ; 
    }
}

Integrator.prototype.setIntegrator = function(number){
    this.integratorInRow = number;
    console.log(number);
    for(var i=0;i<number;i++)
        this.previousValues.push(0);
}