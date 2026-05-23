import {useState} from 'react';

type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface ActionButtonProps {
  role: UserRole;
  onClick: () => void;
}

interface SubButtonProps {
  onClick: () => void;
}

export const AdminActionButton = ({onClick}: SubButtonProps) => {
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const handleClick = async () => {
    setIsAdminLoading(true);
    await fetch('/api/admin/log');
    setIsAdminLoading(false);
    onClick();
  };

  return (
    <button onClick={handleClick} className={'bg-red-500'} disabled={isAdminLoading}>
      관리자 승인
    </button>
  );
};

export const UserActionButton = ({onClick}: SubButtonProps) => {
  const [userClickCount, setUserClickCount] = useState(0);

  const handleClick = () => {
    setUserClickCount((prev) => prev + 1);
    onClick();
  };

  return (
    <button onClick={handleClick} className={'bg-blue-500'}>
      {`사용자 액션 (${userClickCount})`}
    </button>
  );
};

export const GuestActionButton = ({onClick}: SubButtonProps) => {
  return <button onClick={onClick}>로그인이 필요합니다</button>;
};

export const ActionButton = ({role, onClick}: ActionButtonProps) => {
  switch (role) {
    case 'ADMIN':
      return <AdminActionButton onClick={onClick} />;
    case 'USER':
      return <UserActionButton onClick={onClick} />;
    case 'GUEST':
    default:
      return <GuestActionButton onClick={onClick} />;
  }
};
