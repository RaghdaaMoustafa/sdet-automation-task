module.exports = {
  url: "https://www.linkedin.com/",
  elements: {
    joinNowBtn: 'a[href*="join"]',
    emailInput: "input#email-address",
    passwordInput: "input#password",
    agreeJoinBtn: "button.join-form__form-body-submit-button",
    firstNameInput: "input#first-name",
    lastNameInput: "input#last-name",
    continueBtn: "button#join-form-submit",
    securityCheckSection: "#challenge-dialog",
  },

  commands: [
    {
      openPage() {
        return this.navigate().waitForElementVisible("body", 5000);
      },

      clickJoinNow() {
        return this.click("@joinNowBtn").waitForElementVisible(
          "@emailInput",
          5000
        );
      },

      enterEmailAndPassword(email, password) {
        return this.setValue("@emailInput", email).setValue(
          "@passwordInput",
          password
        );
      },

      clickAgreeAndJoin() {
        return this.click("@agreeJoinBtn");
      },

      handleNameOrSecurity(firstName, lastName) {
        const self = this;
        return this.api.element(
          "css selector",
          self.elements.firstNameInput.selector,
          function (res) {
            if (res.status === 0) {
              self
                .setValue("@firstNameInput", firstName)
                .setValue("@lastNameInput", lastName)
                .click("@continueBtn")
                .waitForElementVisible("@securityCheckSection", 10000);
            } else {
              self.waitForElementVisible("@securityCheckSection", 10000);
            }
          }
        );
      },
    },
  ],
};
