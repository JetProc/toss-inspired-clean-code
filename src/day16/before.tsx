// 🎯 리팩토링 미션
// ArticleCard라는 이름을 도메인 냄새가 나지 않는 범용적인 이름(예: Card 또는 ContentCard)으로 바꿔보세요.
// 컴포넌트가 Article 객체를 통째로 받는 대신, 화면을 그리는 데 딱 필요한 낱개 데이터(문자열, 숫자 등)만 Props로 받도록 인터페이스와 매개변수를 수정하세요. (예: title, description, author, views 등)
// FeedPage 컴포넌트에서 새로운 카드를 호출할 때, mockArticle 객체의 데이터를 낱개로 쪼개서 예쁘게 주입(전달)해 보세요.

// 도메인 데이터 모델 (백엔드에서 오는 데이터 형태)
interface Article {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  viewCount: number;
}

// 🚨 문제의 컴포넌트: Article 객체를 통째로 받아서 강하게 결합되어 있음
export const ArticleCard = ({article}: {article: Article}) => {
  return (
    <div className='border p-4 rounded-lg shadow-md mb-4'>
      <h3 className='text-xl font-bold mb-2'>{article.title}</h3>
      <p className='text-gray-600 mb-4'>{article.content.substring(0, 50)}...</p>

      <div className='flex justify-between text-sm text-gray-400'>
        <span>작성자: {article.authorName}</span>
        <span>조회수: {article.viewCount}</span>
      </div>
    </div>
  );
};

export const FeedPage = () => {
  // 백엔드에서 받아왔다고 가정하는 게시글 데이터
  const mockArticle: Article = {
    id: 1,
    title: '결합도를 낮추는 마법',
    content: '오늘은 컴포넌트의 결합도를 낮추고 재사용성을 극대화하는 방법에 대해 알아보겠습니다.',
    authorName: '이순재',
    createdAt: '2023-10-25',
    viewCount: 150,
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>블로그 피드</h1>
      {/* Article 객체를 통째로 넘기고 있음 */}
      <ArticleCard article={mockArticle} />
    </div>
  );
};
