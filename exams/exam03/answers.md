# Questions and Answers for Exam 3

## Question: Why do I say that JS does not actually have 'classes'? What is the distinction between a language with (real) classes and a language without?

### Answer:

Because in JS everything is Object, there is no "class", even we have new keyword in ES6 as "class". However, it also implemented by prototype chain. For other language with "class", it doesn't mean any object or refer to any instance, it just like a template, and it need to "new" an instance to call the internal functions and variables defined in that class. But in JS, class is still an object and it is also an instance.

## Question: Why is it a bad idea to directly modify the DOM when using React?

### Answer:

Because when rerendering in react, it has been heavily optimised. The render() function doesn't run on every small manipulation and the thing that is not visibile is that the rerender doesn't occur for the entire DOM rather on only the portion that has changed.

React uses the virtual DOM technology and then it takes out the difference between the current and the virtual dom much like string comparison and then only renders the difference and is thus highly efficient.

## Question: What is composition, and why is it often favored over inheritance?

### Answer:

Composition is object that contains instances of other classes that implement the desired functionality.

Because composition gives the design higher flexibility. It is more natural to build business-domain classes out of various components than trying to find commonality between them and creating a family tree. Composition also provides a more stable business domain in the long term as it is less prone to the quirks of the family members. In other words, it is better to compose what an object can do (HAS-A) than extend what it is (IS-A).

## Question: Why can code using 'import' not be run directly by NodeJS?

### Answer:

Because NodeJS implemented based on CommonJS module definition, It uses "require" syntax and don't support "import", And "import" is a new syntax in ES6, you need to use babel to convert it to ES5 and run by NodeJS.

## Question: Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:

Because the browser does not implement require() or exports, and we need other tools like browserify or webpack to implement this functionality packing all the code together for browsers to execute.

## Question: What is a 'side-effect'? Why do we want to minimize them?

### Answer:

"side effect" is that When you call a function, in addition to returning a function value, it also has an additional effect on the main calling function. For example, modify a global variable (a variable outside a function) or modify a parameter.

Because the side effects of functions can cause unnecessary troubles to the program design, make the program very difficult to find errors, and reduce the readability of the program. And strict functional languages ​​require that functions must have no side effects.
