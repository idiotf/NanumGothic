setInterval(function() {
	"use strict";
	try {
		if(!location.href.match(/^https:\/\/playentry\.org\/community\/(qna|tips)\/[0-9a-f]{24}/i)) return;
		const writing = document.querySelector(".se-viewer");
		for(const element of writing.querySelectorAll("[class*=se-ff-]")) {
			//element.style.fontFamily = "se-nanumgothic,'나눔고딕',nanumgothic,sans-serif";
			chrome.storage.local.get("font", value => {
				if(value.font[0] === "_") {
					if(!document.getElementById("suit-sheet")) {
						const stylesheet = document.createElement("link");
						stylesheet.href = "https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css";
						stylesheet.rel = "stylesheet";
						stylesheet.id = "suit-sheet";
						document.head.appendChild(stylesheet);
					}
					element.style.fontFamily = "SUIT, sans-serif";
				} else element.style.fontFamily = "";
				element.className = element.className.replace(/se-ff-(.+)/s, "se-ff-" + (value.font || "nanumgothic"));
			});
		}
	} catch(e) {
		console.log(e);
	}
});
