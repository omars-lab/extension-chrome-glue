Glue Redirector Chrome Extension
=====================

# Changelog
* 2025-02-15 Started with [this chrome extension](https://github.com/bendavis78/chrome-extension-redirector/tree/master)
* 2025-02-15 Updated it to leverage [google's redirection rules](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest)
* 2025-02-16 Encorporated omnibox logic per this [example](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/omnibox/simple-example).
* 2025-02-16 Added logic to get default suggestion from storage.

# Extending
1. Craft more [rules](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-RuleCondition-urlFilter) in the `rules` dir.
2. Reference them in the rules section in the `manifest.json` and add the proper entries to `host_permissions`.
3. [Reload the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).