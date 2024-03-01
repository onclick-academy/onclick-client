import { fetcher } from "./fetcher";

const getData = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/userinfo",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "localhost:3000",
      },
      credentials: "include"
    }
  ).then((res) => res.json());
  const userInfo = await res;

  console.log(userInfo);
  if (!userInfo.data.id) throw Error("Error: User not found.");
  const currentUser = await fetcher({
    url: `/users/${userInfo.data.id}`
  });
  return currentUser;
};

export default getData;
