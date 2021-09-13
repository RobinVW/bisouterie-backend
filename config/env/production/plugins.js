module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  // email:{
  //   provider: env('EMAIL_PROVIDER'),
  //   providerOptions: {
  //     host: env('EMAIL_SMTP_HOST'),
  //     port: env('EMAIL_SMTP_PORT'),
  //     auth: {
  //       user: env('EMAIL'),
  //       pass: env('EMAILPW'),
  //     }
  //   }
  // },
  // settings:{
  //   defaultFrom: env('EMAIL'),
  //   defaultReplyTo: env('EMAIL')
  // },
  // ...
});