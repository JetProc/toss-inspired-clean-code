import {useEffect, useState} from 'react';

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const activeTodoCount = todos.filter((todo) => !todo.isDone).length;

  return {todos, inputText, handleAddTodo, handleToggleTodo, handleChangeInput, activeTodoCount};
};
