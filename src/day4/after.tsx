//🎯 리팩토링 미션
// 거대한 usePaymentPageState를 기능적 관심사(배송지, 결제수단, 약관동의)에 따라 명확하게 쪼개보세요.
// 하나의 커다란 state 객체로 묶여 있어서 생기는 불필요한 객체 복사 연산과 인지 부하를 줄여보세요.
// 쪼갠 훅들이 각각 어떤 TS 인터페이스나 반환 타입을 가질지 깔끔하게 설계해 보세요.
import {useState} from 'react';

interface UserAddressState {
  address: string;
  zoneCode: string;
}

interface PaymentMethodState {
  selectedMethod: 'CARD' | 'TRANSFER' | 'TOSS_PAY';
  isEasyPay: boolean;
}

interface AgreedTermsState {
  agreedTermsIds: number[];
}

export const useAddress = () => {
  const [address, setAddress] = useState<UserAddressState>({
    address: '',
    zoneCode: '',
  });

  const updateAddress = (address: string, zoneCode: string) => {
    setAddress((prev) => ({...prev, address, zoneCode}));
  };

  return {address, updateAddress};
};

export const usePaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodState>({
    selectedMethod: 'CARD',
    isEasyPay: false,
  });

  const changeMethod = (method: 'CARD' | 'TRANSFER' | 'TOSS_PAY') => {
    setPaymentMethod((prev) => ({
      ...prev,
      selectedMethod: method,
      isEasyPay: method === 'TOSS_PAY',
    }));
  };

  return {paymentMethod, changeMethod};
};

export const useAgreedTerms = () => {
  const [agreedTerms, setAgrredTerms] = useState<AgreedTermsState>({
    agreedTermsIds: [],
  });

  const toggleTerm = (termId: number) => {
    setAgrredTerms((prev) => {
      const isAgreed = prev.agreedTermsIds.includes(termId);
      const nextTerms = isAgreed ? prev.agreedTermsIds.filter((id) => id !== termId) : [...prev.agreedTermsIds, termId];
      return {...prev, agreedTermsIds: nextTerms};
    });
  };

  return {agreedTerms, toggleTerm};
};
