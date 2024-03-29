export default {
  get tracker() {
    if (typeof window === 'undefined') {
      return null;
    }
    if (window._paq) {
      return window._paq;
    } else {
      return (window._paq = []);
    }
  },

  track(...args) {
    let tracker = this.tracker;

    if (tracker) {
      tracker.push(args);
    }
  },

  trackEvent(...args) {
    this.track("trackEvent", ...args);
  },

  trackSearch(term) {
    this.track("trackSiteSearch", term);
  },

  trackSelectedDataBroker(db) {
    this.trackEvent("Selected Data Broker", db);
  },

  trackOptOut(domain, from) {
    this.trackEvent("Opt-out", domain, from);
  },

  trackSocialShare(network, sourcePage) {
    this.trackEvent("Social Share", "Social Share From " + sourcePage, network);
  },

  trackDonate(type, source) {
    this.trackEvent("Donation Click", type, "Donation From " + source);
  },
  
  trackSubscribe(source) {
    this.trackEvent("Subscribe Click", "Subscribe From " + source);
  },

  trackWebExtension(browser, sourcePage) {
    this.trackEvent(
      "Click Web Extension",
      "Click Web Extension From " + sourcePage,
      browser
    );
  },

  trackMarkerClick(domain) {
    this.trackEvent("Marker Click", domain);
  },
};
