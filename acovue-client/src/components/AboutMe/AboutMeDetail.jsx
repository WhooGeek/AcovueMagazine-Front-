import "./AboutMeDetail.css";


export default function AboutMeDetail({post}){
    return(
        <article>
            <section className="aboutmeContainer">
                
                <p className="aboutmeContent">
                    {post.about_me_content}
                </p>
            </section>
        </article>
    )
}