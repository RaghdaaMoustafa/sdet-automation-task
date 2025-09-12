
module.exports = {
  'Open the page and verify page loaded': function (browser) {
    browser
      .url('http://s3-design-sample-site.s3-website-us-west-2.amazonaws.com/')
      .waitForElementVisible('body', 5000, 'Page loaded successfully')
  },

  'Navigate to Contact and assert contact page loaded': function (browser) {
    browser
      .click('a[href="contact.html"]')
      .waitForElementVisible('body', 5000, 'Contact page body is visible')
      .assert.urlEquals(
        'http://s3-design-sample-site.s3-website-us-west-2.amazonaws.com/contact.html',
        'Contact page loaded'
      );
  },

  'Click Back from browser and assert user at home page': function (browser) {
    browser
      .back()
      .waitForElementVisible('body', 5000, 'Home page body is visible after going back')
      .assert.urlEquals(
        'http://s3-design-sample-site.s3-website-us-west-2.amazonaws.com/',
        'Returned to home page'
      )
      .end();
  }
};
