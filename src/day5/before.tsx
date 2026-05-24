//🎯 리팩토링 미션
// JSX(렌더링 영역) 안에서 삼항 연산자와 함께 뒤엉켜 있는 복잡한 조건식들을 의미가 명확한 명사형 변수명으로 추출하세요.
// 조건식을 분리할 때, 유저가 쿠폰을 받을 수 있는 '공통 자격 요건(예: 로그인 여부, 블랙리스트 제외)'이 중복되고 있다면 이 역시 우아하게 결합하거나 분리해 보세요.
// 변수명을 지을 때는 토스 크루들이 바로 이해할 수 있도록 명확한 도메인 용어(Pascal/camelCase 규칙 준수)를 사용하세요.

import React from 'react';

interface User {
  isLoggedIn: boolean;
  isBlacklist: boolean;
  level: 'BRONZE' | 'SILVER' | 'GOLD';
  hasWelcomeCoupon: boolean;
}

interface Cart {
  items: {id: number; price: number; category: string}[];
  totalPrice: number;
}

interface CouponProps {
  user: User;
  cart: Cart;
}

export const CouponSelector: React.FC<CouponProps> = ({user, cart}) => {
  return (
    <div className='p-4 theme-dark'>
      {/* 🚨 문제의 조건식 영역 */}
      {user.isLoggedIn &&
      !user.isBlacklist &&
      (user.level === 'GOLD' || user.level === 'SILVER') &&
      cart.totalPrice >= 30000 &&
      cart.items.some((item) => item.category === 'FOOD') ? (
        <button className='bg-blue-500 text-white p-2 rounded'>우수 회원 식품 특별 쿠폰 적용하기</button>
      ) : user.isLoggedIn && !user.isBlacklist && user.hasWelcomeCoupon && cart.totalPrice >= 10000 ? (
        <button className='bg-green-500 text-white p-2 rounded'>신규 회원 웰컴 쿠폰 적용하기</button>
      ) : (
        <p className='text-gray-400'>적용 가능한 쿠폰이 없습니다.</p>
      )}
    </div>
  );
};
