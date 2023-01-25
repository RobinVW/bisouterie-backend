'use strict';

const { sanitizeEntity, env } = require('strapi-utils');
const nodemailer = require('nodemailer');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_k4JGBGtGK4sexyhT8MrEUCuwVqgzef' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPW,
  }
});

const validateOrder = (orderItems, ctx) => {
    if(!orderItems){
        return ctx.throw(400, "Voeg een product toe aan de winkelmand");
    }
}

module.exports = {
    /**
     * Only send back orders from you
     * @param {*} ctx 
     */
    async find(ctx) {
        const { user } = ctx.state;
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.order.search({...ctx.query, user: user.id});
        } else {
            entities = await strapi.services.order.find({...ctx.query, user: user.id});
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.order }));
    },
    /**
     * Retrieve an order by id, only if it belongs to the user
     */
    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state

        const entity = await strapi.services.order.findOne({ id, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async create(ctx){
        //console.log(ctx.request.body);
        validateOrder(ctx.request.body.items,ctx);
        const userData = ctx.request.body.formData;
        const items = ctx.request.body.items;
        console.log(items);
        console.log(userData);

        //initialiseer totale prijs & orderCount
        let total = 0;
        let orderCount = await strapi.services.order.count();
        const products = [];
      
        //checked of items bestaan, zoja som maken van de item(s)
        for( const item of items){
          //check of product bestaat
          const realProduct = await strapi.services.products.findOne({id : item.id });
          if(!realProduct){
            return ctx.throw(404, 'Dit product bestaat niet');
          }
          total += Number(realProduct.Price);
          products.push(realProduct);
        }

        //console.log(total.toFixed(2));
        const { user } = ctx.state;
        
        try {
          const payment = await mollieClient.payments.create({
            amount: {
              currency: 'EUR',
              value: total.toFixed(2).toString(), // You must send the correct number of decimals, thus we enforce the use of strings
            },
            description: `OrderId ${orderCount + 1}: van ${user.username}, op ${new Date().toString()}`,
            redirectUrl: `https://bisouterie-frontend.vercel.app/afrekenen/confirm?orderId=${orderCount + 1}`,
            webhookUrl: 'https://bisouterie-frontend.vercel.app/api/mollie-webhook',
            metadata: {
              order_id: (orderCount + 1).toString(),
            },
          });
      
          console.log(payment);
          let adress = '';
          let orderedBy = `${userData.firstName} ${userData.lastName}`;
          let delivery;
      
          //check if payment is delivery
          if(userData.street === '' || userData.streetNumber === ''  || userData.postalCode === ''  || userData.city === '' ){
            delivery = 0;
            adress = 'Dit is een ophaling';
            console.log('pickup');
          }
          else{
            adress = `${userData.street} ${userData.streetNumber} ${userData.postalCode} ${userData.city}`;
            delivery = 1;
            console.log('delivery');
          }
          
          //order voorlopig opslaan in db
          const newOrder = await strapi.services.order.create({
            adress: adress,
            user: user.id,
            totalPrice: total.toFixed(2),
            status: 'unpaid',
            mollie_id: payment.id,
            products: products,
            phone: userData.phoneNumber,
            orderedBy: orderedBy,
            delivery: delivery
          })
          return payment;
        } catch (error) {
          console.warn(error);
        }    
        
    },
    async confirm(ctx){
       console.log('in confirm');
       const { id } = ctx.request.body;
       const { user } = ctx.state;
       
       console.log('id = ' + id);
       console.log('user = ' + user.id);
       const oldOrder = await strapi.services.order.findOne({id,user: user.id});
      console.log(oldOrder);
       //check of order paid is
       const payment = await mollieClient.payments.get(oldOrder.mollie_id);
       if (payment.isPaid()){
         console.log('hoera de betaling is gelukt');
         //Update order naar paid
         const updateOrder = await strapi.services.order.update({
              id
          },
          {
              status: 'paid'
          });
         //Aantal aanpassen in product
         await Promise.all(oldOrder.products.map(async(product) =>{
           const id = product.id;
           const newAmount = product.Amount - 1;
           await strapi.services.products.update({id},{Amount: newAmount});
         }));

         //Zend mail naar gebruiken
              //voorbereiden producten
              //console.log("email: " + process.env.EMAIL + "ww: " + process.env.EMAILPW);
              let productenString = '';
              oldOrder.products.map(item =>{
                productenString += item.Name + ' - \u20AC '+ item.Price + '\n';
              })
              console.log(productenString);
         const mailOptions = {
          from: process.env.EMAIL,
          to: oldOrder.user.email,
          subject: `Bevestiging  van bestelling bij Bisouterie d'Amelie`,
          text: `Hoeraaa ${oldOrder.orderedBy}\n\n
Bedankt voor je bestelling!\n\n
We hebben je betaling goed ontvangen en gaan meteen voor jou aan de slag.\n\n
Ter controle vind je hieronder nogmaals je bestelgegevens. Aarzel niet om contact op te nemen indien je nog vragen hebt over jouw bestelling. 
Je mag ons altijd mailen via bisouterie-amelie@gmail.com.\n\n
Adres: ${oldOrder.adress}
Bestelling:\n 
${productenString}\n
En nu?\n
Sit back en relax, want binnenkort straal jij met jouw nieuwe juweel (of juwelen) van Bisouterie d’Amelie!\n 
Wanneer jouw bestelling klaar is, neem ik contact met jou op om een passend afhalingsmoment af te spreken. Indien je koos voor de optie ‘verzending’, ontvang je een bevestiging van zodra jouw bestelling verzonden is.\n\n 
Begin al maar te dagdromen over jouw nieuwe outfit :) !\n\n 
Bisous,\n\n
Amelie xxx `,
        };

         transporter.sendMail(mailOptions, function(error,info){
            if(error){
              console.log(error);
            }
            else{
              console.log('Email verzonden: '+ info.response);
            }
         });
        
          return sanitizeEntity(updateOrder, { model: strapi.models.order})
       }
    }

};
