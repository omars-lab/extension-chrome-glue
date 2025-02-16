Glue Redirector Chrome Extension
=====================

# Development
* Started with [this chrome extension](https://github.com/bendavis78/chrome-extension-redirector/tree/master)
* Updated it to leverage [google's redirection rules](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)

# Extending
1. Craft more rules in the `rules` dir: https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-RuleCondition-urlFilter
2. Reference them in the rules section in the `manifest.json`
3. [Reload the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)