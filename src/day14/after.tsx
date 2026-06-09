// 🎯 리팩토링 미션
// 4개의 useState를 formData라는 단 하나의 객체 상태로 응집시키세요. (타입스크립트 인터페이스를 선언해주면 더 좋습니다!)
// 4개의 input 태그에 각각 name 속성을 부여하고, 컴포넌트 상단에 handleChange라는 단 하나의 통합 이벤트 핸들러를 만들어서 모든 onChange를 교체하세요.
// (힌트: setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })) 패턴을 활용하세요!)
// handleSubmit 내부에서 상태를 조립하던 거추장스러운 코드를 날려버리고, 응집된 formData를 그대로 전송하도록 깔끔하게 정리해 보세요.

import React, {useState} from 'react';

interface ShippingInfoInterface {
  recipient: string;
  phone: string;
  address: string;
  detailAddress: string;
}

export const ShippingForm = () => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfoInterface>({
    recipient: '',
    phone: '',
    address: '',
    detailAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    alert('배송지 저장: ' + JSON.stringify(shippingInfo));
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded max-w-sm mx-auto space-y-3'>
      <h2 className='text-lg font-bold'>배송지 정보 입력</h2>

      <div>
        <label className='block text-sm'>수령인</label>
        <input
          type='text'
          name='recipient'
          value={shippingInfo.recipient}
          onChange={handleChange}
          className='border p-2 w-full'
        />
      </div>

      <div>
        <label className='block text-sm'>연락처</label>
        <input
          type='text'
          name='phone'
          value={shippingInfo.phone}
          onChange={handleChange}
          className='border p-2 w-full'
        />
      </div>

      <div>
        <label className='block text-sm'>주소</label>
        <input
          type='text'
          name='address'
          value={shippingInfo.address}
          onChange={handleChange}
          className='border p-2 w-full'
        />
      </div>

      <div>
        <label className='block text-sm'>상세 주소</label>
        <input
          type='text'
          name='detailAddress'
          value={shippingInfo.detailAddress}
          onChange={handleChange}
          className='border p-2 w-full'
        />
      </div>

      <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
        저장하기
      </button>
    </form>
  );
};
