import axios from "axios";

interface QuoteResponse {
  id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: Array<String>;
}

interface helperResponse {
  content?: string;
  author?: string;
  err?: string | null | undefined;
  success: boolean;
}

export const getRandomQuote = async (): Promise<helperResponse> => {
  let send: helperResponse = { success: false };
  await axios
    .get<QuoteResponse>("https://api.quotable.io/random")
    .then((res) => {
      send = {
        success: true,
        content: res.data.content,
        author: res.data.author,
        err: null,
      };
    })
    .catch((err) => {
      send = { success: false, err: JSON.stringify(err) };
    });
  return send;
};
