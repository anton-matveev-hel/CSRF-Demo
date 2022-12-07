function init() {
  fetch("/account").then( response =>
  {
    if(response.status === 200)
    {
      response.json().then(result => document.getElementById("balanceValue").innerText = result.balance);
    }
    else
    {
      handleError(response);
    }
  });

  fetch( "/users").then(response =>
  {
    if(response.status === 200)
    {
      response.json().then(result => setRecipients(result.users));
    }
    else
    {
      handleError(response);
    }
  });
}

function setRecipients(users)
{
  let content = "";
  users.forEach(user =>
  {
    content += `<input type="radio" id="${user.email}_radio" name="recipient" value="${user.email}">` +
               `<label for="${user.email}_radio">${user.name}</label><br>`
  });
  document.getElementById("recipients").innerHTML = content;
}

function handleError(response) {
  if(response.status === 401)
  {
    window.location.href = "/login";
  }
}