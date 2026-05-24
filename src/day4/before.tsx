//🎯 리팩토링 미션
// 거대한 usePaymentPageState를 기능적 관심사(배송지, 결제수단, 약관동의)에 따라 명확하게 쪼개보세요.
// 하나의 커다란 state 객체로 묶여 있어서 생기는 불필요한 객체 복사 연산과 인지 부하를 줄여보세요.
// 쪼갠 훅들이 각각 어떤 TS 인터페이스나 반환 타입을 가질지 깔끔하게 설계해 보세요.

import {useState, useEffect} from 'react';

interface SharedPaymentState {
  // 1. 유저 주소 관련 상태
  address: string;
  zoneCode: string;
  // 2. 결제 수단 관련 상태
  selectedMethod: 'CARD' | 'TRANSFER' | 'TOSS_PAY';
  isEasyPay: boolean;
  // 3. 약관 동의 관련 상태
  agreedTermsIds: number[];
}

export const usePaymentPageState = () => {
  const [state, setState] = useState<SharedPaymentState>({
    address: '',
    zoneCode: '',
    selectedMethod: 'CARD',
    isEasyPay: false,
    agreedTermsIds: [],
  });

  // 주소 변경 핸들러
  const updateAddress = (address: string, zoneCode: string) => {
    setState((prev) => ({...prev, address, zoneCode}));
  };

  // 결제 수단 변경 핸들러
  const changeMethod = (method: 'CARD' | 'TRANSFER' | 'TOSS_PAY') => {
    setState((prev) => ({
      ...prev,
      selectedMethod: method,
      isEasyPay: method === 'TOSS_PAY',
    }));
  };

  // 약관 토글 핸들러
  const toggleTerm = (termId: number) => {
    setState((prev) => {
      const isAgreed = prev.agreedTermsIds.includes(termId);
      const nextTerms = isAgreed ? prev.agreedTermsIds.filter((id) => id !== termId) : [...prev.agreedTermsIds, termId];
      return {...prev, agreedTermsIds: nextTerms};
    });
  };

  return {
    state,
    updateAddress,
    changeMethod,
    toggleTerm,
  };
};
