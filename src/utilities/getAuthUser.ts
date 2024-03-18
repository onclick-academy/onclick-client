const getAuthUser = async () => {
  const url = `http://localhost:3000/api/v1/users/user`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const user = await res.json();

    return user;
  } catch (err) {
    console.error('ERRO: ' + err);
  }
};

export default getAuthUser;
