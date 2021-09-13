'use strict'

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    const body = ctx.request.body
    const from = body.email
    strapi.log.debug(`Trying to receive a message from ${from}`)

    try {
      const emailOptions = {
        from: 'bisouterie.amelie@gmail.com',
        to: 'bisouterie.amelie@gmail.com',
        subject: `Message From ${body.firstName} ${body.lastName}`,
        text: body.message +' | Sent from: ' +body.email,
        html: `<div>${body.message}</div><p>Sent from: ${body.email}</p>`
      }
      await strapi.services.email.send(emailOptions)
      strapi.log.debug(`Email sent to ${from}`)
      ctx.send({ message: 'Email sent' })
    } catch (err) {
      console.log(err);
      strapi.log.error(`Error sending email to bisouterie.amelie@gmail.com`, err)
    //   ctx.send({ error: 'Error sending email' })
      ctx.send(err);
    }
  },
}