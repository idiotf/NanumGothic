setInterval(function() {
	"use strict";
	if(!location.href.match(/^https:\/\/playentry\.org\/community\/(qna|tips)\/[0-9a-f]{24}/i)) return;
	const writing = document.querySelector(".se-viewer");
	for(const element of writing.querySelectorAll("*")) {
		element.style.fontFamily = "se-nanumgothic,\\B098\B214\ACE0\B515,nanumgothic,sans-serif";
	}
});
