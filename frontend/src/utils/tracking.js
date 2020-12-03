
export default {
  get tracker() {
    if (window._paq) {
      return window._paq;
    } else {
      return window._paq = [];
    }
  },

  track(...args) {
    let tracker = this.tracker;

    if (tracker) {
      tracker.push(args);
    }
  },

  trackEvent(...args) {
    this.track('trackEvent', ...args);
  },

  trackSearch(term) {
    this.track('trackSiteSearch', term);
  },

  trackSocialShare(network, sourcePage) {
    this.trackEvent('Social Share', 'Social Share From ' + sourcePage, network);
  },

  trackButtonLinkClick(device) {
    this.trackEvent('Add Session Button Link Click', device);
  },

  trackTimePeriod(timePeriod) {
    this.trackEvent('trackTimePeriod', timePeriod);
  },
  
  trackSessionClick(sessionTitle) {
    this.trackEvent('trackSessionClick', sessionTitle);
  },  
};
