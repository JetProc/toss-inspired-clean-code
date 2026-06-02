// 🎯 리팩토링 미션
// 세 개의 밸리데이션 함수(validateEmail, validatePassword, validateNickname)가 모두 동일한 형태의 객체 인터페이스를 반환하도록 타입을 설계하고 통일하세요. (인터페이스 이름은 자유, 규격 일치화가 핵심!)
// 규격이 일치되었을 때, handleSubmit 내부의 조기 리턴(Early Return) 분기문들이 얼마나 일관성 있고 깔끔하게 정돈되는지 코드로 증명해 보세요.

import React, {useState} from 'react';

type ValidateResult = {success: true} | {success: false; msg: string};

const validateEmail = (email: string): ValidateResult => {
  if (!email.includes('@')) {
    return {success: false, msg: '올바른 이메일 형식이 아닙니다.'};
  }
  return {success: true};
};

const validatePassword = (password: string): ValidateResult => {
  if (password.length < 8) {
    return {success: false, msg: '비밀번호는 8자리 이상이어야 합니다.'};
  }
  return {success: true};
};

const validateNickname = (nickname: string): ValidateResult => {
  if (nickname.length < 2) {
    return {success: false, msg: '닉네임은 2글자 이상이어야 합니다.'};
  }
  return {success: true};
};

export const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailResult = validateEmail(email);
    if (!emailResult.success) {
      setError(emailResult.msg);
      return;
    }

    const passwordResult = validatePassword(password);
    if (!passwordResult.success) {
      setError(passwordResult.msg);
      return;
    }

    const nicknameResult = validateNickname(nickname);
    if (!nicknameResult.success) {
      setError(nicknameResult.msg);
      return;
    }

    alert('회원가입 성공!');
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded max-w-sm mx-auto space-y-4'>
      <h2 className='text-lg font-bold'>회원가입</h2>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <input
        type='text'
        placeholder='이메일'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full border p-2 rounded'
      />
      <input
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full border p-2 rounded'
      />
      <input
        type='text'
        placeholder='닉네임'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className='w-full border p-2 rounded'
      />
      <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
        가입하기
      </button>
    </form>
  );
};
