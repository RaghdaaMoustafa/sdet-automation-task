module.exports = {
  url: "https://automationpractice.multiformis.com/",

  elements: {
    searchInput: "input#search_query_top",
    searchButton: 'button[name="submit_search"]',
    searchResults: ".product_list .product-container",
    noResultsMessage: ".alert-warning",
  },

  commands: [
    {
      openPage() {
        return this.navigate()
          .waitForElementVisible("body", 5000)
          .waitForElementVisible("@searchInput", 10000);
      },

      searchFor(term) {
        return this.waitForElementVisible("@searchInput", 5000)
          .setValue("@searchInput", term)
          .waitForElementVisible("@searchButton", 5000)
          .click("@searchButton")
          .waitForElementVisible("@searchResults", 10000);
      },

      verifyResults(term) {
        const self = this;

        return this.api.elements(
          "css selector",
          this.elements.searchResults.selector,
          function (result) {
            if (result.value.length === 0) {
              self.verify.ok(false, "No search results found");
              return;
            }

            result.value.forEach((element, index) => {
              const elementId =
                element.ELEMENT ||
                element["element-6066-11e4-a52e-4f735466cecf"];

              if (!elementId) {
                self.verify.ok(
                  false,
                  `Could not find element ID for product #${index + 1}`
                );
                return;
              }

              self.api.elementIdText(elementId, (res) => {
                const productName = res.value.trim().toLowerCase();

                if (!productName.includes(term.toLowerCase())) {
                  self.verify.ok(
                    false,
                    `Potential bug: Product #${
                      index + 1
                    } does not match search term "${term}" -> "${productName}"`
                  );
                } else {
                  self.verify.ok(
                    true,
                    `Product #${
                      index + 1
                    } matches search term "${term}" -> "${productName}"`
                  );
                }
              });
            });
          }
        );
      },
    },
  ],
};
