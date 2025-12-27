import { useEffect, useState } from "react";
import { getAboutMeContent } from "../../api/AboutMe.api";
import AboutMeDetail from "../../components/AboutMe/AboutMeDetail";
import AboutMeFooter from "../../components/AboutMe/AboutMeFooter";

export default function About() {

  const [post, setPost] = useState(null);

  

  useEffect(() => {
    getAboutMeContent()
    .then((res) => {
      setPost(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
  },[]);

  if(!post) return <div> loading...</div>;

  return (
    <div>
      <AboutMeDetail post={post}/>
      <AboutMeFooter />
    </div>
  );
}
