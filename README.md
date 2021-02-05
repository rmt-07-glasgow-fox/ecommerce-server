# ecommerce-server

This is server section of "Gardara Ecommerce"

Server: https://server-gardara.herokuapp.com/

<h1 align="center">Gardara Server</h1><br>

## About The Project

Gardara is a web-based single page application (SPA) developed using Vue.js. Gardara is an e-commerce site for selling-buying activities on vintage fashion style. Users have an ability to check on fashion items when opening the website by searching it through search bar or filter it through categories section. A welcoming page on gardara consist of promotional banner and items. Cart and wishlist feature are available for a registered user


## Deployment 

Kang bang is deployed using a server with two clients webpage. The clients are customer site and administrative site. Administrative site are built for content management system(CMS). Every promo on welcoming page and every item on the Gardara site are uploaded through this site. Admin on administrative site have an ability to create, read, update, and delete (CRUD) each items on the site. Each product image that uploaded by Admin will be deliver to Google Cloud Storage as the image storage. Customer site are built for a free or registered user. They have an ability to see all of the products on the site. However, they need to register to get a wishlist or cart feature. A registered user could delete or update their wishlist and cart. Link deployment: 
* [Admin site(CMS)](https://gardara-1997.web.app/) (click)
* [Customer site](https://the-gardara.web.app/) (click)
* Server is using PostrgreSQL from Heroku

*(You could check my [ecommerce-client-CMS](https://github.com/gianRVN/ecommerce-client-CMS) repository to get further info about the admin side)*
*(You could check my [ecommerce-client-customer](https://github.com/gianRVN/ecommerce-client-customer) repository to get further info about the customer client)*

## Built With

Kang Bang server is built with getting help by a list of cool technologies. Which are: 
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Heroku](https://heroku.com/)


## Acknowledgements
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [google cloud storage](https://cloud.google.com/storage)
* [jest](https://jestjs.io/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [multer](https://www.npmjs.com/package/multer)
* [supertest](https://www.npmjs.com/package/supertest)


## Contact Me
* [LinkedIn](https://www.linkedin.com/in/gianmarvin/)
