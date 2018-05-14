export const getList = () => {
  return fetch('/wordList')
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject('getList-fail'));
};

export const getSecret = () => {
  return fetch('/secret')
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(() => Promise.reject('getSecret-fail'));
};

export const tryGuess = (guess, secret) => {
  return fetch('/compareGuess', {
    method: 'POST',
    body: JSON.stringify({ guess, secret })
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(status => {
      switch (status) {
        case 460:
          return Promise.reject('post-notString');
        case 461:
          return Promise.reject('post-wrongLength');
        case 462:
          return Promise.reject('post-notInList');
        default:
          return Promise.reject('post-fail');
      }
    });
};
