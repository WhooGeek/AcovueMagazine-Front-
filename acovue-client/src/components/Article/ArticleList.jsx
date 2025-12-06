import ArticleCard from "./ArticleCard.jsx";

export default function ArticleList({ title, items }) {
  return (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex", gap: "16px" }}>
        {items.map((item) => (
          <ArticleCard key={item.postSeq} data={item} />
        ))}
      </div>
    </div>
  );
}
