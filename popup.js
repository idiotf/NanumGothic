const select = document.getElementById("select");
chrome.storage.local.get("font", value => {
	select.querySelector(`[value=${value.font || "nanumgothic"}]`).selected = true;
});
select.addEventListener("change", function() {
	chrome.storage.local.set({
		"font": select.value
	}, function() {
		const message = document.getElementById("saved");
		message.style.visibility = "";
		console.log("saved", select.value);
		setTimeout(function() {
			message.style.visibility = "hidden";
		}, 1000);
	});
});