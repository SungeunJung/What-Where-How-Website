	var getURLParams = function (url) {
		var result = {};
		url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
		return result;
	}
	
	var user = "";
    function cancel() {
    	var ret = confirm("글 작성하기를 취소하시겠습니까?")
    	if(ret == true) {
    		window.location.href= "/"+urlTo+".html";
    	}
    }
    	
    function setBoardName () {
    	var tag = "";
    	switch(postType) {
	    	case 'postHobby': 
	    		tag = "<h2 class='title'>취미 | <span style='font-size:25px'>다양한 취미를 공유하는 공간</span></h2>"; 
	    		break;
	    	case 'postDaily': 
	    		tag = "<h2 class='title'>일상 | <span style='font-size:25px'>일상의 이야기를 나누는 공간</span></h2>"; 
	    		break;
	    	case 'postSuggest': 
	    		tag = "<h2 class='title'>건의사항 | <span style='font-size:25px'>운영자에게 건의할 사항을 알려주세요</span></h2>"; 
	    		break;
    	}
    	document.write(tag);
    }
    
    function submitHandler(form) {
    	form.action = "fileUpload.jsp?type="+urlTo+"&key="+postType+"&post_id=-1";
    	var title = document.getElementById("title").value;
    	var content = document.getElementById("content").value;
    	var index = 0;
    	var postArr = [];
    	if(!title) { alert("제목을 입력해주세요!"); return; }
    	else if(!content) { alert("내용을 입력해주세요!"); return; }
    	if(localStorage.getItem(postType)) {
    		postArr = JSON.parse(localStorage.getItem(postType));
    		if(postArr.length>0) index = postArr[postArr.length-1].index+1;
    	}
 
    	var post = {
    			index: index,
    			writer: 'noonsong', //나중에 현재 로그인된 아이디로 수정 필요
    			title: title,
    			content: content,
    			date: new Date().toISOString(),
    			like: 0,
    			comments: [],
    			image: "",
    	}
    	postArr.push(post);
    	localStorage.setItem(postType, JSON.stringify(postArr));
    	
    }