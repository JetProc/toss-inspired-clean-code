import React, {useState, createContext, useContext} from 'react';

const MenuContext = createContext<any>(null);

export const Menu = ({children}: {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuContext.Provider value={{isOpen, setIsOpen}}>
      <div className='relative inline-block'>{children}</div>
    </MenuContext.Provider>
  );
};

const Trigger = ({children}: {children: React.ReactNode}) => {
  const {isOpen, setIsOpen} = useContext(MenuContext);
  return (
    <button className='px-4 py-2 bg-gray-200 rounded' onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
};

const List = ({children}: {children: React.ReactNode}) => {
  const {isOpen} = useContext(MenuContext);
  return <>{isOpen && <ul className='absolute mt-2 w-48 bg-white border rounded shadow-lg'>{children}</ul>}</>;
};

const Item = ({children, onSelect}: {children: React.ReactNode; onSelect: () => void}) => {
  const {setIsOpen} = useContext(MenuContext);
  const handleClick = () => {
    onSelect();
    setIsOpen(false);
  };

  return (
    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleClick}>
      {children}
    </li>
  );
};

Menu.Trigger = Trigger;
Menu.List = List;
Menu.Item = Item;

// =======================================================
// 🎯 최종 사용처 (부모 컴포넌트에서 이렇게 사용되도록 만들어주세요)
// =======================================================
export const App = () => {
  return (
    <div className='p-10'>
      <Menu>
        <Menu.Trigger>내 정보</Menu.Trigger>
        <Menu.List>
          <Menu.Item onSelect={() => console.log('프로필')}>프로필 수정</Menu.Item>
          <Menu.Item onSelect={() => console.log('설정')}>설정</Menu.Item>
          <Menu.Item onSelect={() => console.log('로그아웃')}>로그아웃</Menu.Item>
        </Menu.List>
      </Menu>
    </div>
  );
};
