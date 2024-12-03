import fs from "fs";
import path from "path";
import got from "got";

const dataDir = path.join(process.cwd(), "data");

const parseDataFromJson = filePath => {
  const jsonStr = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonStr);
};

const urlPath =
  "https://dev-cs-test-50-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

async function fetchDataFromApi(url) {
  try {
    const response = await got(url, { responseType: "json" });
    const arr = url.split("/");
    if (arr[arr.length - 1] === "client") {
      return response.body;
    }
    return formatBlogData(response.body);
  } catch (error) {
    console.error("Error in GET request:", error.message);
    return [];
  }
}

function formatBlogData(data) {
  return data.map(item => ({
    id: item.ID,
    author: item.post_author,
    content: item.post_content,
    date: item.post_date,
    title: item.post_title,
    tags: [],
  }));
}
export async function getAllArticles() {
  return await fetchDataFromApi(urlPath);
}
export async function getBillInfo(url) {
  return await fetchDataFromApi(url);
}

export async function getAllBlogIds() {
  const data = await fetchDataFromApi(urlPath);
  return data.map(({ id }) => ({ params: { id: id.toString() } }));
}

export async function getArticle(id) {
  const filePeoplePath = path.join(dataDir, "people.json");
  const dataPeople = parseDataFromJson(filePeoplePath);
  const formattedDataBlog = await fetchDataFromApi(urlPath);

  const article = formattedDataBlog.filter(blog => blog.id.toString() === id);

  const authorName = dataPeople.filter(
    person => person.id === article[0].author.toString()
  );

  if (article.length) {
    return { ...article[0], author: authorName[0].name };
  } else {
    return {};
  }
}
