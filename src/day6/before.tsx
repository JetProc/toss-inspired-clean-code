//🎯 리팩토링 미션
//오직 '닉네임 변경 섹션'에서만 사용되는 상태와 핸들러, 그리고 오직 '혜택 안내 섹션'에서만 사용되는 헬퍼 함수의 물리적 위치를 배치 원칙에 맞게 조정해 보세요.
//필요한 경우 컴포넌트를 의미 있는 서브 컴포넌트로 쪼개어, 부모 컴포넌트(MyProfileManager)의 선언부 인지 부하를 줄이고 시점 이동을 원천 차단해 보세요.

import React, {useState} from 'react';

interface ProfileProps {
  userLevel: 'BRONZE' | 'SILVER' | 'GOLD';
  initialNickname: string;
}

export const MyProfileManager: React.FC<ProfileProps> = ({userLevel, initialNickname}) => {
  // 🚨 1. 온갖 상태와 함수들이 최상단에 모여 있음
  const [nickname, setNickname] = useState(initialNickname);
  const [isEditing, setIsEditing] = useState(false);

  // 닉네임 변경 폼 제출 핸들러 (오직 닉네임 변경 영역에서만 사용됨)
  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert(`닉네임이 ${nickname}으로 변경되었습니다.`);
  };

  // 등급별 혜택 문구 캐싱 함수 (오직 하단 혜택 안내 영역에서만 사용됨)
  const getBenefitMessage = (level: string) => {
    switch (level) {
      case 'GOLD':
        return '전 상품 무료 배송 + 5% 즉시 적립';
      case 'SILVER':
        return '2만원 이상 무료 배송 + 2% 즉시 적립';
      default:
        return '일반 적립 0.5%';
    }
  };

  return (
    <div className='p-6 border rounded-lg bg-white max-w-md mx-auto'>
      <h1 className='text-xl font-bold mb-6'>마이페이지 관리</h1>

      {/* 👤 닉네임 변경 섹션 */}
      <section className='mb-8 p-4 bg-gray-50 rounded'>
        <h2 className='text-lg font-semibold mb-2'>프로필 수정</h2>
        {isEditing ? (
          <form onSubmit={handleNicknameSubmit} className='flex gap-2'>
            <input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className='border p-1 rounded'
            />
            <button type='submit' className='bg-blue-500 text-white px-3 py-1 rounded'>
              저장
            </button>
          </form>
        ) : (
          <div className='flex justify-between items-center'>
            <p>
              닉네임: <span className='font-medium'>{nickname}</span>
            </p>
            <button onClick={() => setIsEditing(true)} className='text-blue-500 hover:underline'>
              수정
            </button>
          </div>
        )}
      </section>

      {/* 🎁 등급별 혜택 안내 섹션 */}
      <section className='p-4 border-t'>
        <h2 className='text-lg font-semibold mb-2'>회원 등급 혜택</h2>
        <p className='text-sm text-gray-600 mb-2'>
          현재 회원님의 등급은 <span className='font-bold text-blue-600'>{userLevel}</span>입니다.
        </p>
        <div className='bg-blue-50 p-3 rounded text-blue-800 text-sm font-medium'>{getBenefitMessage(userLevel)}</div>
      </section>
    </div>
  );
};
