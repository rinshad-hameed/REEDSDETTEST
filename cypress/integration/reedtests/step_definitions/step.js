import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";


//Navigate to website
Given("Go to reed website", () => {
  //URL is set as dynamic to fetch from cypress.json based on the environments.
  cy.visit(Cypress.config().baseUrl)

  cy.wait(2000);
  cy.get("#onetrust-accept-btn-handler").click();
}),

//Search with title and location
When("I search with below criteria", (datatable) => {

    datatable.hashes().forEach((row) => {
      //Dataset passed from feature file to run on multiple set of data
      cy.get("#main-keywords").type(row.JOBTITLE);
      cy.get("#main-location").type(row.LOCATION);

      cy.get(".form-submit > .desktop-content").click();

      cy.get(".search-results").should('be.visible');

    })});

    //Validating the random 5 results
    Then('validate {int} randomly selected results for the text {string}',(countofEnries,jobTitle) => {
        cy.get('header > h3.job-result-heading__title > a').its('length').then(n=> {
        cy.log("Item count : "+n)
        var randArray = Array.from({ length: countofEnries }, () =>
        Math.floor(Math.random() * n)    
        );
        for (let i = 0; i < randArray.length; i++) {
        cy.get("header > h3.job-result-heading__title > a")
          .eq(randArray[i])
          .should("contain", jobTitle, { matchCase: false });
      }  
     })
    });

    //Validate the results from relevant locations.
    And('Validate atleast {int} results are from location {string}',(locationCount,location)=>{
      cy.get('.job-metadata__item--location').find('span:contains('+location+')').should('have.length.at.least',locationCount)
    });


    //Filter with financial services and validate the count
    When('Filter {string} Specialisms',(Specialisms)=>{     
      cy.get('#content > div.row.search-results > aside > div.refine-container > div.form-container > div:nth-child(8) > ul > li')
      .children()
      .contains(Specialisms)
      .click()  
    })

      //To Ensure next to the 'Financial Services' filter ,there is a number which is the job count for that filter. This number needs to be equal to the total jobs count after the filter is applied.
    Then('Validate the job count equal to the total jobs',()=>{
       cy.get(".selected > .count")
       .invoke("val")
       .then((ftsElement) => {
        cy.get(".col-sm-11 > .count").should("have.value", ftsElement);
    })
  });




  

