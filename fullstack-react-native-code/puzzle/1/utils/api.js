/* eslint-disable import/prefer-default-export */

import { invoke } from './controlFlow';

/**
 * Make a `HEAD` request to determine the final URL, following redirects.
 *
 * We use XMLHttpRequest instead of Fetch to work around JSON parsing issues
 * on Android: https://github.com/facebook/react-native/issues/10756
 *
 * @param {string} url The initial URL
 * @returns {Promise} A promise resolving to the final URL
 */
function getRedirectURL(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.open('HEAD', url, true);

    xhr.onload = () => {
      resolve(xhr.responseURL);
    };

    xhr.send(null);
  });
}

/**
 * Fetch a random image
 *
 * @returns {Promise} A promise resolving to a random image
 */
export async function getRandomImage() {
  const uri = await invoke({ retry: 3, timeout: 5000 }, () =>
    getRedirectURL('https://picsum.photos/600/600/?random'),
  );

  return { uri, width: 600, height: 600 };
}
