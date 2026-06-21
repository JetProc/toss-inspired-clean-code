// 🎯 리팩토링 미션
// 중간 배달원 역할을 하는 MainLayout과 Sidebar 컴포넌트에서 user와 theme Props를 과감하게 전부 삭제하세요.
// MainLayout과 Sidebar가 children (React.ReactNode)을 받도록 수정하여, 자신의 안쪽에 무엇이 들어올지 모르는 상태(빈 껍데기)로 만드세요.
// 최상위 Dashboard 컴포넌트에서 <MainLayout>, <Sidebar>, <UserMenu>를 마치 HTML 태그를 중첩하듯 직접 조립(합성)하여, UserMenu에게 데이터를 다이렉트로 쏴주세요!

// 🚨 아무 필요 없는 theme과 user를 그저 자식에게 주기 위해 받고 있는 중간 배달원들
const UserMenu = ({user, theme}: {user: any; theme: string}) => {
  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <img src={user.avatar} alt='프로필' className='w-10 h-10 rounded-full' />
      <p>{user.name}님 환영합니다</p>
    </div>
  );
};

const Sidebar = ({children}: {children: React.ReactNode}) => {
  return (
    <aside className='w-64 border-r h-screen'>
      <nav>메뉴 1</nav>
      <nav>메뉴 2</nav>
      {children}
    </aside>
  );
};

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex'>
      {children}
      <main className='flex-1 p-10'>메인 콘텐츠 영역</main>
    </div>
  );
};

// 최상위 부모 컴포넌트
export const Dashboard = () => {
  const currentUser = {name: '이순재', avatar: 'https://via.placeholder.com/150'};
  const currentTheme = 'dark';

  return (
    // 최상위에서 저 밑바닥까지 Props를 내리꽂는 중 (Props Drilling)
    <MainLayout>
      <Sidebar>
        <UserMenu user={currentUser} theme={currentTheme}></UserMenu>
      </Sidebar>
    </MainLayout>
  );
};
