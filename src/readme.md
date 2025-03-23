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

