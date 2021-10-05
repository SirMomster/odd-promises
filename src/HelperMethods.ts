import { InteractivePromise } from "./InteractivePromise"

export const toInteractivePromisesArray = (...promises: Array<PromiseLike<unknown>>): InteractivePromise<unknown>[] => {
    return promises.map(v => new InteractivePromise(v));
}

export const timeoutAt = (milliseconds: number, interactivePromises: InteractivePromise<unknown>[], reason?: any): void => {
    setTimeout(() => {
        interactivePromises.forEach((v) => v.reject(reason));
    }, milliseconds);
}

export const getUnderlyingPromises = (interactivePromises: InteractivePromise<unknown>[]): PromiseLike<unknown>[] => {
    return interactivePromises.map(v => v.promise);
} 