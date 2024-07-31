![럭키 카드게임](https://github.com/user-attachments/assets/385dd7f8-93ea-4057-9fe9-5ddaa9ca3941)

## 게임 소개
- 랜덤으로 뽑힌 카드중 선택한 색상의 카드가 더 많은 플레이어가 점수를 갖는 게임
- 사다리 타기와 같이 운에 의해 결정되는 게임을 모티브로 삼아, 친구와 함께 간단하면서 빠르게 즐길 수 있는 게임을 목표로 개발했습니다.

## 게임 방법

1. 블랙 플레이어와 레드 플레이어에 선택해 각각 플레이어 색상을 정합니다.
2. 단판, 3점, 5점, 10점중 목표 점수를 선택합니다.
3. 블랙 오픈 > 레드 오픈 > 다음 턴, 순서대로 게임을 진행합니다.
4. 15장의 카드중 본인이 선택한 색상의 카드가 더 많이 나온 플레이어가 점수를 갖습니다.
5. 게임이 종료되면 승자와 함께 대결 했던 플레이어의 이름이 표시됩니다.

- 게임 도중 플레이어를 변경하고 싶거나, 목표 점수를 변경하고 싶으면 새로 시작 버튼을 클릭해주세요.
- 기록 초기화 버튼을 통해 언제든지 그동안 플레이 했던 기록을 삭제할 수 있습니다.

## 기술적 특징

1. 피셔-에이츠 셔플 알고리즘
>카드를 완전 무작위로 섞어 게임 승패 밸런스를 구현했습니다.

2. 점수판 및 목표 점수 설정
>플레이어가 설정한 목표 점수에 도달하면 자동으로 게임이 종료됩니다.

3. 동적 점수판 업데이트
>턴이 끝날 때마다 점수를 실시간으로 업데이트하여 반영합니다.

4. 로컬 스토리지 이용
>게임 승자 정보를 로컬 스토리지에 저장하고 랭킹판에 표시합니다.
