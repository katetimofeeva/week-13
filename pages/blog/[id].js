import Layout from "@/components/layout";
import { getAllBlogIds, getArticle } from "@/lib/getBlogData";

export async function getStaticPaths() {
  const paths = await getAllBlogIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = await getArticle(params.id);
  return {
    props: {
      article,
    },
  };
}

const Article = ({ article }) => {
  return (
    <Layout
      isHomePage={false}
      to="/blog"
    >
      <article className="mt-4 mx-auto rounded w-75 p-3">
        <h1 className="fw-bold"> {article.title}</h1>
        <p className="fw-bold mb-4">{article.author}</p>
        <p>{article.content}</p>
        <span>{article.date}</span>
      </article>
    </Layout>
  );
};

export default Article;
