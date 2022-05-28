
function getCurrentTabId() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      resolve(tab[0].id);
    });
  });
}

const commandMap = {
  "split-screen-left": {
    width: window.screen.availWidth / 2,
    height: window.screen.availHeight,
    left: 0,
  },
  "split-screen-right": {
    width: window.screen.availWidth / 2,
    height: window.screen.availHeight,
    left: window.screen.availWidth / 2,
  },
  "full-screen": {
    width: window.screen.availWidth,
    height: window.screen.availHeight,
    left: 0,
  },
};
chrome.commands.onCommand.addListener(async (command) => {
  const tabId = await getCurrentTabId();
  chrome.windows.create({
    tabId,
    ...commandMap[command],
  });
});
