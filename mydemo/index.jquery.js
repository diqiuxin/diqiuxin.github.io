/***主页的弹出框***/
$(document).ready(function(){
	$("#demo-navbar .dropdown-menu a").click(function(){
		var href = $(this).attr("href");	
		$("#tab-list a[href=" + href +"]").tab("show");
	});
});
/***主页的弹出框***/

/*引用的jq部分*/
$(document).ready(function(){
	var title = $('head>title').text();
	console.log(title);

});




/*引用的jq部分*/