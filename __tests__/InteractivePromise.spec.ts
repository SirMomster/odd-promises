import { InteractivePromise } from "../src/InteractivePromise";

export const someApiCall = (i, t = 5000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, t);
  });

export const someFailingApiCall = (i, t = 5000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(i);
    }, t);
  });


describe("InteractivePromise", () => {
    it("Should eventually resolve the promise", async () => {
        const interactivePromise = new InteractivePromise(someApiCall("test", 1000));
        const result = await interactivePromise.promise;
        expect(result).toEqual("test");
    });

    it('should eventually fail', async () => {
        const interactivePromise = new InteractivePromise(someFailingApiCall("oeps", 1000));
        return expect(interactivePromise.promise).rejects.toEqual("oeps");
    });

    it('should resolve when resolved quicker than failure', async () => {
        const interactivePromise = new InteractivePromise(someFailingApiCall("oeps", 1000));
        interactivePromise.resolve("data");
        return expect(interactivePromise.promise).resolves.toEqual("data");
    });

    it("Should reject the promise", async () => {
        const interactivePromise = new InteractivePromise(someApiCall("test", 1500));
        interactivePromise.reject("to slow");
        return expect(interactivePromise.promise).rejects.toEqual("to slow");
    });

    it("Should resolve the promise", async () => {
        const interactivePromise = new InteractivePromise(someApiCall("test", 1500));
        interactivePromise.resolve("to quick");
        return expect(interactivePromise.promise).resolves.toEqual("to quick");
    });
});