(function($){
    var methods;
    var connections=[];
    var objects=[];
    var sources = ['step','constant'];
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
                   targetIdParam : plumbConnectors[i].getParameter('func'),
                   sourceId : plumbConnectors[i].sourceId,
                   sourceIdParam : plumbConnectors[i].getParameter('func'),
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
     
    }
    
    function getObjectByType(objects,type)
    {
        return  _.filter(objects,function(obj){ return obj.settings.type === type});        
    }
    
    function getObjectById(objects,id)
    {
        return  _.filter(objects,function(obj){ return obj.settings.id === id});        
    }
    
    
    function buildBranchBySourceType(type,connContainer)
    {
        var order = [];
        var sourcesBlocks = getObjectByType(objects,type); //get all source objects by type
        var sourceBlock = null; 
        var blockConnections = [];
        
        //Sort object - first on the left starts
        sourcesBlocks.sort(function(a,b){return a.settings.left-b.settings.right});

        //Explore connections array and build branch from start(source) to end(scope, sum ...)
        for(var i=0; i<sourcesBlocks.length ; i++)
        {
            //get source blocks
            sourceBlock = sourcesBlocks[i];
            //get blocks connections, where is as source
            blockConnections = findConnection(sourceBlock.settings.id,null);

            //push connection to array 
            //current block(sourceBlock) become start of the branch
            if( typeof blockConnections[0] === 'object' ) 
                order.push(blockConnections);
            else
                order.push(blockConnections[0]);
            
            
            //remove connection from connections array        
            connections.splice(removeConnection(blockConnections[0]),1);
            
            sourceBlock = blockConnections[0].targetId;

            //find route from first block to the end of branch
            //end loop when no other connections found - sum, scope detected
            while(findConnection(sourceBlock,null).length !== 0)
            {
                blockConnections = findConnection(sourceBlock,null);

                order.push([blockConnections[0]]);
                sourceBlock = blockConnections[0].targetId;
                connections.splice(removeConnection(blockConnections[0]),1);


            }
            connContainer.push(order);
            order=[];
        }
        return connContainer;
    }
    
    function orderBranchesByPriority(connContainer)
    {
        //get Last element of the branch
        function getLastElementTarget(elements)
        {
            var len =parseInt(elements.length-1);
            return elements[len][0].targetId;
        }
        //get first Element of the branch
        function getFirstElementSource(elements)
        {
            return elements[0][0].sourceId;
        }
        //find branch poition in Array
        function findElementPosition(notThisIndex,objectId)
        {
            for(var i=0; i<connContainer.length ;i++)
            {
                if(i!==notThisIndex)
                {
                    for(var j=0; j<connContainer[i].length ;j++)
                    {

                        if(connContainer[i][j][0].sourceId===objectId)
                            return i;
                    }
                }
            }
             return null;
        }
        
        function moveBranch(connContainer,i)
        {
            connContainer.move(newPos,i);
            i=parseInt(connContainer.length-1);
            return i;
        }
        
        var lastElement = null;
        var firstElement = null;
        var newPos = null;
        
        //for loop from end to start
        for(var i=parseInt(connContainer.length-1); i>0 ;i--)
        {
            //get target of the branch
            lastElement = getObjectById(objects,getLastElementTarget(connContainer[i]));

            // if branch target is object 'sum', it's necessary to put this branch in correct order
            if(lastElement[0].settings.type === 'sum')
            {
                //get source from branch where target is 'sum'
                firstElement = getObjectById(objects,getFirstElementSource(connContainer[i]));

                //if source is feedback this must be after branch where feedback is as target
                if(firstElement[0].settings.type === 'feedback')
                {
                    //get new position
                    newPos = findElementPosition(firstElement[0].settings.id);
                    //if branch is before 'parent' move it after 
                    if(newPos > i )
                    {
                        i=moveBranch(connContainer,i);
                    }

                } 
                else
                {
                    newPos = connContainer.move(i,findElementPosition(i,firstElement[0].settings.id));
                    //if branch is before 'parent' move it before
                    if(newPos < i )
                    {
                        i=moveBranch(connContainer,i);
                    }
                }


            }
                
        }
    }
    
    methods = {	
		
	/** Initialize
	
	 */			
	init : function(model){
            
            objects = model[1]; // Blocks (step, sum etc... )
            getConnections(model[0]);   //Connection between blocks
          
            
            var Order = [];
            
            for(var i=0;i<sources.length;i++)
                Order = buildBranchBySourceType(sources[i],Order); //Build branches as array row, where source is sources array element
            Order = buildBranchBySourceType('feedback',Order); //Build branches as array row, where source is feedback
                     
            orderBranchesByPriority(Order); //make Order in correct order
            
                var  y = 0 ;
                var time = 0;
                var h=0.5;
                //var
                  console.log('####');
                      console.log('####');
                       console.log('####');
                        console.log('####'); console.log('####');
                console.time('someFunction timer');
                while(time<10)
                    {
                   
                        
                        for(var i=0; i<Order.length ; i++)
                            {
                                for(var j=0; j<Order[i].length ; j++)
                                    {
                                        if(j!==parseInt(Order[i].length-1))
                                            {
                                       // console.log(Order[i][j][0]);
                                        var obje = _.filter(objects,function(obj){ return obj.settings.id == Order[i][j][0].sourceId});
                                       // console.log(obje);
                                         //   if(obje[0].settings.type =='feedback')
                                            
                                        y=obje[0].outputValue(y,h,time);
                                       
                                        var tar =  _.filter(objects,function(obj){ return obj.settings.id == Order[i][j][0].targetId});
                                                    if(tar[0].settings.type==='sum')
                                                        {
                                                            //console.log(Order[i][j][0].sourceIdParam);
                                                            tar[0].updatePreviousValues(Order[i][j][0].sourceIdParam,y);
                                                        }
                                                        else if (tar[0].settings.type==='feedback')
                                                            tar[0].updatePreviousValues(y);
                                        }
                                       else
                                           {
                                              // console.log(Order[i][j][0]);
                                               var obje = _.filter(objects,function(obj){ return obj.settings.id == Order[i][j][0].sourceId});
                                              // console.log(obje);
                                               y=obje[0].outputValue(y,h,time);
                                               
                                               var tar =  _.filter(objects,function(obj){ return obj.settings.id == Order[i][j][0].targetId});
                                                    if(tar[0].settings.type==='sum')
                                                        {
                                                         //   console.log(Order[i][j][0].sourceIdParam);
                                                            tar[0].updatePreviousValues(Order[i][j][0].sourceIdParam,y);
                                                        }
                                                        else if (tar[0].settings.type==='feedback')
                                                            tar[0].updatePreviousValues(y);
                                                        else
                                                            {
                                               var obje = _.filter(objects,function(obj){ return obj.settings.id == Order[i][j][0].targetId});
                                             //  console.log(obje);
                                               obje[0].outputValue(y,h,time);
                                                            }
                                           }
                                        
                                        
                                    }
                            }
                            time= time+h;
                            //console.log(y);
                  }
                       console.timeEnd('someFunction timer')     
                   // console.log(objects[4]);
        
        
                var data = [];
                var f = _.filter(objects,function(obj){ return obj.settings.type == 'scope'});
                for(i=0;i<f[0].previousValues.length;i++)
                    {
                        data.push([i, f[0].previousValues[i]]);
                        
                    }
             //   $.plot('#plot',[data]);
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

