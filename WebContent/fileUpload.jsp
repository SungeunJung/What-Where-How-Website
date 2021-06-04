<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "java.io.File" %>
<%@ page import = "java.util.*" %>
<%@ page import = "com.oreilly.servlet.MultipartRequest" %>
<%@ page import = "com.oreilly.servlet.multipart.DefaultFileRenamePolicy" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String filename="";
		int sizeLimit = 15*1024*1024;
		
		String realPath = request.getServletContext().getRealPath("fileUpload");
		
		File dir = new File(realPath);
		if(!dir.exists()) dir.mkdirs();
		
		DefaultFileRenamePolicy policy = new DefaultFileRenamePolicy();
		MultipartRequest multipartRequest = null;
		multipartRequest = new MultipartRequest(request, realPath, sizeLimit, "utf-8", policy);
		
		filename = multipartRequest.getFilesystemName("photo");
		String filePath = request.getContextPath();
	%>
	
	<%-- 
	폼에서 전송된 원래 파일명 : <%=multipartRequest.getOriginalFileName("photo") %> <br>
	파일명 : <%=filename %> <br>
	업로드한 파일의 경로 : "${pageContext.request.contextPath}/fileUpload/<%=filename %>" <br>
	물리적인 저장경로 : <%=realPath %> <br>
	<img src="${pageContext.request.contextPath}/fileUpload/<%=filename %>"/>
	--%>
	
	<script type="text/javascript">
		function getURLParams(url) {
			var result = {};
			url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
			return result;
		}
		const type = getURLParams(location.search).type;
	    console.log(type);
	    
		if(type=="hobby" && localStorage.getItem('postHobby')) {
			var post = JSON.parse(localStorage.getItem('postHobby'));
			//var index = post[post.length-1].index;
			if(post.length<2) index = 0;
			else index = post[post.length-2].index+1;
			post[index].image = "<%=filePath%>/fileUpload/<%=filename%>";
			localStorage.setItem('postHobby',[JSON.stringify(post)]);
			console.log("<%=filePath%>");
			console.log(post[index].image);
			window.location.replace("hobby.html");
		}
		if(type=="daily" && localStorage.getItem('postDaily')) {
			var post = JSON.parse(localStorage.getItem('postDaily'));
			//var index = post[post.length-1].index;
			if(post.length<2) index = 0;
			else index = post[post.length-2].index+1;
			post[index].image = "<%=filePath%>/fileUpload/<%=filename%>";
			localStorage.setItem('postDaily',[JSON.stringify(post)]);
			console.log("<%=filePath%>");
			console.log(post[index].image);
			window.location.replace("daily.html");
		}
		if(type=="suggest" && localStorage.getItem('postSuggest')) {
			var post = JSON.parse(localStorage.getItem('postSuggest'));
			//var index = post[post.length-1].index;
			if(post.length<2) index = 0;
			else index = post[post.length-2].index+1;
			post[index].image = "<%=filePath%>/fileUpload/<%=filename%>";
			localStorage.setItem('postSuggest',[JSON.stringify(post)]);
			console.log("<%=filePath%>");
			console.log(post[index].image);
			window.location.replace("suggest.html");
		}
	</script>
</body>
</html>
