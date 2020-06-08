onmessage = function(latencia)	{
	
	function latido(){
	   self.postMessage("now");
	}
	setInterval (function(){latido();}, latencia.data);
};
	