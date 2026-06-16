import React, {useState} from 'react';

// 🚨 수많은 Props로 범벅이 된 뚱뚱한 메뉴 컴포넌트
export const LegacyMenu = ({triggerText, items, onSelect}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative inline-block'>
      <button onClick={() => setIsOpen(!isOpen)} className='px-4 py-2 bg-gray-200 rounded'>
        {triggerText}
      </button>

      {isOpen && (
        <ul className='absolute mt-2 w-48 bg-white border rounded shadow-lg'>
          {items.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
