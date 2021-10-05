import { ExternalizedPromise } from "./ExternalizedPromise";

export class InteractivePromise<T> {
    private _external = new ExternalizedPromise();

    constructor(private internalPromise: PromiseLike<T>) {  
      this.awaitable();
    }
    
    awaitable() {
      new Promise<void>(async (resolve, reject) => {
        try {
          const result = await this.internalPromise;
          this._external.resolve(result);
        } catch (ex) {
          this._external.reject(ex);
        } finally {
          resolve();
        }
      });
    }
    
    get promise () {
      return this._external.promise;
    }
    
    reject (...args) {
      this._external.reject(...args);
    }
    
    resolve (arg) {
      this._external.resolve(arg);
    }
  }