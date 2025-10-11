export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">ぽんダナ</h1>
        <p className="text-xl text-gray-600 mb-8">
          エンジニアのための技術書籍管理サービス
        </p>
        <h2 className="text-2xl mb-8">
          ぽんダナであなたの読書と学びを記録してみませんか？
        </h2>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            はじめる
          </button>
          <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition">
            もっと詳しく
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">書籍を管理</h3>
          <p className="text-gray-600">
            読んだ技術書を簡単に記録・管理できます
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">学びを記録</h3>
          <p className="text-gray-600">
            読書メモや学んだことを記録して振り返りましょう
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">検索・発見</h3>
          <p className="text-gray-600">
            他のエンジニアが読んでいる本を発見できます
          </p>
        </div>
      </section>
    </div>
  );
}
