//🎯 리팩토링 미션
//컴포넌트 상단 변수 선언부에서 긍정형 의미를 가진 변수명(isNotificationEnabled 등)을 새롭게 선언하여 조건을 뒤집으세요. (5일차에 배운 '조건에 이름 붙이기' 활용!)
//? A : null 형태의 불필요한 삼항 연산자를 && 연산자로 대체하여 왼쪽에서 오른쪽으로 자연스럽게 문장이 읽히도록 만드세요.
//2번 마케팅 동의 버튼 영역도 부정형 변수 때문에 헷갈리지 않도록, 긍정 상태를 기준으로 삼항 연산자의 순서(참/거짓 구조)를 깔끔하게 재배치해 보세요.

import React from 'react';

interface NotificationSettingProps {
  isNotificationDisabled: boolean; // 알림 비활성화 여부
  isMarketingRefused: boolean; // 마케팅 거부 여부
  onToggleNotification: () => void;
  onToggleMarketing: () => void;
}

export const NotificationManager: React.FC<NotificationSettingProps> = ({
  isNotificationDisabled,
  isMarketingRefused,
  onToggleNotification,
  onToggleMarketing,
}) => {
  return (
    <div className='p-4 border rounded-lg max-w-sm mx-auto bg-white'>
      <h2 className='text-lg font-bold mb-4'>알림 설정</h2>

      {/* 🚨 1번 문제의 영역: 부정 조건문과 삼항 연산자의 끔찍한 혼종 */}
      {!isNotificationDisabled ? (
        <div className='mb-4 p-3 bg-green-50 rounded text-sm text-green-800 flex justify-between items-center'>
          <span>현재 실시간 앱 알림을 정상적으로 받고 있습니다.</span>
          <button onClick={onToggleNotification} className='text-xs underline'>
            비활성화
          </button>
        </div>
      ) : null}

      {/* 🚨 2번 문제의 영역: 부정 변수명 때문에 뇌 정지 오는 삼항 연산자 */}
      <div className='p-3 border-t flex justify-between items-center'>
        <div>
          <p className='text-sm font-medium'>마케팅 정보 수신 동의</p>
          <p className='text-xs text-gray-500'>특가 및 이벤트 정보를 보내드립니다.</p>
        </div>

        {isMarketingRefused ? (
          <button onClick={onToggleMarketing} className='bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm'>
            동의하기
          </button>
        ) : (
          <button onClick={onToggleMarketing} className='bg-blue-500 text-white px-3 py-1 rounded text-sm'>
            철회하기
          </button>
        )}
      </div>
    </div>
  );
};
