let player1Code, player2Code;
let player1Name, player2Name;
let currentPlayer = 1;
let attempts = { 1: [], 2: [] };

function startGame() {
  player1Name = document.getElementById('player1-name').value;
  player2Name = document.getElementById('player2-name').value;
  player1Code = document.getElementById('player1-code').value;
  player2Code = document.getElementById('player2-code').value;

  if (player1Code.length !== 4 || player2Code.length !== 4) {
    alert('Les codes doivent contenir exactement 4 chiffres.');
    return;
  }

  if (!player1Name || !player2Name) {
    alert('Veuillez entrer les pseudos des deux joueurs.');
    return;
  }

  document.getElementById('setup').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('current-player').innerText = player1Name;
}

function makeGuess() {
  const guess = document.getElementById('guess').value;
  if (guess.length !== 4) {
    alert('Votre essai doit contenir exactement 4 chiffres.');
    return;
  }

  let codeToGuess = currentPlayer === 1 ? player2Code : player1Code;
  let result = getFeedback(guess, codeToGuess);

  attempts[currentPlayer].push({ guess, result });

  displayResults();
  
  if (result.bons === 4) {
    displayWinner(currentPlayer === 1 ? player1Name : player2Name, codeToGuess);
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player').innerText = currentPlayer === 1 ? player1Name : player2Name;
    document.getElementById('guess').value = '';
  }
}

function getFeedback(guess, code) {
  let bons = 0, presents = 0;
  let guessArr = guess.split('');
  let codeArr = code.split('');

  guessArr.forEach((digit, index) => {
    if (digit === codeArr[index]) {
      bons++;
      guessArr[index] = codeArr[index] = null;
    }
  });

  guessArr.forEach((digit, index) => {
    if (digit && codeArr.includes(digit)) {
      presents++;
      codeArr[codeArr.indexOf(digit)] = null;
    }
  });

  return { bons, presents };
}

function displayResults() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  attempts[currentPlayer].forEach(attempt => {
    resultsDiv.innerHTML += `<p>Essai : ${attempt.guess} | Bons : ${attempt.result.bons}, Présents : ${attempt.result.presents}</p>`;
  });
}

function displayWinner(winnerName, code) {
  document.getElementById('game').style.display = 'none';
  document.getElementById('winner').style.display = 'block';
  
  const winnerMessage = document.getElementById('winner-message');
  winnerMessage.innerText = `${winnerName} a gagné en devinant le code ${code}!`;

  const attemptsSummary = document.getElementById('attempts-summary');
  attemptsSummary.innerHTML = `
    <h3>Tentatives de ${player1Name} :</h3>
    ${attempts[1].map(a => `<p>Essai : ${a.guess} | Bons : ${a.result.bons}, Présents : ${a.result.presents}</p>`).join('')}
    <h3>Code secret de ${player1Name} : ${player1Code}</h3>
    <h3>Tentatives de ${player2Name} :</h3>
    ${attempts[2].map(a => `<p>Essai : ${a.guess} | Bons : ${a.result.bons}, Présents : ${a.result.presents}</p>`).join('')}
    <h3>Code secret de ${player2Name} : ${player2Code}</h3>
  `;
}

function resetGame() {
  currentPlayer = 1;
  attempts = { 1: [], 2: [] };
  document.getElementById('setup').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('winner').style.display = 'none';
  document.getElementById('player1-name').value = '';
  document.getElementById('player2-name').value = '';
  document.getElementById('player1-code').value = '';
  document.getElementById('player2-code').value = '';
  document.getElementById('guess').value = '';
}
