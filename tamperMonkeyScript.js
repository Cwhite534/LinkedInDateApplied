// ==UserScript==
// @name         LinkedIn Applied at Date
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces vague date applied message on LinkedIn job postings with the exact date
// @author       Casey White
// @match        https://www.linkedin.com/jobs/view/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.13/dayjs.min.js
// @icon         https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://linkedin.com&size=64
// @grant        none
// @run-at document-start
// ==/UserScript==

(function () {
  'use strict';

  // Hook into XMLHttpRequest (XHR)
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...args) {
    this._requestUrl = url;
    return originalOpen.apply(this, [method, url, ...args]);
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    console.log(`Req URL: ${this._requestUrl}`);
    this.addEventListener('readystatechange', () => {
      if (this.readyState !== 4 || !/TOP_CARD/.test(this._requestUrl)) { // Ready state 4 means response is complete
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          const applicationInfo = json.included?.find(item => item.$type === 'com.linkedin.voyager.dash.jobs.JobSeekerApplicationDetail');

          if (!applicationInfo?.applied) return;

          const formattedDate = dayjs(new Date(applicationInfo.appliedAt)).format('MM-DD-YYYY h:mm:ss A');

          setTimeout(() => {
            const dateElement = document.querySelector('.post-apply-timeline__entity-time');
            if (dateElement) {
              dateElement.innerHTML = formattedDate;
            }
          }, 1000); // Timeout is needed because element isn't immediately rendered
        } catch (error) {
          console.error('Error parsing LinkedIn API response:', error);
        }
      };
      reader.readAsText(this.response);
    });

    return originalSend.apply(this, arguments);
  };
})();
