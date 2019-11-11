# Now Playing Title Export for Chrome
 Writes the title of an audible Youtube/Souncloud/etc tab to a plain .txt file. The intent is to have a dynamically updated file that can be read by programs like OBS (Open Broadcaster Software).

## How it works
* The extension will listen for a Chrome tab of a specific domain (e.g. YouTube, Spotify, SoundCloud) to update, and download a .txt file containing the title of the tab. 
* Downloads will happen silently and will be removed from the download history upon completion/interruption (so you don't have 50 occurences of `NowPlayingExport.txt` in your history).
* If a tab is updated and (1) its title has not changed from the last file downloaded, (2) the domain does not match the list of whitelisted domains, or (3) the updated tab title has a blacklisted phrase, a new file will not be downloaded.

## Dependencies
* Chrome 45 or higher (needs the audible property in the chrome.tabs API, as well as the chrome.downloads API)

## Setup
1. Download the repository
2. Turn on Developer Mode in Chrome (to allow unpacked extensions)
3. Open chrome://extensions and select the "Load unpacked" option
4. The program should appear at the top as `'Now Playing' Title Export`, or something similar. The extension will now download a .txt file called `NowPlayingExport.txt` the next time a chrome tab produces audio. 
5. For use with OBS: add a text source and point it to the location of this new text file.

## Notes
* The extension will download a new file every time a tab in Chrome produces audio, *if* its title differs from the title currently on file. If you pause and play the same video/song, a new file will not be downloaded.
* If you have multiple tabs producing audio, each time a tab updates its title it will overwrite your current `NowPlayingExport.txt` file.
* If you run into a situation where the .txt file does not reflect the current tab title, try forcibly updating that specific tab. There are many ways to achieve this, e.g. by pausing the audio and waiting for the tab to be inaudible (loses the speaker icon in the tab title), refreshing, muting and unmuting the tab in chrome, etc.