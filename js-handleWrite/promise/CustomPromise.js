const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class CustomPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }

  reject = (err) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = err;
    }
  }

  status = PENDING;
  value = undefined;
  reason = undefined;

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }

  catch() {

  }

  finally() {

  }
}