// 🎯 리팩토링 미션
// LegacyOrderView가 가독성 기준에 맞게 실행 경로만 결정하도록 변경해 봐.
// 회원과 비회원일 때 각각 붙잡아야 하는 맥락(상태, 이펙트, UI)을 완벽하게 격리해 봐.

import React, {useState, useEffect} from 'react';

interface OrderDetail {
  orderId: string;
  amount: number;
  productName: string;
}

interface LegacyOrderViewProps {
  isGuest: boolean;
  guestPhoneNumber?: string;
  memberId?: string;
}

export function LegacyOrderView({isGuest, guestPhoneNumber, memberId}: LegacyOrderViewProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 비회원 전용 인증 상태
  const [guestAuthToken, setGuestAuthToken] = useState<string | null>(null);
  // 회원 전용 혜택 포인트 상태
  const [memberPoints, setMemberPoints] = useState<number>(0);

  useEffect(() => {
    async function fetchOrderData() {
      setIsLoading(true);
      try {
        if (isGuest && guestPhoneNumber) {
          // 비회원 주문 조회 로직 (휴대폰 번호 기반)
          const response = await fetch(`/api/guest/orders?phone=${guestPhoneNumber}`);
          const data = await response.json();
          setOrder(data.order);
          setGuestAuthToken(data.token); // 비회원 전용 토큰 저장
        } else if (!isGuest && memberId) {
          // 회원 주문 조회 로직 (멤버 ID 기반)
          const response = await fetch(`/api/member/orders/${memberId}`);
          const data = await response.json();
          setOrder(data.order);
          setMemberPoints(data.points); // 회원 전용 포인트 저장
        }
      } catch (error) {
        console.error('주문 조회 실패', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderData();
  }, [isGuest, guestPhoneNumber, memberId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!order) return <div>주문 내역이 없습니다.</div>;

  return (
    <div style={{padding: '20px', border: '1px solid #ccc'}}>
      <h2>주문 상세 내역</h2>
      <p>주문 상품: {order.productName}</p>
      <p>결제 금액: {order.amount}원</p>

      {/* 서로 다른 조건의 UI와 로직이 하단에 산만하게 배치됨 */}
      {isGuest ? (
        <div className='guest-action-box' style={{marginTop: '16px', color: '#ff4d4f'}}>
          <p>⚠️ 비회원 주문입니다. (인증 토큰: {guestAuthToken ?? '없음'})</p>
          <button onClick={() => alert('비회원 전용 영수증 출력')}>비회원 영수증 발행</button>
        </div>
      ) : (
        <div className='member-action-box' style={{marginTop: '16px', color: '#3d9c48'}}>
          <p>✨ 회원 주문 혜택</p>
          <p>적립 예정 포인트: {memberPoints} P</p>
          <button onClick={() => alert('회원 전용 쿠폰 발급')}>포인트 더블 적립 쿠폰 받기</button>
        </div>
      )}
    </div>
  );
}
