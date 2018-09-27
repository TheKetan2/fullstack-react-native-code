/**
 * Execute a promise-returning function. If the promise isn't resolved or
 * rejected in `ms` milliseconds, the promise is rejected.
 *
 * @param {number} ms Timeout after this many milliseconds
 * @param {function} f Function that returns a promise
 * @returns {Promise}
 */
export async function timeout(ms, f) {
  const promise = f();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);

    promise.then(resolve, reject);
  });
}

/**
 * Execute a promise-returning function. If the promise is rejected, retry the
 * function call `count` times.
 *
 * @param {number} count Number of times to retry
 * @param {function} f Function that returns a promise
 * @returns {Promise}
 */
export async function retry(count, f) {
  if (count > 0) {
    try {
      return await f();
    } catch (e) {
      return retry(count - 1, f);
    }
  }

  return Promise.reject();
}

/**
 * @typedef {{retry: number, timeout: number}} ControlFlowOptions
 */

/**
 * Execute a promise-returning function.
 *
 * @param {ControlFlowOptions} options Invocation options
 * @param {function} f Function that returns a promise
 * @returns {Promise}
 */
export async function invoke(options, f) {
  return retry(options.retry || 1, () => timeout(options.timeout || 0, f));
}
