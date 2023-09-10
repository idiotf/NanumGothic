setInterval(async function() {
	"use strict";
	try {
		if(!location.href.match(/^https:\/\/playentry\.org\/community\/(qna|tips)\/[0-9a-f]{24}/i)) return; // 노팁, 묻답이 아니면 적용하지 않음
		const writing = document.querySelector(".se-viewer"); // 커뮤니티 글의 내용이 들어있는 DOM 요소
		const url = { // 외부 폰트 다운로드 URL
			"suit": "https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css",
		};
		const fontStylesheet = { // 스타일 시트
			"system": 'HelveticaNeue, "Helvetica Neue", helvetica, AppleSDGothicNeo, arial, "malgun gothic", "\B9D1\C740   \ACE0\B515", sans-serif, Meiryo',
			"_suit": "SUIT, sans-serif",
			"nanumgothic": "se-nanumgothic, arial, \\B098\B214\ACE0\B515, nanumgothic, sans-serif, Meiryo",
			"nanummyeongjo": "se-nanummyeongjo, arial, \\B098\B214\BA85\C870, nanummyeongjo, serif, simsun",
			"nanumbarungothic": "se-nanumbarungothic, arial, \\B098\B214\BC14\B978\ACE0\B515, nanumbarungothic, sans-serif, Meiryo",
			"nanumsquare": "se-nanumsquare, arial, \\B098\B214\ACE0\B515, nanumgothic, sans-serif, Meiryo",
			"nanummaruburi": "se-nanummaruburi, arial, \\B9C8\B8E8\BD80\B9AC, nanummaruburi, sans-serif, Meiryo",
			"nanumdasisijaghae": "se-nanumdasisijaghae, arial, \\B2E4\C2DC\C2DC\C791\D574, nanumdasisijaghae, sans-serif, Meiryo",
			"nanumbareunhipi": "se-nanumbareunhipi, arial, \\BC14\B978\D788\D53C, nanumbareunhipi, sans-serif, Meiryo",
			"nanumuriddalsongeulssi": "se-nanumuriddalsongeulssi, arial, \\C6B0\B9AC\B538\C190\AE00\C528, nanumuriddalsongeulssi, sans-serif, Meiryo",
		};
		const font = await new Promise(function(resolve) { // 사용자가 설정한 폰트 찾기
			chrome.storage.local.get("font", value => resolve(value.font));
		});
		// 구버전 코드
		//for(const element of writing.querySelectorAll("[class*=se-ff-]")) {
		//	//element.style.fontFamily = "se-nanumgothic,'나눔고딕',nanumgothic,sans-serif";
		//	chrome.storage.local.get("font", value => {
		//		if(value.font[0] === "_") {
		//			if(!document.getElementById("suit-sheet")) {
		//				const stylesheet = document.createElement("link");
		//				stylesheet.href = "https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css";
		//				stylesheet.rel = "stylesheet";
		//				stylesheet.id = "suit-sheet";
		//				document.head.appendChild(stylesheet);
		//			}
		//			element.style.fontFamily = "SUIT, sans-serif";
		//		} else element.style.fontFamily = "";
		//		element.className = element.className.replace(/se-ff-(.+)/s, "se-ff-" + (value.font || "nanumgothic"));
		//	});
		//}
		if(font[0] === "_" && !document.getElementById(font.substring(1))) { // 엔트리에서 쓰이지 않는 폰트라면(외부 폰트)
			const stylesheet = document.createElement("link");
			stylesheet.href = url[font.substring(1)];
			stylesheet.rel = "stylesheet";
			stylesheet.id = font.substring(1);
			document.head.appendChild(stylesheet);
		}
		if(!document.getElementById(font)) { // 사용자 지정 폰트가 바뀌었을 때
			const stylesheet = document.createElement("style");
			const sheets = document.querySelectorAll(".ng-sheet");
			for(const oldSheet of sheets) {
				oldSheet.remove();
			}
			stylesheet.className = "ng-sheet";
			stylesheet.innerText = `
				.se-viewer * {
					font-family: ${fontStylesheet[font]} !important;
				}
			`;
			stylesheet.id = font;
			document.head.appendChild(stylesheet);
		}
	} catch(e) {
		console.log(e);
	}
});
