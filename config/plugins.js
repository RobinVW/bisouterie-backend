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
  //     secure: true,
  //     auth: {
  //       type: 'OAuth2',
  //       user: env('EMAIL_SMTP_HOST'),
  //       clientId: '996782529867-vpajboqu8t14h5m3djthelsnbffd5e2j.apps.googleusercontent.com',
  //       clientSecret: 'MCg68_jHcmqtHjsn_TN5wRae',
  //       refreshToken: '1//04jLlp5m_pfeMCgYIARAAGAQSNwF-L9IrTtv0vzbTyvLI2SMq-uup2Q8sLIGEieevba4YvlkAKiZDqKulOD36AMuiotoOuTisi3k',
  //       accessToken: 'ya29.a0ARrdaM8INvBx8djqczng4xCJiZXHrlK1ff-EYv4dF6ToYnqt-QyKbvpVLJpIIUASu1WoFZgdEC22_3VYSTat63VvDrvIei-FXwbKNjQ96pkB02Lf0ja145h_xGwXYqC5e7I1aBKq6uutLegnrffh580yhlp0',
  //       expires: 1484314697598,
  //     }
  //   }
  // },
  // settings:{
  //   defaultFrom: env('EMAIL'),
  //   defaultReplyTo: env('EMAIL')
  // },
  // ...
});