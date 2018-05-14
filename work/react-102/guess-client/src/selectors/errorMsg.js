const messages = {
  'getList-fail':
    'Failed to load list.  Check your network connection and try again.',
  'getSecret-fail':
    'Failed to get secret word.  Check your network connection and try again.',
  'post-fail':
    'Failed to make guess.  Check your network connection and try again.',
  'post-notString':
    'Failed to make guess.  Check your input, it should only contains letters.',
  'post-wrongLength':
    'Failed to make guess.  Check your input, it should have only 5 letters.',
  'post-notInList':
    'Failed to make guess.  Check your input, it is not in the wordList.',
  'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = code => {
  if (!code) {
    return '';
  }
  code = messages[code] ? code : 'generic-error';
  return messages[code];
};
