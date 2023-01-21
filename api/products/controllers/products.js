const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   * Based on slug
   *
   * @return {Object}
   */

  async findSlug(ctx) {
    const { Slug } = ctx.params;
    console.log(Slug);

    const entity = await strapi.services.products.findOne({ Slug });
    return sanitizeEntity(entity, { model: strapi.models.products });
  },
  /**
   * Retrieve a record.
   * Based on ID
   *
   * @return {Object}
   */

   async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.restaurant.findOne({ id });
    const product = sanitizeEntity(entity, { model: strapi.models.restaurant });
    if(product.orders){
      delete product.orders;
    }
    return product;
  },
  /**
   * Retrieve records.
   * Make sure the order details are not in the request
   *
   * @return {Array}
   */

   async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.products.search(ctx.query);
    } else {
      entities = await strapi.services.products.find(ctx.query);
    }

    return entities.map(entity => {
      const product = sanitizeEntity(entity, { 
      model: strapi.models.products,
    });
    if (product.orders){
      delete product.orders;
    }
    return product;
    });
  },
};
