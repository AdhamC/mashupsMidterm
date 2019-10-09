var newsList = [];
var titleList = [];
var summaryList = [];
var counter = 0;
var inp;
var prog = false;

function news(){
	$("#loading").html("Loading results....");

	var newsUrl = 'https://newsapi.org/v2/everything?' +
          'q='+inp+'&' +
          'from=2019-9-10&' +
          'sortBy=popularity&' +
          'pageSize=10&' +
          'apiKey=8423422a58e54c7ba3c714191e74d6a6';


	$.ajax({
		url: newsUrl,
		type: 'Get',
		dataType: 'json',
	})
	.done(function(data) {
		console.log("success");
		console.log(data);
		callSumm(data.articles);
	})
	.fail(function(err) {
		console.log("error");
		console.log(err);
	})
	.always(function() {
		console.log("complete");
	});

}
var clear;

function callSumm(art){
	console.log(art.length);
	for (var i=0;i<art.length;i++){
		newsList[i] = art[i].url;
		titleList[i] = art[i].title;
	}
	clear = setInterval(actuallyCallSumm,1500);
}

function actuallyCallSumm(){
	if (!prog){
		if (counter>=newsList.length){
			clearInterval(clear);
			counter = 0;
		} else {
			prog = true;
			summ(newsList[counter]);
		}
	}
}


function summ(x){

	var summurl = 'https://api.meaningcloud.com/summarization-1.0';
	$.ajax({
		url: summurl,
		type: 'POST',
		dataType: 'json',
		data: jQuery.param({ "key": "73f21f1f68789f890c2a2588d2702eec", "url" : x,"sentences":"2" }),

	})
	.done(function(data) {
		console.log("success");
		// console.log(data.summary);
		var headline = "<a class='tittle' href='"+x+"' >"+titleList[counter]+"</a>";
		$("#loading").html("");
		$(".data").append(headline);
		var text = "<div class='auto'>"+data.summary+"</div>";
		$(".data").append(text);
		// console.log(counter)

	})
	.fail(function(err) {
		console.log("error");
		console.log(err);
	})
	.always(function() {
		console.log("complete");
		prog = false;
		counter++;
	});

}

$('#inp').bind('enterKey',function(){
	inp = $('#inp').val();
	var x = inp.split(' ');
	if (x.length == 1){
		if (inp.length > 0){
			$('#butt').hide(500);
			$('#inp').hide(500);
			$('.data').html('');
			$("#loading").html("Loading results....");
			news();
		}
	}
})

$('#inp').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});
$('#butt').click(function(){
	inp = $('#inp').val();
	var x = inp.split(' ');
	if (x.length == 1){
		if (inp.length > 0){
			$('#butt').hide(500);
			$('#inp').hide(500);
			$('.data').html('');
			$("#loading").html("Loading results....");
			news();
		}
	}
})
