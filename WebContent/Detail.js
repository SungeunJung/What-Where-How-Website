	var getURLParams = function (url) {
		var result = {};
		url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
		return result;
	}
	   
	var postArr = null, post=null, arrIndex=null;
	const url = window.location.href;

	function getPost(type) {
		postArr = JSON.parse(localStorage.getItem(type));
		for(i=0; i<postArr.length; i++) {
			if(postArr[i].index == index) {
				post = postArr[i];
		    	arrIndex = i;
		    }
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
	
	var userArr = JSON.parse(localStorage.getItem('user'));
	var user = userArr[0]; //현재 로그인되어 있는 유저 체크 필요

	function modifyPostBtn() {
		var modifyBtn = "";
		if(post.writer == user.id) {
			modifyBtn = "<button class='btn btn-outline-secondary btn-sm' onclick='modifyPost()'>수정</button>";
			console.log(modifyBtn);
		}
		
		document.write(modifyBtn);
	}
	function modifyPost() {
		localStorage.setItem('modify', JSON.stringify(post));
		window.location.replace("/modifyPost.html?postType="+postType+"&post_id="+index);
	}

	function deletePostBtn() {
		var deleteBtn = "";
		if(post.writer == user.id) {
			deleteBtn = "<button class='btn btn-outline-secondary btn-sm' onclick='deletePost()'>삭제</button>";
		}
		
		document.write(deleteBtn);
	}
	
	function deletePost() {
		var ret = confirm("게시글을 삭제하시겠습니까?");
		if(ret == true) {
			postArr.splice(arrIndex, 1);
	
			localStorage.setItem(postType, JSON.stringify(postArr));
		    
		    if(postType=='postHobby') {
		    	window.location.replace('/hobby.html');
		    }
		    else if(postType=='postDaily') {
		    	window.location.replace('/daily.html');
		    }
		}
		else {
			return;
		}
	}
    
    var commentIndex = -1;
	function display() {
	    if(post.comments.length<0) return;
		var divtag = "";
		for(i=0; i<post.comments.length; i++) {
			var nickname = post.comments[i].writer;
			var content = post.comments[i].content;
			commentIndex = post.comments[i].index;
			var temp = i;
			if(nickname == user.id) {
				divtag = "<div class='comment'><div class='comment-wrtier'>"+nickname+"<span><button class='btn btn-outline-secondary btn-sm' onclick='deleteComment("+commentIndex+","+temp+")' style='margin-left:20px;'>";
				divtag += "삭제</button></span></div><div class='comment-content'>"+content+"</div></div>";
			}
			else {
				divtag = "<div class='comment'><div class='comment-wrtier'>"+nickname+"</div><div class='comment-content'>"+content+"</div></div>";
			}
			
			document.write(divtag);
		}
	}
	
	function deleteComment(index, temp) {
	    postArr[arrIndex].comments.splice(temp, 1);

	    if(postType=='postHobby') {
	    	localStorage.setItem('postHobby', JSON.stringify(postArr));
	    }
	    else if(postType=='postDaily') {
	    	localStorage.setItem('postDaily', JSON.stringify(postArr));
	    }
	    window.location.replace(url);
	}
	
	var button = "";
    var state = false;
    var likeIndex = -1;
    var likeArr = user.like;
    
	function likeButton() {
		if(likeArr.length>0) {
	    	for(i=0; i<likeArr.length; i++) {
		    	if(likeArr[i].type == postType && likeArr[i].index == index) {
		    		state = true;
		    		likeIndex = i;
		    	}
		    }
	    }
	    if(state) {
	    	//button = "<button onclick='likeHandler()' style='border:0; outline:0; background-color:transparent;'><img id='heart' src='source/heart-full.png' width=40 height=40/></button>"
	    	button = "<button onclick='likeHandler()' class='btn btn-danger btn-round'><span class='glyphicon glyphicon-heart' aria-hidden='true' style='color:pink;'></span> Like</button>";
	    }
	    else {
	    	//button = "<button onclick='likeHandler()' style='border:0; outline:0; background-color:transparent;'><img id='heart' src='source/heart-empty.png' width=40 height=40/></button>"
	    	button = "<button onclick='likeHandler()' class='btn btn-outline-danger btn-round'><span class='glyphicon glyphicon-heart-empty' aria-hidden='true' style='color:pink;'></span> Like</button>";
	    }
	    document.write(button);
	}
	    
	function likeHandler() {
		var temp = {
	    	type: postType,
	    	index: index
		}
		if(state) {
	    	document.getElementById('heart').src = 'source/heart-empty.png'
	    	state = false;
	    	user.like.splice(likeIndex, 1);
		}
		else {
	    	document.getElementById('heart').src = 'source/heart-full.png'
	    	state = true;
	    	user.like.push(temp);
		}
	    	
		localStorage.setItem('user', JSON.stringify(userArr));
	}
	
	function postComment(e) {
		e.preventDefault();
		var content = document.getElementById('content').value;
		if(!content) { alert("내용을 입력해주세요!"); return; }
	    var commentArr = post.comments;
	    var index = -1;
	    if(commentArr.length<1) index = 0;
		else index = commentArr[commentArr.length-1].index+1;
		
	    var comment = {
	    	writer: 'noonsong', //나중에 현재 로그인된 아이디로 수정 필요
	    	content: content,
	    	index: index
	    }

	    commentArr.push(comment);
	    postArr[arrIndex].comments = commentArr;
	    if(postType=='postHobby') {
	    	localStorage.setItem('postHobby', JSON.stringify(postArr));
	    }
	    else if(postType=='postDaily') {
	    	localStorage.setItem('postDaily', JSON.stringify(postArr));
	    }
	    
	    window.location.replace(url);
	}
	