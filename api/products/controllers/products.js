const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findSlug(ctx) {
    const { Slug } = ctx.params;
    console.log(Slug);

    const entity = await strapi.services.products.findOne({ Slug });
    return sanitizeEntity(entity, { model: strapi.models.products });
  },
};
