import axios from 'axios'

async function getAuthorHistory(author: string): Promise<string[]> {
  const history: string[] = [];

  try {
    const [profile, articles] = await Promise.allSettled([
      axios.get(`https://jsonmock.hackerrank.com/api/article_users?username=${author}`),
      axios.get(`https://jsonmock.hackerrank.com/api/articles?author=${author}`)
    ]);

    if (profile.status === "fulfilled") {
      const result = await profile.value.json();
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }

  return history
}

getAuthorHistory("saintamh");
