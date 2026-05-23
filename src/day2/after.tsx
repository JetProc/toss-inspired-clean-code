import React, {useState, useEffect} from 'react';

interface OrderDetail {
  orderId: string;
  amount: number;
  productName: string;
}

type LegacyOrderViewProps =
  | {
      isGuest: true;
      guestPhoneNumber: string; // 비회원일 땐 필수!
      memberId?: never; // 회원 ID는 절대 들어올 수 없음!
    }
  | {
      isGuest: false;
      memberId: string; // 회원일 땐 필수!
      guestPhoneNumber?: never; // 비회원 전화번호는 절대 들어올 수 없음!
    };

type GuestSectionProps = Omit<Extract<LegacyOrderViewProps, {isGuest: true}>, 'isGuest'>;
type MemberSectionProps = Omit<Extract<LegacyOrderViewProps, {isGuest: false}>, 'isGuest'>;

const GuestOrderSection = ({guestPhoneNumber}: GuestSectionProps) => {
  // 비회원 전용 인증 상태
  const [guestAuthToken, setGuestAuthToken] = useState<string | null>(null);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrderData() {
      setIsLoading(true);
      try {
        // 비회원 주문 조회 로직 (휴대폰 번호 기반)
        const response = await fetch(`/api/guest/orders?phone=${guestPhoneNumber}`);
        const data = await response.json();
        setOrder(data.order);
        setGuestAuthToken(data.token); // 비회원 전용 토큰 저장
      } catch (error) {
        console.error('주문 조회 실패', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderData();
  }, [guestPhoneNumber]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!order) return <div>주문 내역이 없습니다.</div>;

  return (
    <div style={{padding: '20px', border: '1px solid #ccc'}}>
      <h2>주문 상세 내역</h2>
      <p>주문 상품: {order.productName}</p>
      <p>결제 금액: {order.amount}원</p>
      <div className='guest-action-box' style={{marginTop: '16px', color: '#ff4d4f'}}>
        <p>⚠️ 비회원 주문입니다. (인증 토큰: {guestAuthToken ?? '없음'})</p>
        <button onClick={() => alert('비회원 전용 영수증 출력')}>비회원 영수증 발행</button>
      </div>
    </div>
  );
};

const MemberOrderSection = ({memberId}: MemberSectionProps) => {
  // 회원 전용 혜택 포인트 상태
  const [memberPoints, setMemberPoints] = useState<number>(0);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrderData() {
      setIsLoading(true);
      try {
        // 회원 주문 조회 로직 (멤버 ID 기반)
        const response = await fetch(`/api/member/orders/${memberId}`);
        const data = await response.json();
        setOrder(data.order);
        setMemberPoints(data.points); // 회원 전용 포인트 저장
      } catch (error) {
        console.error('주문 조회 실패', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderData();
  }, [memberId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!order) return <div>주문 내역이 없습니다.</div>;

  return (
    <div style={{padding: '20px', border: '1px solid #ccc'}}>
      <h2>주문 상세 내역</h2>
      <p>주문 상품: {order.productName}</p>
      <p>결제 금액: {order.amount}원</p>
      <div className='member-action-box' style={{marginTop: '16px', color: '#3d9c48'}}>
        <p>✨ 회원 주문 혜택</p>
        <p>적립 예정 포인트: {memberPoints} P</p>
        <button onClick={() => alert('회원 전용 쿠폰 발급')}>포인트 더블 적립 쿠폰 받기</button>
      </div>
    </div>
  );
};

export function LegacyOrderView({isGuest, guestPhoneNumber, memberId}: LegacyOrderViewProps) {
  if (isGuest) {
    return <GuestOrderSection guestPhoneNumber={guestPhoneNumber} />;
  }

  return <MemberOrderSection memberId={memberId} />;
}
