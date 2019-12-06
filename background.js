const NowPlayingTitleExport = (function() {
	let currentTitle = '';
	let extensionToggle = true;
	
	chrome.tabs.onUpdated.addListener(onTabUpdate);

	chrome.browserAction.onClicked.addListener(function() {
		extensionToggle = !extensionToggle;

		if(extensionToggle) {
			//retoggle listener for tab updates 
			chrome.tabs.onUpdated.addListener(onTabUpdate);

			//programatically change browser action icons here
			chrome.browserAction.setIcon({path: 'icons/on-64.png'});
		}

		else {
			//toggle listener off when extension is not active 
			chrome.tabs.onUpdated.removeListener(onTabUpdate);

			//change to "off" state icon
			chrome.browserAction.setIcon({path: 'icons/off-64.png'});
		}
	});

	function onTabUpdate(tabId, info, tab) {
		//site-specific titles to ignore
		const blacklist = /(^Spotify\s)|(\son\sSoundCloud)|(^YouTube$)/;
		if(tab.title.search(blacklist) >= 0) return;

		//whitelist domains that should trigger a file update
		const whitelist = /(youtube\.com)|(soundcloud\.com)|(spotify\.com)/;
		if(tab.audible && tab.url.search(whitelist) >= 0 && tab.title != currentTitle) writeToFile(tab.title);
	}

	function writeToFile(title) {
		const blob = new Blob([title], {type: 'text/plain'});
		const url = URL.createObjectURL(blob);
		let currentId;

		//disable chrome download shelf when a write is occurring 
		chrome.downloads.setShelfEnabled(false);
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

				//remove event listener
				chrome.downloads.onChanged.removeListener(onChange);

				//remove download from history to prevent clutter
				chrome.downloads.erase({id: downloadDelta.id}, function(){});

				//re-enable chrome download shelf when write is interrupted or completed
				chrome.downloads.setShelfEnabled(true);
			}
		}

		//store title
		currentTitle = title;
	}	
} ());