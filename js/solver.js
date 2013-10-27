(function($){
    var methods;
    var connections=[];
    var objects=[];
    var sources = ['step'];
    var sourcesSmall = ['feedback'];
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
    function findStart(sources){
      //  var sources = _.filter(objects,function(obj){ return obj.settings.type == 'step'});
        return start = _.min(sources, function(obj){ return obj.settings.left; });
    }
    
    function findConnection(sourceId, targetId)
    {
        if(sourceId !== null)
            {
                return _.filter(connections,function(obj){ return obj.sourceId === sourceId; });
            }
        else
            {
                 return _.filter(connections,function(obj){ return obj.targetId === targetId; });               
            }
                
    }
    
    function removeConnection(obj)
    {
        return _.indexOf(connections,obj);
      /*  for(var i=0;i<connections.length;i++)
        {
            console.log(obj);
            console.log(connections[i]);
            if(connections[i].sourceId == obj.sourceId && connections[i].targetId == obj.targetId)
                return i;
        }*/
    }
    
    methods = {	
		
	/** Initialize
	
	 */			
	init : function(model){
            
           // var f = _.filter(model[1],function(obj){ return obj.type == 'step'});
           // var min = _.min(f, function(obj){ return obj.left; });
            //var con = getConnections(model[0]);
            
            objects = model[1];
            getConnections(model[0]);
            //console.log(model[0][0].endpoints[1].getOverlays('label'));
           // var start = findStart();
         //   console.log(start.settings.id);
            
            var order = [];
            var Order = [];
            var sourcesBlocks = _.filter(objects,function(obj){ return obj.settings.type == 'step'});
            sourcesBlocks.sort(function(a,b){return a.settings.left-b.settings.right});
            console.log(sourcesBlocks);
          
            for(var i=0; i<sourcesBlocks.length ; i++)
            {
                var start = sourcesBlocks[i];
                console.log(start);
                 var found = findConnection(start.settings.id,null);
                    
                    console.log(found);
                    order.push(found);
                    start = found[0].targetId;
                    connections.splice(removeConnection(found[0]),1);
                    console.log(connections);
                    //var found = findConnection(start,null);
                    while(findConnection(start,null).length !== 0)
                        {
                              var found = findConnection(start,null);

                            console.log(found);
                            order.push(found);
                            start = found[0].targetId;
                            connections.splice(removeConnection(found[0]),1);
                            console.log(connections);
                            var found = findConnection(start,null);
                            console.log(start);

                       }
                       Order.push(order);
                       order=[];
            }
            console.log(order);
            console.log(connections);
            
            var sourcesBlocks = _.filter(objects,function(obj){ return obj.settings.type == 'feedback'});
            for(var i=0; i<sourcesBlocks.length ; i++)
            {
                var start = sourcesBlocks[i];
                console.log(start);
                 var found = findConnection(start.settings.id,null);
                    
                    console.log(found);
                    order.push(found);
                    start = found[0].targetId;
                    connections.splice(removeConnection(found[0]),1);
                    console.log(connections);
                    //var found = findConnection(start,null);
                    while(findConnection(start,null).length !== 0)
                        {
                              var found = findConnection(start,null);

                            console.log(found);
                            order.push(found);
                            start = found[0].targetId;
                            connections.splice(removeConnection(found[0]),1);
                            console.log(connections);
                            var found = findConnection(start,null);
                            console.log(start);

                       }
                       Order.push(order);
                       order=[];
            
            }
            console.log(Order);
            
           /* console.log(model[0]);
            console.log(model[0][0].endpoints[1].getOverlays()[0].getLabel());
            console.log(connections[0].getParameters());*/
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

