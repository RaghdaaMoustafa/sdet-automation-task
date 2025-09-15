const searchData = require('../../data-files/myStoreData.json');

module.exports = {
  'Home Page Search Test': function (browser) {
    const homePage = browser.page.myStorePage();

    homePage
      .openPage()
      .searchFor(searchData.searchTerm)
      .verifyResults(searchData.searchTerm);

    browser.end();
  }
};
