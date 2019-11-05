# Now Playing Title Export for Chrome
 Writes the title of an audible Youtube/Souncloud/etc tab to a plain .txt file. The intent is to have a dynamically updated file that can be read by programs like OBS (Open Broadcaster Software).

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