const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findSlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.restaurant.findSlug({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
