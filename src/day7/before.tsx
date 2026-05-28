// 🎯 리팩토링 미션
// JSX 내부의 꼬여 있는 중첩 삼항 연산자를 해체하세요.
// 컴포넌트 상단에서 조기 리턴(Early Return)을 활용하거나, 상태별 UI를 별도의 함수/컴포넌트로 분리하여 PaymentMethodSelector 본체 컴포넌트의 메인 JSX 레이아웃이 한눈에 들어오도록 만드세요.

import React from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  isPrimary: boolean;
}

interface PaymentSelectorProps {
  isLoading: boolean;
  error: Error | null;
  methods: PaymentMethod[];
  onSelect: (id: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentSelectorProps> = ({isLoading, error, methods, onSelect}) => {
  return (
    <div className='p-4 border rounded-lg bg-gray-50'>
      <h2 className='text-md font-bold mb-3'>결제 수단 선택</h2>

      {/* 🚨 지옥의 중첩 삼항 연산자 영역 */}
      {isLoading ? (
        <div className='text-center py-4 text-gray-500'>결제 수단을 불러오는 중입니다...</div>
      ) : error ? (
        <div className='text-center py-4 text-red-500'>오류가 발생했습니다: {error.message}</div>
      ) : methods.length === 0 ? (
        <div className='text-center py-4 text-gray-400'>등록된 결제 수단이 없습니다. 먼저 등록해 주세요.</div>
      ) : (
        <ul className='space-y-2'>
          {methods.map((method) => (
            <li key={method.id} className='p-3 bg-white border rounded flex justify-between items-center'>
              <span>
                {method.name} {method.isPrimary && <span className='text-xs text-blue-500 font-bold'>(기본)</span>}
              </span>
              <button
                onClick={() => onSelect(method.id)}
                className='bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600'
              >
                선택
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
