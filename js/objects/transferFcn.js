var TransferFcn = function(config){
    var basicConfig = {
        'id' : 'transferFcn',
        'name' : 'transferFcn',
        'type' : 'transferFcn',
        'in' : '1',
        'out' : '1',
        'left' : '0',
        'top' : '0',
        'inPos' : [{'position':positions.left}],
        'outPos' : [{'position':positions.right}],
        'inFunc' : [null],
        'outFunc' : [null],

    };
   // this.previousValues = [0 0 0];
    this.settings = $.extend({},this.settings,basicConfig);
    
    this.settings = $.extend({},this.settings,config);
    this.endpoints = $.extend([],this.endpoints,[]);
        
}

TransferFcn.prototype = new Block();
TransferFcn.prototype.outputValue = function(y,h){
  //  var tf = [1 1 1];
  //  var tfp[0] = 
    
    
    
    
    console.log(y);
    var output = this.previousValues + y*h;
    this.previousValues = output;
    return output;        
}
