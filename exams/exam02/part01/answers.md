# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)? Include a description on how to fix it (code to help your answer is okay but not required. A non-code description of how to fix it is required). Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => {
  return data;
});

console.log(data.cats);
```

### Answer:

Two problems with these code:

1. It did not check if the response is valid, so it can't handle the error and also
   it did not add "catch" function to handle the error.

2. It uses wrong variable names after the Promise has been resolved, it should be both
   "json".

correct code should as below:

```
const data = fetch('example.com/test')
.then( response => response.ok ? response.json() : Promise.reject(response.status))
.then( json => {
  return json;
})
.catch(status => console.log(status));

console.log(data.cats);
```

## Question: What is the scope of a variable in JS? How does it relate to closures?

### Answer:

Scope:

The scope of a variable is controlled by the location of the variable declaration, and defines the part of the program where a particular variable is accessible.

JavaScript has two scopes – global and local. Any variable declared outside of a function belongs to the global scope, and is therefore accessible from anywhere in your code. Each function has its own scope, and any variable declared within that function is only accessible from that function and any nested functions.

Relation with Closures:

If you define any inner function within another function, this inner function is called a closure. It retains access to the variables created in the outer function.
example for closure below: (like a private getMethod());

```
function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2
```

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes?

### Answer:

Polyfill:

A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.

How would a polyfill for a new Array function relate to the concept of prototypes:

If the new Array function doesn't exist or support in the older browsers, then we need to add it and implement in Array.prototype.fn. Cause when we added it to the prototype, the prototype chain mechanism will allow us to use it as Array.fn in older browsers.

## Question: What is CORS and why is it only in browsers? How does it relate to Same Origin Policy (SOP) ?

### Answer:

CORS:
Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to let a user agent gain permission to access selected resources from a server on a different origin (domain) than the site currently in use. A user agent makes a cross-origin HTTP request when it requests a resource from a different domain, protocol, or port than the one from which the current document originated.

Why is it only in browsers:
Browsers use public environments and it's not safe, the web pages you visit make frequent requests to load assets like images, fonts, and more, from many different places across the Internet. And when you make requests the browser may contain cookies from the current domain and the parent domain, If these requests for assets go unchecked, the security of your browser may be at risk.

SOP:
The same-origin policy restricts how a document or script loaded from one origin can interact with a resource from another origin. It is a critical security mechanism for isolating potentially malicious documents.

Relation:
CORS is a relaxation of the same-origin policy implemented in modern browsers. Without features like CORS, websites are restricted to accessing resources from the same origin through what is known as same-origin policy.

## Question: What is the difference between a bundler and a transpiler?

### Answer:

Bundler:
On a high level, module bundling is simply the process of stitching together a group of modules (and their dependencies) into a single file (or group of files) in the correct order. And a JavaScript bundler is a tool that puts your code and all its dependencies together in one JavaScript file.

Transpiler:
Transpilers, or source-to-source compilers, are tools that read source code written in one programming language, and produce the equivalent code in another language.
for example: Babel that converts JavaScript code in ES6 into ES5 so that it runs in environment where ES6 doesn't work properly.

Difference:
Bundler will bundle all the files and modules you need to one single file.
Transpiler help you to convert the new programming language to the older syntax language which supported cross many platforms.
