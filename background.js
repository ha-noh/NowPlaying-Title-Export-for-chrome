const NowPlayingTitleExport = (function() {

	//choose tab, click action to flag it for use with this extension
	let selectedTab;
	let nowPlaying;
	let flag = false;
	//listen for updates to flagged tab
	chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
		// if(tabId !== selectedTab) return false;

		//ignore site-specific, non-informative titles
		if(info.title == 'Your stream on SoundCloud') return;
		getFilePermission(info.title);
	});


	//access FileSystem-API
	function getFilePermission(title) {
		nowPlaying = title;
		navigator.webkitPersistentStorage.requestQuota(75, function() {
			window.webkitRequestFileSystem(window.PERSISTENT, 75, writeToFile, function() {
				if(!flag) {
					alert('could not write ' + title + ' to file.');
					flag = true;
				}
			});
		});
	}

	//write page title to new file
	function writeToFile(localstorage) {
		localstorage.root.getFile('NowPlayingExport.txt', {create: true}, function(file) {
			file.createWriter(function(content) {
				const blob = new Blob([nowPlaying], {type: 'text/plain'});
				content.write(blob);
			});
		});
	}
} ());