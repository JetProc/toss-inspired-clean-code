// 🎯 리팩토링 미션
// 비즈니스 로직(상태 관리, useEffect, 추가/토글 함수, 남은 개수 계산)을 전부 긁어모아서 useTodos라는 커스텀 훅으로 분리(응집)하세요.
// 커스텀 훅은 컴포넌트가 화면을 그리는 데 필요한 데이터와 함수들만 객체로 묶어서 return 하도록 만드세요.
// 기존 TodoApp 컴포넌트는 const { todos, inputText, ... } = useTodos(); 한 줄로 로직을 불러온 뒤, 오직 UI 렌더링에만 집중하도록 깔끔하게 다듬어 보세요.

import {useTodos} from './useTodos';

export const TodoApp = () => {
  const {todos, inputText, handleAddTodo, handleToggleTodo, handleChangeInput, activeTodoCount} = useTodos();

  // ----------------------------------------------------
  // 🚨 UI 렌더링 영역 (여기까지 도달하기가 너무 멉니다)
  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>내 할 일 ({activeTodoCount}개 남음)</h1>

      <div className='flex gap-2 mb-4'>
        <input value={inputText} onChange={handleChangeInput} className='border p-2 flex-1' />
        <button onClick={handleAddTodo} className='bg-blue-500 text-white p-2'>
          추가
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            className={`p-2 border-b cursor-pointer ${todo.isDone ? 'line-through text-gray-400' : ''}`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
