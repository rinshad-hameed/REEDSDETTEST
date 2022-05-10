
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given('I go to reed website', ()=>{

    cy.visit(Cypress.config('baseUrl'));

    cy.wait(5000);
    cy.get('#onetrust-accept-btn-handler').click()  

}),

When('search with below criteria', datatable => {
    datatable.hashes().forEach(row => {
    //Bonus1 did parameterized :and Performs a search for 'engineer' jobs in 'South West London'


    cy.get('#main-keywords').type(row.JOBTITLE)
    cy.get('#main-location').type(row.LOCATION)
    

    cy.get('.form-submit > .desktop-content').click()

    cy.get('.search-results')
    
     let resultList = 0;   
        //5 randomly selected results contain the 'engineer' in the search result page headings
    cy.get('header > h3.job-result-heading__title > a').each(($el, index) => {
        expect($el).to.contain('Engineer')
         
        cy.log('index is : '+resultList)
    
    })



    var randArray =  Array.from({length: 25}, () => Math.floor(Math.random() * 25));   

    cy.log("The array is : "+randArray + " ELe count is : "+resultList)    

    for (let i = 0; i < 4; i++) {
        cy.get('header > h3.job-result-heading__title > a').eq(1).should('contain',"Engineer", { matchCase: false});
      }

  
        //Filter 'Financial Services' jobs from the jobs' specialisms.
    cy.get('.facets > :nth-child(11)').contains('Financial Services').click()

    //To Ensure next to the 'Financial Services' filter ,there is a number which is the job count for that filter. This number needs to be equal to the total jobs count after the filter is applied.
    cy.get('.selected > .count').invoke('val').then(ftsElement => {
    cy.get('.col-sm-11 > .count').should('have.value', ftsElement)
    })



}
)});