jsPlumb.ready(function(){
   jsPlumb.Defaults.ConnectionOverlays =[ ["Arrow", { location:1 } ] ]; 
   jsPlumb.Defaults.Connector = [ "Flowchart", { stub:[40, 60], gap:1, cornerRadius:5, alwaysRespectStubs:true } ];		
});

var connectorSettings = [ "Flowchart", { stub:[100, 100], gap:1, cornerRadius:5, alwaysRespectStubs:false, midPoint: 1 } ];

var positions = {
  
  left: [ 0, 0.5, -1, 0 ],
  leftBottom: [ 0.15, 0.85, 1, 0 ],
  top:   [ 0.5, 0 , -0.5, 0],
  leftTop: [ 0.15, 0.15, -1, 0 ],
  bottom:   [ 0.5, 1 , 0, 1],
  rightBottom: [ 0.85, 0.85, -1, 0 ],
  right:  [ 1, 0.5, 1, 0 ],
  rightTop: [ 0.85, 0.15, -1, 0 ],
  
  
  
};
var connectorPaintStyle = {
				lineWidth:4,
				strokeStyle:"#deea18",
				joinstyle:"round",
				outlineColor:"#eaedef",
				outlineWidth:2
			};
                        