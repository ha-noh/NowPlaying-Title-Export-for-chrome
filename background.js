const NowPlayingTitleExport = (function() {

	//choose tab, click action to flag it for use with this extension
	let selectedTab;

	//listen for updates to flagged tab
	chrome.tabs.onUpdated.addListener( function(tabId, info, tab) {
		// if(tabId !== selectedTab) return false;

		//ignore site-specific, non-informative titles
		if(info.title == 'Your stream on SoundCloud') return;
		write_title_to_file(info.title);
	});


	//write page title to new file
	function write_title_to_file(title) {
		//check if tab is open, if not open a new tab and get its id?
		let w = window.open('');
		w.document.write(`<html>
			<head>
			<title>Now Playing Title Export</title>
			</head>
			</html>`);
	}
	
}());