import Layout from "@/components/layout";
import { getAllIds, getPerson } from "@/lib/data";

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const itemData = await getPerson(params.id);
  return {
    props: {
      person: itemData,
    },
  };
}

const PersonCard = ({ person }) => {
  return (
    <Layout isHomePage={false}>
      <article className="card col-10 col-md-6 mx-auto my-4">
        <div className="card-body">
          <h4 className="card-title fw-bold mb-2">{person.name}</h4>
          <p className="card-text">{person.phone}</p>
          <p className="card-text">{person.email}</p>
        </div>
      </article>
    </Layout>
  );
};

export default PersonCard;
