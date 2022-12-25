/* Находим элементы на странице. */
let squaresElems = document.querySelectorAll('.square');
let squareElem = document.querySelector('.square');
let currentPlayerTxtElem = document.querySelector('.current-player');
let playerInfoTxtElem = document.querySelector('.player-info');

/* Задаем стартовые условия. */
let currentPlayer = 'X'; // Задаем игрока по умолчанию. Все значения: Х, 0, N(нет игрока).
const boardObject = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N']; // Создаем доску и задаем значения клеток по умолчанию. Все значения: N(пустая), Х, 0.
console.log('Game start!');
console.log('Board log: ' + boardObject);
console.log('Current player: ' + currentPlayer);

/* Обработчик клика на клетку. */
for (squareElem of squaresElems) {
    squareElem.onclick = function() {
        if (boardObject[this.id] === 'N' && currentPlayer !== 'N') { // Клик срабатывает, только если поле пустое и игра не была окончена.
            console.log('Player ' + currentPlayer + ' click on square id:' + this.id);
            this.textContent = currentPlayer; // Рисуем отметку в клетке
            this.value = currentPlayer;
            boardObject[this.id] = this.value; // Записываем значение в массив состояния доски. Обновляем массив доски.
            console.log('Board log: ' + boardObject);
            calcWinner(); // Считаем, есть ли победитель?
        }
    }
}

/* Функция, переключающая игроков. Если игрок Х, переключаем на 0. Если игрок 0, переключаем на Х. */
const switchPlayer = function() {
    if (currentPlayer === 'X') {
        currentPlayer = '0';
        console.log('Current player: ' + currentPlayer);
        updateCurrentPlayerTxt();
    } else if (currentPlayer === '0') {
        currentPlayer = 'X';
        console.log('Current player: ' + currentPlayer);
        updateCurrentPlayerTxt();
    }
}

/* Функция, отвечающая за обновление текста с информацией о текущем игроке на доске. */
const updateCurrentPlayerTxt = function() {
    currentPlayerTxtElem.textContent = currentPlayer;
}

/* Функция, определяющая победителя. */
const calcWinner = function() {
    if (
        compareSquares(0,1,2) === true ||
        compareSquares(3,4,5) === true ||
        compareSquares(6,7,8) === true ||
        compareSquares(0,3,6) === true ||
        compareSquares(1,4,7) === true ||
        compareSquares(2,5,8) === true ||
        compareSquares(2,4,6) === true ||
        compareSquares(0,4,8) === true
        // Подставляем возможные выйгрышные комбинации в функцию с форулой, считающую совпадения.
    ) {
        callWinner(); // Если находим совпадение — объявляем победителя.
    } else {
        switchPlayer() // Если нет — переключаем ход на следующего игрока.
    }
}

/* Функция, считающая по формуле совпадения трех клеток */
const compareSquares = function(a, b, c) {
    if ((boardObject[a] === boardObject[b] && boardObject[a] === boardObject[c] && boardObject[b] && boardObject[c]) === currentPlayer) {
        return true;
    }
}

/* Объявляем победителя */
const callWinner = function() {
    console.log('Player ' + currentPlayer +' is winner');
    playerInfoTxtElem.textContent = 'Winner: '; // Обновляем текст на доске с объявлением победителя
    currentPlayer = "N"; // Забираем управление
}