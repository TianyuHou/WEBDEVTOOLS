import configPort from '../config.json';

const alfredPort = configPort.alfred;
const barbaraPort = configPort.barbara;

/********************REST Fetch Functions*************************/
const postFetchSecret = port => {
  return fetch(`${port}/game`, {
    method: 'POST',
    mode: 'cors'
  });
};

export async function getSecret() {
  try {
    const alfredres = await postFetchSecret(alfredPort);
    const alfred = await alfredres.json();
    const barbarares = await postFetchSecret(barbaraPort);
    const barbara = await barbarares.json();
    return { alfred, barbara };
  } catch (err) {
    console.log(err);
  }
}

const deleteFetchSecret = (port, id) => {
  return fetch(`${port}/game/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  });
};

export async function deleteSecret(alfredId, barbaraId) {
  try {
    await deleteFetchSecret(alfredPort, alfredId);
    await deleteFetchSecret(barbaraPort, barbaraId);
  } catch (err) {
    console.log(err);
  }
}

const updateFetchGuess = (port, id, matched) => {
  return fetch(`${port}/game/${id}/guessed`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matched
    }),
    mode: 'cors'
  });
};

export async function updateGuess(
  alfredId,
  alfredMatched,
  barbaraId,
  barbaraMatched
) {
  const alfredres = await updateFetchGuess(alfredPort, alfredId, alfredMatched);

  const alfredGuess = await alfredres.json();
  const barbarares = await updateFetchGuess(
    barbaraPort,
    barbaraId,
    barbaraMatched
  );
  const barbaraGuess = await barbarares.json();
  return { alfredGuess, barbaraGuess };
}

const getFetchGuess = (port, id, guess) => {
  return fetch(`${port}/game/${id}/guess/${guess}`, {
    mode: 'cors'
  });
};

export async function getAlfredGuess(barbaraId, alfredGuess) {
  const alfredres = await getFetchGuess(barbaraPort, barbaraId, alfredGuess);
  const alfredGuessRes = await alfredres.json();
  return { alfredGuessRes };
}

export async function getBarbaraGuess(alfredId, barbaraGuess) {
  const barbarares = await getFetchGuess(alfredPort, alfredId, barbaraGuess);
  const barbaraGuessRes = await barbarares.json();
  return { barbaraGuessRes };
}
