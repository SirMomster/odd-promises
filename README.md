# Odd Promises

> Library to do some odd things with promises

## Installation

install using your package manager:

```
npm install odd-promises
```

OR for yarn

```
yarn add odd-promises
```

## Examples

The following example shows how you can do some API calls but only wait for so long for a reply.
The underlying promises are still resolved, so while the shown result is "Took to long", the actually
promise that was prematurely resolved is still running in the background.

> Takeaway only do this when the action's result isn't as important as the fact that it resolved.

```ts
const promises = toInteractivePromisesArray(
    someApiCall("test"), // will finish in 5000ms
    someApiCall("test 1"), // will finish in 5000ms
    someApiCall("test 2", 500) // will finish in 500ms
);

timeoutAt(1000, promises, "Took to long");
const result = await Promise.allSettled(getUnderlyingPromises(promises));

expect(result).toEqual([
    { status: "rejected", reason: "Took to long" }, // took longer than 1000ms
    { status: "rejected", reason: "Took to long" }, // took longer than 1000ms
    { status: "fulfilled", value: "test 2" }, // took less than 1000ms
]);
```


The following is a very basic example, in which we overwrite the result from the api call by prematurely resolving
to "not test".

```ts
const interactivePromise = new InteractivePromise(someApiCall("test", 1000));
interactivePromise.resolve("not test");
const result = await interactivePromise.promise; // result === "not test";
```

For more examples check the tests (__tests__)

## Todo:

- Further document the library
- Add more functionality
- Complete readme
