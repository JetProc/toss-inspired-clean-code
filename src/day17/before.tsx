// 🎯 리팩토링 미션
// 모달 범용화: ArticleDeleteModal의 이름을 범용적인 이름(예: ConfirmModal)으로 바꾸세요.
// 제어권 위임 (Props 설계): 컴포넌트 내부에 하드코딩된 제목, 설명, 확인 버튼 텍스트, 그리고 확인 버튼을 눌렀을 때 실행될 함수(onConfirm)를 모두 부모로부터 Props로 받도록 만드세요. (articleId 같은 도메인 데이터는 빼버리세요!)
// 부모에서 제어하기: FeedPage (부모 컴포넌트)에서 변경된 ConfirmModal을 호출할 때, "게시글 삭제"에 맞는 텍스트와 실제 API 호출 함수를 주입(전달)해 보세요.

import React, {useState} from 'react';

// 🚨 문제의 컴포넌트: 게시글 삭제 도메인에 완벽하게 결합됨
export const ArticleDeleteModal = ({
  isOpen,
  onClose,
  articleId,
}: {
  isOpen: boolean;
  onClose: () => void;
  articleId: number;
}) => {
  // 모달 내부에서 API 호출 로직을 직접 쥐고 있음 (제어권이 자식에게 있음)
  const handleDeleteClick = () => {
    console.log(`API 🚀: ${articleId}번 게시글 삭제 API 호출!`);
    alert('게시글이 삭제되었습니다.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg w-80'>
        {/* 텍스트가 하드코딩 되어있음 */}
        <h2 className='text-xl font-bold mb-2'>게시글을 삭제하시겠습니까?</h2>
        <p className='text-gray-600 mb-6'>삭제된 게시글은 복구할 수 없습니다.</p>

        <div className='flex justify-end gap-2'>
          <button onClick={onClose} className='px-4 py-2 border rounded'>
            취소
          </button>
          <button onClick={handleDeleteClick} className='px-4 py-2 bg-red-500 text-white rounded'>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 부모 컴포넌트 (사용처) ---
export const FeedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='p-4'>
      <button onClick={() => setIsModalOpen(true)}>게시글 지우기</button>

      {/* 부모는 그저 모달을 열고 닫는 역할만 할 뿐, 실제 중요한 삭제 로직은 모달 안에 갇혀있음 */}
      <ArticleDeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} articleId={123} />
    </div>
  );
};
