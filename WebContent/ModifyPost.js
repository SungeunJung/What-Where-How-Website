	var getURLParams = function (url) {
		var result = {};
		url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
		return result;
	}
	
	var user = "";
	var post = null;
    function cancel() {
    	var ret = confirm("수정하기를 취소하시겠습니까?")
    	if(ret == true) {
    		window.location.href= "modifyPost.html?postType=postHobby&post_id="+index;
    	}
    }
    
    function getPost() {
    	if(localStorage.getItem('modify')) {
    		post = JSON.parse(localStorage.getItem('modify'));
    		console.log(post.title);
    		console.log(document.getElementById('title').value)
    		document.getElementById('title').value = post.title;
    		document.getElementById('content').value = post.content;
    		document.getElementById('img').src = post.image;
    	}
    }
    
    function setBoardName () {
    	var tag = "";
    	switch(postType) {
	    	case 'postHobby': 
	    		tag = "<h2 class='title'><b>취미</b> | <span style='font-size:25px'>다양한 취미를 공유하는 공간</span></h2>"; 
	    		break;
	    	case 'postDaily': 
	    		tag = "<h2 class='title'><b>일상</b> | <span style='font-size:25px'>일상의 이야기를 나누는 공간</span></h2>"; 
	    		break;
	    	case 'postSuggest': 
	    		tag = "<h2 class='title'><b>건의사항</b> | <span style='font-size:25px'>운영자에게 건의할 사항을 알려주세요</span></h2>"; 
	    		break;
    	}
    	document.write(tag);
    }
    
    function submitHandler(form) {
    	if(!fileChange) event.preventDefault();
    	else form.action = "fileUpload.jsp?type="+urlTo+"&key="+postType+"&post_id="+index;
    	
    	var title = document.getElementById("title").value;
    	console.log(title);
    	var content = document.getElementById("content").value;
    	var postArr = [];
    	if(!title) { alert("제목을 입력해주세요!"); return; }
    	else if(!content) { alert("내용을 입력해주세요!"); return; }
    	if(localStorage.getItem(postType)) {
    		postArr = JSON.parse(localStorage.getItem(postType));
    	}
    	for(i=0; i<postArr.length; i++) {
    		if(postArr[i].index == index) {
    			postArr[i].title=title;
	    		postArr[i].content=content;
	    		postArr[i].date = new Date().toISOString();
    		}
    	}
    	localStorage.setItem(postType, JSON.stringify(postArr));
    	console.log(fileChange)
    	console.log("/"+urlTo+".html")
    	if(!fileChange) {
    		window.location.replace("/"+urlTo+".html");
    	}
    }