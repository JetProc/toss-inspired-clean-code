//🎯 리팩토링 미션
// PaymentPage 컴포넌트를 열었을 때, 인증이나 데이터 패칭 같은 세부 제어 흐름 대신 "이 페이지의 핵심 비즈니스 흐름(주문서 작성 UI 구조)"이 한눈에 가독성 있게 들어오도록 추상화 레벨을 끌어올려 봐.
// 인증 체크 로직과 데이터 패칭 로직을 어떻게 감싸서(Wrapper 컴포넌트, Custom Hook 등) 격리할지 고민해 봐.

import {useCart} from './useCart';
import {ReactNode} from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({children}: AuthGuardProps) => {
  const token = localStorage.getItem('toss_access_token');
  if (!token) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '/login';
    return <></>;
  }
  return <>{children}</>;
};

export function PaymentPage() {
  return (
    <AuthGuard>
      <PaymentContent />
    </AuthGuard>
  );
}

export function PaymentContent() {
  const {cartItems, isLoading, isError} = useCart();

  if (isLoading) return <div>장바구니를 불러오는 중...</div>;
  if (isError) return <div>장바구니 로딩 실패 😭</div>;

  return (
    <div style={{padding: '24px'}}>
      <h1>주문서 작성</h1>
      <section>
        <h2>결제 대상 상품</h2>
        {cartItems.map((item) => (
          <div key={item.id} style={{margin: '8px 0', borderBottom: '1px solid #eee'}}>
            <p>
              {item.name} - {item.price}원
            </p>
          </div>
        ))}
      </section>
      <button onClick={() => alert('결제하기')}>결제하기</button>
    </div>
  );
}
