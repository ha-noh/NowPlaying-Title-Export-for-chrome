const NowPlayingTitleExport = (function() {

	//choose tab, click action to flag it for use with this extension
	let selectedTab;
	let flag = false;
	//listen for updates to flagged tab
	chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
		// if(tabId !== selectedTab) return false;

		//ignore site-specific, non-informative titles
		if(info.title == 'Your stream on SoundCloud') return;
		writeToFile(info.title);
	});

	function writeToFile(title) {
		const blob = new Blob([title], {type: 'text/plain'});
		const url = URL.createObjectURL(blob);
		chrome.downloads.download({
			url: url,
			filename: 'NowPlayingExport.txt',
			conflictAction: 'overwrite'
		});
		//revokeObjectURL() causes download to fail
	}	
} ());