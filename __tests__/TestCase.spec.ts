import { getUnderlyingPromises, timeoutAt, toInteractivePromisesArray } from "../src/HelperMethods";

export const someApiCall = (i, t = 5000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, t);
  });

describe("TestCase", () => {
  it("Should eventually resolve the promises", async () => {
    const promises = toInteractivePromisesArray(
      someApiCall("test"),
      someApiCall("test 1"),
      someApiCall("test 2", 500)
    );

    timeoutAt(1000, promises, "Took to long");
    const result = await Promise.allSettled(getUnderlyingPromises(promises));

    expect(result).toEqual([
      { status: "rejected", reason: "Took to long" },
      { status: "rejected", reason: "Took to long" },
      { status: "fulfilled", value: "test 2" },
    ]);
  });
});
