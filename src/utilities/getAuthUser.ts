const getAuthUser = async () => {
  const url = `http://localhost:3000/api/v1/users/userinfo`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const userInfo = await res.json();

    return userInfo;
  } catch (err) {
    console.error('ERRO: ' + err);
  }
};

export default getAuthUser;
