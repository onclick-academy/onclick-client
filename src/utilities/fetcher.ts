import { cookies } from "next/headers";

type FetcherT = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export const fetcher = async ({ url, method = "GET", body = {} }: FetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const res = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
  
    },

    body: method === "GET" ? undefined : JSON.stringify(body)
  });
  console.log("res", res);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return await res.json();
};
