var Sum = function(config){
    var basicConfig = {
        'id' : 'sum',
        'name' : 'sum',
        'type' : 'sum',
        'in' : '3',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [positions.left,positions.bottom,positions.top],
        'outPos' : [positions.right],
        'inFunc' : ['add','sub','sub'],
        'outFunc' : [null],

    };
    
    updateFunc(basicConfig.inFunc);
    
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.previousValues = buildPreviousValuesObject(basicConfig.inFunc);
    this.endpoints = $.extend([],this.endpoints,[]);
   
    this.outputValue();
    
    function updateFunc(functions){
        for(var i=0;i<functions.length;i++)
        {
            functions[i]=functions[i]+i;
        }
    }
    function buildPreviousValuesObject(functions)
    {
        var prevVal = {};
        for(var i=0;i<functions.length;i++)
        {
            prevVal[functions[i]]=0;
        }
        return prevVal;
    }
}

Sum.prototype = new Block();
Sum.prototype.outputValue = function(){
    var outVal = 0;
    
    for(var i=0;i<this.settings.inFunc.length;i++)
    {
        
        if(this.settings.inFunc[i].indexOf('add') === -1)
            outVal = parseFloat( outVal - this.previousValues[this.settings.inFunc[i]] );
        else
           outVal = parseFloat( outVal + this.previousValues[this.settings.inFunc[i]] );
    }
    //console.log(outVal);
    return outVal;
}
Sum.prototype.updatePreviousValues = function(func,value){
    console.log(func);
    console.log(this.previousValues);
    console.log(this.previousValues[func]);
    console.log(value);
    this.previousValues[func]=value;
}
