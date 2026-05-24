# toss-inspired-clean-code

토스 프론트엔드 클린 코드 스타일에서 아이디어를 얻어, 직접 리액트 리팩토링 문제를 만들고 풀이한 저장소입니다.

공식 자료를 그대로 옮기기보다, 비슷한 문제 상황을 스스로 구성한 뒤 `before`와 `after`를 비교하면서 컴포넌트 분리, 조건 분기 정리, 추상화 레벨 조절을 연습합니다.

## 구조

```text
src/
  day1/
    before.tsx
    after.tsx
  day2/
    before.tsx
    after.tsx
  day3/
    before.tsx
    after.tsx
    useCart.tsx
  day4/
    before.tsx
    after.tsx
```

각 일차는 보통 다음 흐름을 따릅니다.

- `before.tsx`: 읽기 어렵거나 책임이 섞인 예제
- `after.tsx`: 같은 동작을 더 명확한 구조로 정리한 풀이
- 보조 파일: 해당 일차의 풀이에 필요한 훅이나 유틸

## 다루는 주제

- 역할별 컴포넌트 분리
- 조건 분기와 상태 격리
- 페이지 컴포넌트의 추상화 레벨 조절
- 커스텀 훅을 통한 데이터 패칭 관심사 분리

## 확인

```bash
npm install
npm run typecheck
```

현재는 실행용 앱보다 타입스크립트/리액트 예제 모음에 가깝습니다.
