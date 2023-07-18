let users = {};

export const registerUser = (login, mail, password) => {
  if (users[login] || Object.values(users).some((user) => user.mail === mail)) {
    return false;
  }

  users[login] = { login, mail, password };
  return true;
};

export const loginUser = (mail, password) => {
  const user = Object.values(users).find(
    (user) => user.mail === mail && user.password === password
  );
  return user;
};
