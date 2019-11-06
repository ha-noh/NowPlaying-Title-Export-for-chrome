const NowPlayingTitleExport = (function() {
	let currentTitle = '';
	let extensionToggle = false;
	

	chrome.browserAction.onClicked.addListener(function() {
		extensionToggle = !extensionToggle;

		if(extensionToggle) {
			alert('Now Playing export enabled');

			//disable chrome download shelf when extension is active
			chrome.downloads.setShelfEnabled(false);

			//listen for updates to audible tabs
			chrome.tabs.onUpdated.addListener(onTabUpdate);

			//programatically change browser action icons here
		}

		else {
			alert('Now Playing export disabled');

			//re-enable chrome download shelf when the extension is not active
			chrome.downloads.setShelfEnabled(true);

			//remove listener when extension is not active 
			chrome.tabs.onUpdated.removeListener(onTabUpdate);
		}
	});

	function onTabUpdate(tabId, info, tab) {
		//site-specific titles to ignore
		const blacklist = /(^Spotify\s)|(\son\sSoundCloud)|(^YouTube$)/;
		if(tab.title.search(blacklist) >= 0) return;

		//whitelist domains through the regular expression re
		const whitelist = /(youtube\.com)|(soundcloud\.com)|(spotify\.com)/;
		if(tab.audible && tab.url.search(whitelist) >= 0 && tab.title != currentTitle) writeToFile(tab.title);
	}

	function writeToFile(title) {
		const blob = new Blob([title], {type: 'text/plain'});
		const url = URL.createObjectURL(blob);
		let currentId;

		chrome.downloads.download({
			url: url,
			filename: 'NowPlayingExport.txt',
			conflictAction: 'overwrite',
			saveAs: false
		}, id => currentId = id);

		chrome.downloads.onChanged.addListener(onChange);

		function onChange(downloadDelta) {
			//if download complete or interrupted
			if(downloadDelta.id === currentId && downloadDelta.state && downloadDelta.state !== 'in_progress') {
				URL.revokeObjectURL(url);
				chrome.downloads.onChanged.removeListener(onChange);
				//remove download from history to prevent clutter
				chrome.downloads.erase({id: downloadDelta.id}, function(){});
			}
		}

		//store title
		currentTitle = title;
	}	
} ());