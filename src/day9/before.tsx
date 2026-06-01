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

  // 🚨 1번 문제의 영역: 매개변수 이름이 상위 상태(items)를 교묘하게 가림 (Shadowing)
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(
      (
        items // 여기서 items는 상태 items일까, 매개변수 items일까?
      ) => items.map((item) => (item.id === id ? {...item, quantity} : item))
    );
  };

  // 🚨 2번 문제의 영역: map 내부의 인자 이름과, 내부 내부의 filter 인자 이름이 다 'item'으로 겹침
  return (
    <div className='p-4 border rounded-lg bg-white max-w-md mx-auto'>
      <h2 className='text-lg font-bold mb-4'>장바구니 관리</h2>

      <div className='space-y-3'>
        {items.map(
          (
            item // 1단계: item
          ) => (
            <div key={item.id} className='p-3 border rounded flex justify-between items-center'>
              <div>
                <p className='font-medium'>{item.name}</p>
                <p className='text-sm text-gray-500'>{item.price}원</p>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => {
                    // 특정 조건을 검사하기 위해 굳이 내부에서 또 items를 뒤지는데, 인자 이름을 또 item으로 씀
                    const currentItem = items.find((item) => item.id === item.id); // 🚨 지옥의 item 파티
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
          )
        )}
      </div>
    </div>
  );
};
