// 🎯 리팩토링 미션
// 이 e-커머스 서비스의 핵심 정책(배송비, 무료배송 기준점, 최대 구매 수량)을 모아둔 하나의 응집된 상수 객체(예: ORDER_POLICY)를 만들어보세요.
// 만들어진 상수 객체를 활용하여 ProductDetail과 Cart 컴포넌트 내부의 매직 넘버들을 모두 교체해 보세요.
// 기획자가 "무료배송 기준을 3만 원으로 내리고, 기본 배송비는 4천 원으로 올리고, 최대 구매 수량은 5개로 줄여주세요"라고 했을 때, 순재님의 코드는 얼마나 우아하게 대처할 수 있을지 상상하며 수정해 보세요.

import {useState} from 'react';

// 🚨 파일 1: ProductDetail.tsx (상품 상세 페이지)
export const ProductDetail = ({price}: {price: number}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    // 숨어있는 매직 넘버: 10
    if (quantity >= 10) {
      alert('최대 10개까지만 구매할 수 있습니다.');
      return;
    }
    setQuantity((q) => q + 1);
  };

  return (
    <div>
      <button onClick={handleAddQuantity}>+ 추가</button>
      {/* 숨어있는 매직 넘버: 50000 */}
      <p>{price * quantity >= 50000 ? '무료배송' : '배송비 3,000원'}</p>
    </div>
  );
};

// ---------------------------------------------------------

// 🚨 파일 2: Cart.tsx (장바구니 페이지)
export const Cart = ({totalAmount}: {totalAmount: number}) => {
  const validateCartItem = (itemQuantity: number) => {
    // 저 멀리 다른 파일에 숨어있는 매직 넘버: 10
    if (itemQuantity > 10) {
      return false;
    }
    return true;
  };

  // 숨어있는 매직 넘버: 50000, 3000
  const shippingFee = totalAmount >= 50000 ? 0 : 3000;
  const finalPrice = totalAmount + shippingFee;

  return (
    <div>
      <p>상품 총액: {totalAmount}원</p>
      <p>배송비: {shippingFee}원</p>
      <p>최종 결제 금액: {finalPrice}원</p>
    </div>
  );
};
