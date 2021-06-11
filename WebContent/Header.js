function setHeader() {
	var tag = "";
	tag = "<nav class='navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light' id='ftco-navbar'>";
	tag += "<div class='container'>";
	tag += "<a class='navbar-brand' href='/'>WWH</a>";
	tag += "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#ftco-nav' aria-controls='ftco-nav' aria-expanded='false' aria-label='Toggle navigation'>";  
	tag += "<span class='oi oi-menu'></span> Menu</button>";  
	tag += "<div class='collapse navbar-collapse' id='ftco-nav'>";    
	tag += "<ul class='navbar-nav ml-auto'>"; 
	tag += "<li class='nav-item'><a href='hobby.html' class='nav-link icon d-flex align-items-center'> 취미</a></li>";
	tag += "<li class='nav-item'><a href='daily.html' class='nav-link icon d-flex align-items-center'> 일상</a></li>";        
	tag += "<li class='nav-item'><a href='suggest.html' class='nav-link icon d-flex align-items-center'> 건의사항</a></li>";      
    tag += "<li class='nav-item'><a href='#' class='nav-link icon d-flex align-items-center'> 마이페이지</a></li>";
    tag += "</ul></div></div></nav>";      
	  
	
	document.write(tag);
}