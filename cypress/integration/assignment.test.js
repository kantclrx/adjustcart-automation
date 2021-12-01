const catalog_tab = '#block_top_menu'
const t_shirts_page_url = 'http://automationpractice.com/index.php?id_category=5&controller=category'
const cart_icon = 'a[title="View my shopping cart"]'
const cart_page_url = 'http://automationpractice.com/index.php?controller=order'
const unit_price = '#product_price_1_1_0'
const increase_qty_btn = '#cart_quantity_up_1_1_0_0'
const current_qty = 'input[name="quantity_1_1_0_0_hidden"]'
const sum_qty = '#summary_products_quantity'
const total_product_price = '#total_product_price_1_1_0'
const decrease_qty_btn = '#cart_quantity_down_1_1_0_0'
const trash_icon = '#1_1_0_0'



//Prerequisite for each case
//Add 1 product to user cart
beforeEach("Add product to cart", () => {
    cy.visit(Cypress.config('baseUrl'))
    cy.get(catalog_tab).contains("T-shirts").focus().click()  //Or you just force click ot click({force:true})
    cy.url().should('eq', t_shirts_page_url)
    cy.get('[data-id-product=1]').contains("Add to cart").click()
    cy.get('span[title="Continue shopping"]').click()
    cy.get(cart_icon).click()
    cy.url().should('eq', cart_page_url)
    cy.get('.navigation_page').should('have.text' , 'Your shopping cart')
})

describe("Adjust cart", () => {
    it("User can increase/decrease amount of product", () => {
        //Try to get price per unit
        cy.get(unit_price).then((ele) => {
            const str_price = ele.text().replace("$", "")
            var int_price = parseFloat(str_price)
            cy.get(increase_qty_btn).click() //Adjust product quantity from 1 to 2
            cy.get(current_qty).should('have.value', '2').then((ele) => {
                cy.get(sum_qty).should('have.text', '2 Products')
                const qty = ele.val()
                const total_price = qty * int_price
                cy.get(total_product_price).should('have.text', '$' + total_price)//Check total price after "increase" quantyty of product
                cy.get(decrease_qty_btn).click() //Adjust product quantity from 2 to 1
                cy.get(current_qty).should('have.value', '1').then((ele) => {
                    cy.get(sum_qty).should('have.text', '1 Product')
                    const qty = ele.val()
                    const total_price = qty * int_price
                    cy.get(total_product_price).should('have.text', '$' + total_price)//Check total price after "decrease" quantyty of product
                })
            })
        })
    })

    it("User can delete product from cart by decrease amount of product", () => {
        cy.get(decrease_qty_btn).click()
        cy.get('.alert').should('be.visible').and('have.text' , 'Your shopping cart is empty.')
    })

    it("User click bin icon to delete product from cart", () => {
        cy.get(trash_icon).click()
        cy.get('.alert').should('be.visible').and('have.text' , 'Your shopping cart is empty.')
    })
})
