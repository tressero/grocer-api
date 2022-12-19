const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'http://localhost:5165';

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
