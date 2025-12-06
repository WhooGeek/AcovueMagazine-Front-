export default function ArticleCard({ data }) {
  return (
    <div className="article-card">
      <img src={data.imageUrl} alt={data.postTitle} />
      <h4>{data.postTitle}</h4>
    </div>
  );
}
