(function(){

	var interval;

	jQuery.event.special.contentchange = {
        setup: function(){
            var self = this,
            $this = $(this),
            $originalContent = $this.text();
            interval = setInterval(function(){
            	if($originalContent != $this.text()) {
                	$originalContent = $this.text();
                    jQuery.event.handle.call(self, {type:'contentchange'});
            	}
            },100);
        },
        teardown: function(){
            clearInterval(interval);
        }
    };

})();