(function($){
    var methods;
    
    function validateModel(){
                
    }
    
    methods = {	
		
	/** Initialize
	
	 */			
	init : function(a){
		console.log(a[1]);
               console.log(a[1][0].outputConfig());
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

