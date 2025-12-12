import { useEffect, useState } from "react";
import MiniList from "../../components/MiniList/MiniList.jsx"
export default function Community() {

  const [community, setCommunity] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/post/find/all?type=COMMUNITY&limit=5")
    .then ((res) => res.json())
    .then ((data) => setCommunity(data.data));
  },[])

  return (
    <MiniList title="COMMUNITY" items={community} />
  );
}
