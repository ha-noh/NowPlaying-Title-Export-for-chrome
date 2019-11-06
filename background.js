const NowPlayingTitleExport = (function() {
	let currentTitle = '';

	//listen for updates to audible tabs
	chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
		//site-specific titles to ignore
		const blacklist = /(^Spotify\s)|(\son\sSoundCloud)/;
		if(tab.title.search(blacklist) >= 0) return;

		//whitelist domains through the regular expression re
		const whitelist = /(youtube\.com)|(soundcloud\.com)|(spotify\.com)/;
		if(tab.audible && tab.url.search(whitelist) >= 0 && tab.title != currentTitle) writeToFile(tab.title);
	});

	function writeToFile(title) {
		const blob = new Blob([title], {type: 'text/plain'});
		const url = URL.createObjectURL(blob);
		chrome.downloads.download({
			url: url,
			filename: 'NowPlayingExport.txt',
			conflictAction: 'overwrite',
			saveAs: false
		});

		//add listener for download completion to deallocate url

		//store title
		currentTitle = title;
	}	
} ());