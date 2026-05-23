import {useState} from 'react';

type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface ActionButtonProps {
  role: UserRole;
  onClick: () => void;
}

export const ActionButton = ({role, onClick}: ActionButtonProps) => {
  // 냄새 1: ADMIN 전용 상태 (USER, GUEST일 때도 불필요하게 선언됨)
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  // 냄새 2: USER 전용 상태
  const [userClickCount, setUserClickCount] = useState(0);

  const handleClick = async () => {
    if (role === 'ADMIN') {
      setIsAdminLoading(true);
      await fetch('/api/admin/log'); // 어드민 전용 로깅 API 호출
      setIsAdminLoading(false);
      onClick();
    } else if (role === 'USER') {
      setUserClickCount((prev) => prev + 1);
      onClick();
    } else {
      onClick(); // GUEST
    }
  };

  // 냄새 3: 역할에 따라 렌더링 로직이 파편화됨
  if (role === 'GUEST') {
    return <button onClick={handleClick}>로그인이 필요합니다</button>;
  }

  return (
    <button onClick={handleClick} className={role === 'ADMIN' ? 'bg-red-500' : 'bg-blue-500'} disabled={isAdminLoading}>
      {role === 'ADMIN' ? '관리자 승인' : `사용자 액션 (${userClickCount})`}
    </button>
  );
};
