## what is cors
#### CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by web browsers to restrict how resources on a web page can be requested from another domain (origin)

#### A web page from domainA.com cannot make a request (fetch API, XMLHttpRequest, etc.) to domainB.com unless domainB.com explicitly allows it.

## what is work of express.json
#### When a client (browser, Postman, or frontend app) sends a JSON request body, express.json() automatically parses it,  The parsed data is available in req.body.

## what is the work of express.urlencoded
#### When a client submits a form, the browser encodes the data as key-value pairs in the request body.express.urlencoded() parses this data and makes it accessible in req.body.


## what is the work of express.static
####  Serves static files like HTML, CSS, images, and JavaScript from the "public" folder.


## 📌 Why Use asyncHandler?
#### Express doesn’t automatically catch errors in async functions...The asyncHandler function is a higher-order function (a function that returns another function) designed to handle asynchronous errors in Express middleware and route handlers.

## why we use mongooseAggregatePaginate?
#### What is it? Ans: A plugin for paginating aggregation queries in Mongoose.Why use it?Ans: Prevents loading all data at once, making queries efficient.How to use?Ans:-  Add .plugin(mongooseAggregatePaginate) to the schema and use aggregatePaginate().

## what is cookie-parser?
#### The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies and, if a secret was provided, as the property req.signedCookies. These properties are name value pairs of the cookie name to cookie value.