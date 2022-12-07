const users = { // Mock in-memory database
  "alice@email.com": {
    name: "Alice",
    email: "alice@email.com",
    passwordHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "bob@email.com": {
    name: "Bob",
    email: "bob@email.com",
    passwordHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "eve@email.com": {
    name: "Eve",
    email: "eve@email.com",
    passwordHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
};

module.exports = class UsersDAO
{

  getUser(email)
  {
    if(users[email])
    {
      return {...users[email]};
    }
  }

  getUsers()
  {
    return Object.values(users);
  }

  setName(email, name)
  {
    if(users[email])
    {
      users[email].name = name;
    }
  }

}