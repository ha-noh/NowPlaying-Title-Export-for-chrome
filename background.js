const NowPlayingTitleExport = (function() {
	let currentTitle = '';

	//listen for updates to audible tabs
	chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {

		//ignore site-specific, non-informative titles
		if(info.title == 'Your stream on SoundCloud') return;
		if(tab.audible && tab.title != currentTitle) writeToFile(tab.title);
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
		//revokeObjectURL() causes download to fail
		currentTitle = title;
	}	
} ());