module.exports = {
  url: "https://www.linkedin.com/",
  elements: {
    joinNowBtn: 'a[href*="join"]',
    emailInput: "input#email-address",
    passwordInput: "input#password",
    agreeJoinBtn: "button.join-form__form-body-submit-button",
    firstNameInput: "input#first-name",
    lastNameInput: "input#last-name",
    continueBtn: 'button#join-form-submit',
    securityCheckSection:
      "#challenge-dialog",
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
        return this.click("@agreeJoinBtn").waitForElementVisible(
          "@firstNameInput",
          5000
        );
      },

      enterFirstAndLastName(firstName, lastName) {
        return this.setValue("@firstNameInput", firstName).setValue(
          "@lastNameInput",
          lastName
        );
      },

      clickContinueAndVerifySecurity() {
        return this.click("@continueBtn").waitForElementVisible(
          "@securityCheckSection",
          5000
        );
      },
    },
  ],
};
