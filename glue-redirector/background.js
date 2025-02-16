// I can add code that runs across pages here ...

// // https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     var redirects, pattern, from, to, redirectUrl;
//     redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
//     for (var i = 0; i < redirects.length; i++) {
//       from = redirects[i][0];
//       to = redirects[i][1];
//       try {
//         pattern = new RegExp(from, 'ig');
//       } catch (err) {
//         //bad pattern
//         continue;
//       }
//       match = details.url.match(pattern);
//       if (match) {
//         redirectUrl = details.url.replace(pattern, to);
//         if (redirectUrl != details.url) {
//           return {
//             redirectUrl: redirectUrl
//           };
//         }
//       }
//     }
//     return {};
//   }, {
//     urls: [
//       // all_urls is a special pattern: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns
//       "<all_urls>",
//     ],
//   },
//   []
// );