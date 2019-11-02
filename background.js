const NowPlayingTitleExport = (function() {

	//choose tab, click action to flag it for use with this extension
	let selectedTab;

	//listen for updates to flagged tab
	chrome.tabs.onUpdated.addListener( function(tabId, info, tab) {
		// if(tabId !== selectedTab) return false;

		//ignore site-specific, non-informative titles
		if(info.title == 'Your stream on SoundCloud') return;
		write_str_to_window(info.title);
	});


	//write page title to new file
	function write_str_to_window(str) {
		let title = 'Now Playing Title Export';

		//open a new Now Playing tab if it isn't already, else set w to the window object of the open tab
		//callback function runs even when query finds no matches 
		chrome.tabs.query({title}, function(tabs){
			if(tabs.length) {

			} 

			else {

			}
		});

		
		// w.document.write(`<html>
		// 	<head>
		// 	<title>${title}</title>
		// 	</head>
		// 	</html>`);
	}
}());