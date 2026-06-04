// 🎯 리팩토링 미션
// 순수 함수로 분리하기: 주문 데이터가 유효한지 검사하는 역할을 별도의 함수(예: checkOrderValidation)로 분리하되, 외부 상태를 변경하거나 원본 데이터를 수정(item.isValid = ...)하지 않고 오직 검사 결과만 깔끔하게 반환하도록 만드세요. (10일차에 배운 객체 반환 구조를 활용하면 아주 좋습니다!)
// 이벤트 핸들러에 로직 드러내기: getValidOrderData에 꽁꽁 숨어있던 상태 변경 로직(setErrorMsg, setItems 등을 통한 isValid 갱신)을 모두 handleCheckout 내부로 끄집어내세요.
// 코드를 다 고친 후, handleCheckout 함수만 읽었을 때 "클릭 시 어떤 일들이 일어나는지" 위에서 아래로 예측 가능하게 읽히는지 확인해 보세요.

import React, {useState} from 'react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  stock: number;
  isValid?: boolean; // 재고가 충분한지 여부
}

export const CheckoutPage: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([
    {id: '1', name: '키보드', quantity: 2, stock: 5},
    {id: '2', name: '마우스', quantity: 10, stock: 3}, // 재고 초과!
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  // 🚨 문제의 함수: 이름은 'Get'인데 안에서 지지고 볶고 숨은 로직 대잔치 중!
  const getValidOrderData = (currentItems: OrderItem[]) => {
    let hasError = false;

    currentItems.forEach((item) => {
      // 🚨 숨은 로직 1: 인자로 받은 원본 데이터를 몰래 오염시킴 (Mutation)
      if (item.quantity > item.stock) {
        item.isValid = false;
        hasError = true;
      } else {
        item.isValid = true;
      }
    });

    // 🚨 숨은 로직 2: 계산 함수 안에서 외부의 상태(State)를 몰래 변경함 (Side Effect)
    if (hasError) {
      setErrorMsg('재고가 부족한 상품이 있습니다.');
      return null;
    }

    setErrorMsg('');
    return currentItems;
  };

  const handleCheckout = () => {
    // 동료 개발자 시점: "음, 유효한 주문 데이터를 가져와서 API로 쏘는군. 완벽해!" (-> 그리고 버그 터짐)
    const validData = getValidOrderData(items);

    if (validData) {
      alert('결제 API 호출: ' + JSON.stringify(validData));
    }
  };

  return (
    <div className='p-4 max-w-sm mx-auto'>
      <h2 className='text-xl font-bold mb-4'>주문 결제</h2>
      {errorMsg && <p className='text-red-500 mb-4'>{errorMsg}</p>}

      <ul className='mb-4 space-y-2'>
        {items.map((item) => (
          <li key={item.id} className={`p-2 border ${item.isValid === false ? 'bg-red-50' : 'bg-white'}`}>
            {item.name} - {item.quantity}개 (재고: {item.stock})
          </li>
        ))}
      </ul>

      <button onClick={handleCheckout} className='w-full bg-black text-white p-2 rounded'>
        결제하기
      </button>
    </div>
  );
};
