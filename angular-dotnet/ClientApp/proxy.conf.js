const { env } = require('process');

/* I don't think target is used any more... */
let target = "";
if (env.ASPNETCORE_HTTPS_PORT) {
  target = `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`;
} else {
  if (env.ASPNETCORE_URLS) {
    env.ASPNETCORE_URLS.split(';')[0];
  } else {
    'http://localhost:5165';
  }
}
target = 'https://grocer-np.ochsner.me/api'


console.log('target',target);

/* Note: changing this may require re-running 'npm run start' (no live reload on changes?) */
const PROXY_CONFIG = [
  {
    context: [
      '/Recipe',
      '/RecipeIngredient',
      '/Ingredient',
      '/StoreSection',
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
