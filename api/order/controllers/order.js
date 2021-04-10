'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_k4JGBGtGK4sexyhT8MrEUCuwVqgzef' });

const validateOrder = (orderItems, ctx) => {
    console.log(orderItems);
    if(!orderItems){
        return ctx.throw(400, "Voeg een product toe aan de winkelmand");
    }
}

module.exports = {
    async create(ctx){
        //console.log(ctx.request.body);
        validateOrder(ctx.request.body.items,ctx);
        const userData = ctx.request.body.formData;
        
        const order = await mollieClient.orders.create({
            amount: {
              value: ctx.request.body.total,
              currency: 'EUR',
            },
            billingAddress: {
              streetAndNumber: userData.adres,
              city: userData.gemeente,
              postalCode: userData.postcode,
              country: 'BE',
              givenName: userData.voorNaam,
              familyName: userData.achterNaam,
              email: userData.email
            },
            metadata: {
              order_id: '1338',
              description: 'Lego cars',
            },
            redirectUrl: 'http://localhost:3000/',
            locale: 'nl_BE',
            orderNumber: '1338',
            lines: [
              {
                type: 'physical',
                name: 'Marquina Black Mini',
                productUrl: 'http://localhost:3000/shop/marquina-blac-1',
                imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
                quantity: 1,
                vatRate: '21.00',
                unitPrice: {
                  currency: 'EUR',
                  value: '10.00',
                },
                totalAmount: {
                  currency: 'EUR',
                  value: '10.00',
                },
                vatAmount: {
                  currency: 'EUR',
                  value: '1.74',
                },
              },
            ],
          });

        return order;
    }
};
