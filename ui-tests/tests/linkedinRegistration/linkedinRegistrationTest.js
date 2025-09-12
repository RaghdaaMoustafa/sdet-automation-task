const registrationData = require('../../data-files/linkedinRegistrationData.json');

module.exports = {
  'LinkedIn Registration Test': function (browser) {
    const registerPage = browser.page.linkedinRegistrationPage();

    registerPage
      .openPage()                                      
      .clickJoinNow()                                  
      .enterEmailAndPassword(registrationData.email, registrationData.password)
      .clickAgreeAndJoin()                             
      .enterFirstAndLastName(registrationData.firstName, registrationData.lastName)
      .clickContinueAndVerifySecurity();              

    browser.end();
  }
};
