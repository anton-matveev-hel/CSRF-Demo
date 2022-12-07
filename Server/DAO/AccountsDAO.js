const accounts = { // Mock in-memory database
  "alice@email.com": {
    balance: 2000
  },
  "bob@email.com": {
    balance: 1000
  },
  "eve@email.com": {
    balance: 0
  }
};

module.exports = class UsersDAO
{

  getBalance(email)
  {
    return accounts[email]?.balance;
  }

  setBalance(email, balance)
  {
    accounts[email]?.balance = balance;
  }

}