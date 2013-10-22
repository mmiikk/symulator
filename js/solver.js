(function($){
    var methods;
    var connections=[];
    var sources = ['step'];
    var timeHorizon = 10;
    var h = 0.1;
    
    function validateModel(){
                
    }
    
    function getConnections(plumbConnectors){
        for(i=0;i<plumbConnectors.length;i++)
            {
                connections.push({
                   targetId : plumbConnectors[i].targetId,
                   sourceId : plumbConnectors[i].sourceId,
                });                
            }
    }
    
    //function findStart
    function findStart(){
        
    }
    
    methods = {	
		
	/** Initialize
	
	 */			
	init : function(model){
            
           // var f = _.filter(model[1],function(obj){ return obj.type == 'step'});
           // var min = _.min(f, function(obj){ return obj.left; });
            //var con = getConnections(model[0]);
            
            
            getConnections(model[0]);
            console.log(model[0]);
            console.log(connections[0].getParameters());
          /*  var blocks = model[1];
            
            
            var f = _.filter(model[1],function(obj){ return obj.settings.type == 'step'});
            var start = _.min(f, function(obj){ return obj.settings.left; });
            
            var start_con = _.filter(connections,function(obj) {return obj.sourceId == start.settings.id });
            console.log(start);
            console.log(start_con);
            
            var y=start.outputValue();
            console.log(y);
            
            console.log(start_con['targetId']);
            var f = _.filter(blocks,function(obj){ return obj.settings.id == start_con[0].targetId});
            console.log(f);
            var f_con = _.filter(connections,function(obj) {return obj.sourceId == f[0].id });
            console.log(f_con);
            
            y=f[0].outputValue(y);
            console.log(y);
            */
          /*  
            var block = _.filter(model[1],function(obj){ return obj.id == start.targetId});
            var con = _.filter(connections,function(obj) {return obj.sourceId == min.id });
            
            y=block.outputVal(y);
            console.log(y);
            
            console.log(min);
            console.log(connections);
            console.log(model[0]);
            console.log(start);
            console.log(startObj);
		*/
                var data = [];
                for(i=0;i<=timeHorizon;i=i+h)
                    {
                        data.push([i, i]);
                        
                    }
                $.plot('#plot',[data]);
	},
    
    
    };
    
    $.fn.solver = function(method){
        if ( methods[method] ) 
        {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method )
        {
          return methods.init.apply( this, arguments );
        }
        else
        {
          $.error( 'Method ' +  method + ' does not exist on jQuery.gantt' );
        }
    };
})(jQuery);

