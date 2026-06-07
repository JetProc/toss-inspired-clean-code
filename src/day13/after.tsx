// 🎯 리팩토링 미션
// 이 e-커머스 서비스의 핵심 정책(배송비, 무료배송 기준점, 최대 구매 수량)을 모아둔 하나의 응집된 상수 객체(예: ORDER_POLICY)를 만들어보세요.
// 만들어진 상수 객체를 활용하여 ProductDetail과 Cart 컴포넌트 내부의 매직 넘버들을 모두 교체해 보세요.
// 기획자가 "무료배송 기준을 3만 원으로 내리고, 기본 배송비는 4천 원으로 올리고, 최대 구매 수량은 5개로 줄여주세요"라고 했을 때, 순재님의 코드는 얼마나 우아하게 대처할 수 있을지 상상하며 수정해 보세요.

import {useState} from 'react';

const ORDER_POLICY = {
  MAX_QUANTITY: 10,
  FREE_SHIPPING_FEE_THRESHOLD: 50000,
  SHIPPING_FEE: 3000,
} as const;

export const ProductDetail = ({price}: {price: number}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    if (quantity >= ORDER_POLICY.MAX_QUANTITY) {
      alert(`최대 ${ORDER_POLICY.MAX_QUANTITY}개까지만 구매할 수 있습니다.`);
      return;
    }
    setQuantity((q) => q + 1);
  };

  return (
    <div>
      <button onClick={handleAddQuantity}>+ 추가</button>
      <p>
        {price * quantity >= ORDER_POLICY.FREE_SHIPPING_FEE_THRESHOLD
          ? '무료배송'
          : `배송비 ${ORDER_POLICY.SHIPPING_FEE.toLocaleString()}원`}
      </p>
    </div>
  );
};

export const Cart = ({totalAmount}: {totalAmount: number}) => {
  const validateCartItem = (itemQuantity: number) => {
    if (itemQuantity > ORDER_POLICY.MAX_QUANTITY) {
      return false;
    }
    return true;
  };

  const shippingFee = totalAmount >= ORDER_POLICY.FREE_SHIPPING_FEE_THRESHOLD ? 0 : ORDER_POLICY.SHIPPING_FEE;
  const finalPrice = totalAmount + shippingFee;

  return (
    <div>
      <p>상품 총액: {totalAmount}원</p>
      <p>배송비: {shippingFee}원</p>
      <p>최종 결제 금액: {finalPrice}원</p>
    </div>
  );
};
