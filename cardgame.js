const oneCardTong = document.getElementsByClassName("oneCard");
const resultElement = document.getElementById('result');
const scoreBoardElement = document.getElementById('scoreBoard');
const scoreBoardElement2 = document.getElementById('scoreBoard2');
const blackBtn = document.getElementById('blackBtn');
const redBtn = document.getElementById('redBtn');

var modal = document.getElementById('modalAll');
let cardArr = []
let middle = [];
let tmpArr = [];
let blackCardCount = 0;
let redCardCount = 0;
let blackScore = 0;
let redScore = 0;
let gameStarted = false;
let targetScore = 1;

function closeRecordModal() {
    document.getElementById('recordContainer').style.display = 'none';
}

function startGame() {
    // 플레이어 이름을 가져옴
    playerAName = document.getElementById('playerAName').value;
    playerBName = document.getElementById('playerBName').value;

    // 이름이 비어있는지 확인
    if (playerAName.trim() === '' || playerBName.trim() === '') {
        // 둘 중 하나라도 이름이 비어있으면 게임이 시작되지 않게 설정
        alert('플레이어 이름을 입력해주세요.');
        return;
    }

    // 게임 시작 로직
    const selectedScore = parseInt(document.getElementById('scoreSelect').value);
    chooseScore(selectedScore); // 목표 점수 선택
    modal.style.display = 'none'; // 모달 닫기
}

// 점수 내기 설정
function chooseScore(score) {
    targetScore = score;
    cardShuffle();
    reset();
}
// 게임 시작 화면
window.onload = function () {
    cardShuffle();
    modal.style.display = 'block';
}


//sort로 섞는거보다 더 강력한
// 피셔 예이츠 알고리즘으로 섞기 !!
function cardShuffle() {
    middle = [];
    tmpArr = [];
    blackCardCount = 0;
    redCardCount = 0;

    // 중복을 허용하지 않는 Set 함수를 담은 변수 생성
    const noTwo = new Set();

    for (let i = 0; i < 52; i++) {
        noTwo.add(i);
    }

    // Set을 담은 변수를 배열로 변환한 뒤 무작위로 섞기
    cardArr = Array.from(noTwo);

    for (let i = cardArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardArr[i], cardArr[j]] = [cardArr[j], cardArr[i]];
    }

    // 랜덤하게 섞인 카드를 보드에 배치
    for (let i = 0; i < oneCardTong.length; i++) {
        oneCardTong[i].innerHTML = `<img src=card_img/${cardArr[i]}.png>`;
        middle.push(cardArr[i]);
    }
    allBack();
    updateResult();
    document.getElementById("blackBtn").disabled = false;
    document.getElementById("redBtn").disabled = false;
}

// 모든 카드가 뒷면으로 (초기화 함수에 참조)
function allBack() {
    for (let i = 0; i < oneCardTong.length; i++) {
        if (tmpArr[i] === 100) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
        } else if (tmpArr[i] === 100) {
            oneCardTong[i].innerHTML = `<img src=card_img/${middle[i]}.png>`;
            tmpArr[i] = middle[i];
        } else if (middle[i] >= 0) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
            tmpArr[i] = 100;
        }
    }
}

// 뒤집어진 카드중 블랙 카드만 앞으로 뒤집기
function blackBack() {
    blackCardCount = 0;
    for (let i = 0; i < oneCardTong.length; i++) {
        if (tmpArr[i] === 100 && middle[i] <= 25) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
        } else if (tmpArr[i] === 100) {
            oneCardTong[i].innerHTML = `<img src=card_img/${middle[i]}.png>`;
            tmpArr[i] = middle[i];
            blackCardCount++;
        } else if (middle[i] > 25) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
            tmpArr[i] = 100;
        }
    }
    updateResult();
    // 중복 클릭 안되도록 버튼 비활성화
    document.getElementById("blackBtn").disabled = true;

}

// 뒤집어진 카드중 레드 카드만 앞으로 뒤집기
function redBack() {
    redCardCount = 0;
    for (let i = 0; i < oneCardTong.length; i++) {
        if (tmpArr[i] === 100 && middle[i] > 25) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
        } else if (tmpArr[i] === 100) {
            oneCardTong[i].innerHTML = `<img src=card_img/${middle[i]}.png>`;
            tmpArr[i] = middle[i];
            redCardCount++;
        } else if (middle[i] <= 25) {
            oneCardTong[i].innerHTML = `<img src=card_img/100.png>`;
            tmpArr[i] = 100;
        }
    }
    updateResult();
    // 중복 클릭 안되도록 버튼 비활성화
    document.getElementById("redBtn").disabled = true;
}

// 점수 도달시 게임 종료
function checkScore() {
    if (blackScore === targetScore || redScore === targetScore) {
        let winner = blackScore > redScore ? `${playerAName}` : `${playerBName}`;
        alert(`${winner} 플레이어가 목표 점수인 ${targetScore}점을 획득했기에 게임을 종료합니다.`);
        endGame(winner);
        startGame();
    }
}

// 점수판
function updateResult() {
    if (blackCardCount + redCardCount === oneCardTong.length) {
        if (blackCardCount > redCardCount) {
            resultElement.textContent = `BLACK POINT! (블랙: ${blackCardCount}, 레드: ${redCardCount})`;
            resultElement.classList.add('blackPoint');
            blackScore++;
        } else if (blackCardCount < redCardCount) {
            resultElement.textContent = `RED POINT! (블랙: ${blackCardCount}, 레드: ${redCardCount})`;
            resultElement.classList.add('redPoint');
            redScore++;
        } else {
            resultElement.textContent = `DRAW! (블랙: ${blackCardCount}, 레드: ${redCardCount})`;
        }
        scoreBoardElement.textContent = `${playerAName}: ${blackScore}`;
        scoreBoardElement2.textContent = `${playerBName}: ${redScore}`;

        // 설정한 목표 점수에 도달했을때 점수가 업데이트 되지 않고 게임이 종료되는 현상
        // checkScore();


        // 비동기적인 실행을 위해 점수가 업데이트 나고 게임 결과가 나오도록 조치
        // 의도와 다른 오류를 방지하기 위해 setTimeout() 함수를 이용하여 지연 시간을 주고
        // 콜백 함수를 실행하도록 예약. 
        // 비동기적 코드이기 때문에 setTimeout 함수로 안전하게 조치
        setTimeout(checkScore, 10);

    }
    else {
        resultElement.textContent = '';
        resultElement.classList.remove('blackPoint');
        resultElement.classList.remove('redPoint');
    }
}

// 점수 초기화
function reset() {
    blackCardCount = 0;
    redCardCount = 0;
    blackScore = 0;
    redScore = 0;
    scoreBoardElement.textContent = `${playerAName}: ${blackScore}`;
    scoreBoardElement2.textContent = `${playerBName}: ${redScore}`;
    resultElement.textContent = '';
    modal.style.display = 'block';
}

// 승자 정보를 로컬스토리지에 저장
function saveWinnerToLocalStorage(winner, playerA, playerB) {
    let winners = JSON.parse(localStorage.getItem('winners')) || [];

    // 현재 승자 정보 추가
    winners.push({ winner: winner, playerA: playerA, playerB: playerB });

    // 로컬 스토리지에 저장
    localStorage.setItem('winners', JSON.stringify(winners));
}

function displayRecord() {
    // 저장된 승자 정보 가져오기
    let winners = JSON.parse(localStorage.getItem('winners')) || [];

    // 랭킹판 요소 찾기
    let RecordElement = document.getElementById('record');

    // 랭킹판 초기화
    RecordElement.innerHTML = '';

    // 승자 정보를 랭킹판에 추가
    winners.forEach(function (record, index) {
        let listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${record.winner} (${record.playerA} vs ${record.playerB})`;
        RecordElement.appendChild(listItem);
    });
}
// 게임 종료 시 승자를 저장하고 랭킹판을 업데이트
function endGame(winner) {
    // 승자 정보 저장
    saveWinnerToLocalStorage(winner, playerAName, playerBName);

    // 랭킹판 업데이트
    displayRecord();
    document.getElementById('recordContainer').style.display = 'block';
}

// 랭킹 초기화
function clearRecord() {
    localStorage.removeItem('winners');
    displayRecord(); // 랭킹판 업데이트
}