setInterval(function() {
	"use strict";
	try {
		if(!location.href.match(/^https:\/\/playentry\.org\/community\/(qna|tips)\/[0-9a-f]{24}/i)) return;
		const writing = document.querySelector(".se-viewer");
		for(const element of writing.querySelectorAll("[class*=se-ff-]")) {
			//element.style.fontFamily = "se-nanumgothic,'나눔고딕',nanumgothic,sans-serif";
			chrome.storage.local.get("font", value => {
				element.className = element.className.replace(/se-ff-(.+)/s, "se-ff-" + (value.font || "nanumgothic"));
			});
		}
	} catch(e) {
		console.log(e);
	}
});
