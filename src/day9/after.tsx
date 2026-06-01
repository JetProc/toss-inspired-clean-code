// 🎯 리팩토링 미션
// handleUpdateQuantity 함수 내부의 setItems((items) => ...) 영역에서 상위 items 상태명과 충돌하지 않도록 함수형 업데이트 인자명을 직관적으로 변경하세요 (예: prevItems 등).
// JSX 내부의 items.map((item) => ...) 안쪽 버튼 이벤트 영역에서 items.find((item) => ...) 처럼 이름이 겹치는 현상(섀도잉)을 접두사를 활용해 명확하게 찢어내세요.
// 코드를 다 고친 후, 변수명이 겹치지 않게 되었을 때 동료 개발자가 느끼는 '예측 가능성'의 이점을 머릿속으로 정리해 보세요.

import React, {useState} from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartManagerProps {
  initialItems: CartItem[];
}

export const CartManager: React.FC<CartManagerProps> = ({initialItems}) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? {...item, quantity} : item)));
  };

  return (
    <div className='p-4 border rounded-lg bg-white max-w-md mx-auto'>
      <h2 className='text-lg font-bold mb-4'>장바구니 관리</h2>

      <div className='space-y-3'>
        {items.map((item) => (
          <div key={item.id} className='p-3 border rounded flex justify-between items-center'>
            <div>
              <p className='font-medium'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.price}원</p>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    handleUpdateQuantity(item.id, item.quantity - 1);
                  }
                }}
                className='px-2 py-1 bg-gray-100 rounded'
              >
                -
              </button>
              <span className='text-sm font-bold'>{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className='px-2 py-1 bg-gray-100 rounded'
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
