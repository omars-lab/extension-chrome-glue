// https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
// I can add code that runs across pages here ...

// In this extension, I will be leveraging the serviceworker to handle omnibox requests
// https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/omnibox/new-tab-search
// https://developer.chrome.com/docs/extensions/reference/api/omnibox


// Not needed, handled in manifest ...
//   chrome.action.onClicked.addListener(() => {
//     chrome.tabs.create({ url: 'logs.html' });
//   });

// Update getDefaultSuggestion to extract URL from details ...
// Update the defaultSuggestion based on the enttered text ...
const appendLog = (text) => {
    chrome.runtime.sendMessage({
        type: 'append-log',
        text
    });
};

function padNum(num, padding){
    return num.toString().padStart(padding, "0")
}

function getDateRelativeToToday(options) {
    const shiftOptions = options || {};
    const date = new Date();
    let day = padNum(date.getDate() + (shiftOptions.days || 0), 2);
    let month = padNum(date.getMonth() + 1 + (shiftOptions.month || 0), 2);
    let year = (date.getFullYear() + (shiftOptions.year || 0)).toString();
    return [year, month, day]
}

const suggestions = [
    {
        content: "https://blog.bytesofpurpose.com/",
        description: 'blog',
        deletable: true
    },
    {
        content: "https://github.com/omars-lab",
        description: 'github',
        deletable: true
    },
    {
        content: "https://www.bytesofpurpose.com",
        description: 'portfolio',
        deletable: true
    },
    {
        content: `noteplan://x-callback-url/openNote?filename=${getDateRelativeToToday({days: 0}).join("")}.txt`,
        description: "today's todos",
        deletable: true
    },
    {
        content: `noteplan://x-callback-url/openNote?filename=${getDateRelativeToToday({days: -1}).join("")}.txt`,
        description: "yesterdays's todos",
        deletable: true
    },
    {
        content: `noteplan://x-callback-url/openNote?filename=${getDateRelativeToToday({days: 1}).join("")}.txt`,
        description: "tomorrow's todos",
        deletable: true
    }
];

async function setDefaultSuggestion(url, description) {
    chrome.omnibox.setDefaultSuggestion({
        description:
          `${description} <url>${url}</url>`,
      });
    await chrome.storage.sync.set({ defaultSuggestionUrl: url });
}

chrome.omnibox.onInputStarted.addListener(async function () {
    appendLog('💬 onInputStarted');
    // Default Suggestion is pointless ..
    // https://stackoverflow.com/questions/17222682/google-chrome-omnibox-api-automatically-select-first-option-on-enter
    await setDefaultSuggestion("https://www.nfl.com", "Learn more about the suggestions.");
});

chrome.omnibox.onInputChanged.addListener(async function (text, suggest) {
    appendLog('✏️ onInputChanged: ' + text);
    const toSuggest = suggestions.filter((s) => s.description.includes(text));
    await setDefaultSuggestion(toSuggest[0].content, toSuggest[0].description.replace(text, `<match>${text}</match>`));
    // Remove the first suggestion from the array since we just suggested it
    toSuggest.shift();
    suggest(toSuggest);
});

chrome.omnibox.onInputEntered.addListener(async function (text, disposition) {
    appendLog(`✔️ onInputEntered: text -> ${text} | disposition -> ${disposition}`);
    // Logic to replace tab with suggestion:
    //  https://stackoverflow.com/questions/17222682/google-chrome-omnibox-api-automatically-select-first-option-on-enter
    // From https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/omnibox/new-tab-search/background.js
    var newURL;
    if ( (text.substr(0, 8) == 'https://') || (text.substr(0, 7) == 'http://')) {
        newURL = text;
        appendLog('⚠️ handlingSuggestion: ' + text);
    } else {
        // If text does not look like a URL, user probably selected the default suggestion, eg reddit.com for your example
        const data = await chrome.storage.sync.get("defaultSuggestionUrl");
        newURL = data.defaultSuggestionUrl;
        // newURL = 'info.html';
        appendLog('⚠️ handlingDefaultSuggestion: ' + newURL);
    }
    // Encode user input for special characters , / ? : @ & = + $ #
    // const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
    chrome.tabs.create({ url: newURL });
});

chrome.omnibox.onInputCancelled.addListener(function () {
    appendLog('❌ onInputCancelled');
});

chrome.omnibox.onDeleteSuggestion.addListener(function (text) {
    appendLog('⛔ onDeleteSuggestion: ' + text);
});

// ---------------------------------
// # Appendix 
// Useful references
// https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns
//    all_urls is a special pattern: 
//    "<all_urls>",
// redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
// chrome.webRequest.onBeforeRequest.addListener(