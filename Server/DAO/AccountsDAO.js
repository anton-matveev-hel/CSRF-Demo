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
    if(accounts[email])
    {
      return accounts[email].balance;
    }
  }

  setBalance(email, balance)
  {
    if(accounts[email])
    {
      accounts[email].balance = balance;
    }
  }

}