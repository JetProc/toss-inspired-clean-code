// 🎯 리팩토링 미션
// 비즈니스 로직(상태 관리, useEffect, 추가/토글 함수, 남은 개수 계산)을 전부 긁어모아서 useTodos라는 커스텀 훅으로 분리(응집)하세요.
// 커스텀 훅은 컴포넌트가 화면을 그리는 데 필요한 데이터와 함수들만 객체로 묶어서 return 하도록 만드세요.
// 기존 TodoApp 컴포넌트는 const { todos, inputText, ... } = useTodos(); 한 줄로 로직을 불러온 뒤, 오직 UI 렌더링에만 집중하도록 깔끔하게 다듬어 보세요.

import React, {useState, useEffect} from 'react';

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

export const TodoApp = () => {
  // 🚨 비즈니스 로직 영역 (화면과 무관한 상태와 로직들이 너무 김)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // 가상의 API 호출이라 가정
    const savedTodos = [{id: 1, text: '리액트 복습하기', isDone: false}];
    setTodos(savedTodos);
  }, []);

  const handleAddTodo = () => {
    if (!inputText.trim()) return;
    const newTodo = {id: Date.now(), text: inputText, isDone: false};
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, isDone: !todo.isDone} : todo)));
  };

  const activeTodoCount = todos.filter((todo) => !todo.isDone).length;

  // ----------------------------------------------------
  // 🚨 UI 렌더링 영역 (여기까지 도달하기가 너무 멉니다)
  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>내 할 일 ({activeTodoCount}개 남음)</h1>

      <div className='flex gap-2 mb-4'>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} className='border p-2 flex-1' />
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
