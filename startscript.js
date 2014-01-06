var IMAGES = ['jpg', 'png']
 
// select helper
var _$ = function (s) {
    return document.querySelectorAll(s);
}
 
/**
	injectJS(srcURL ,  callback)
	injectJS(srcArray ,  insertBefore)
*/
 
var injectJS = function () {
 
    var s = document.createElement("script");
    s.type = "text/javascript";
 
    if (arguments[0] instanceof Array) {
        
	// body inline script
        var innerTextNode = document.createTextNode(arguments[0].join('\n'));
        s.appendChild(innerTextNode);
        try {
            var insertBefore = arguments[1];
            insertBefore.parenNode.insertBefore(insertBefore, s);
        } catch (e) {
            _$('head')[0].appendChild(s);
        }
    } else {
        s.src = arguments[0];
        s.addEventListener("load", arguments[1], false);
        _$('head')[0].appendChild(s);
    }
   
}
 
 
var injectCSS = function () {
	if (arguments[0] instanceof Array) {
		
		var e = document.createElement("style");
		e.type = "text/css";
		var innerTextNode = document.createTextNode(arguments[0].join('\n'));
		e.appendChild(innerTextNode);
		
		_$('head')[0].appendChild(e);
		
	} else {
		
		var e = document.createElement("link");
		e.rel = "stylesheet";
		e.type = "text/css";
		e.href = arguments[0];
		_$('head')[0].appendChild(e);
	}
}
 
 
// finding images links 
var links = _$('p a')
for (var i = 0; i < links.length; i++) {
    // finding Images (PNG , JPG)
    var content = links[i].href;
    // escape dropbox Links
    if (content.indexOf('dropbox') > -1) continue;
 
    type = content.slice(-3).toLowerCase();
    if (IMAGES.indexOf(type) > -1) {
	    
	    links[i].innerHTML = "<br><img src='" + content + "' style='max-width:100%;'><br>";
    }
}
 
// highlight.js
// TODO: implement linenumbers
injectJS('//highlightjs.org/static/highlight.pack.js', function () {
	
	injectCSS([
	"#content #page pre .comment {",
	"	margin-bottom: initial;",
	"	padding-bottom: initial;",
	"	border-bottom: 0;",
	"}"
	]);
	
	injectCSS("//highlightjs.org/static/styles/tomorrow-night-eighties.css");
	injectJS(["hljs.initHighlightingOnLoad();"]);
});
 
// MathJAX		
URL_MathJAX = "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML";
 
// inject MathJax library
injectJS(URL_MathJAX, function () {
 
    // inject mathJax config
    var scriptConfig = document.createElement("script");
    scriptConfig.type = "text/x-mathjax-config"
    scriptConfig.innerText = "MathJax.Hub.Config({tex2jax: {inlineMath: [['#$','$'] ]}});"
    _$('head')[0].appendChild(scriptConfig);
	
});

// This highlights the referenced comment, if there is any in the URL 
var comment_match = document.URL.match( /#comment_(\d+)$/ ); 
if ( comment_match instanceof Array ) {
    var comment = _$('div#comment-' + comment_match[1] + ' div.comment_wrapper div.comment_content')[0];
    comment.style.backgroundColor = "#FFFFCC";
}