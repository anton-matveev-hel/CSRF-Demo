function init() {
  fetch( "/auth" ).then( response =>
  {
    if(response.status === 200)
    {
      response.json().then(result => window.$user_email = result.email);
    }
    else
    {
      handleError(response);
    }
  }).then(() =>
  {
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

    fetch("/users").then(response =>
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
  });
}

function sendMoney()
{
  const recipient = document.querySelector('input[name="recipient"]:checked').value;
  const amount = document.getElementById("amount").value;
  fetch(`/transfers?recipient=${recipient}&amount=${amount}`).then(response =>
  {
    if(response.status === 200)
    {
      window.location.href = "/";
    }
    else
    {
      handleError(response);
    }
  } );
}

function setRecipients(users)
{
  let content = "";
  users.forEach(user =>
  {
    if( user.email === window.$user_email )
    {
      return;
    }
    content += `<input type="radio" id="${user.email}_radio" name="recipient" value="${user.email}">` +
               `<label for="${user.email}_radio">${user.name}</label><br>`;
  });
  document.getElementById("recipients").innerHTML = content;
}

function handleError(response) {
  if(response.status === 401)
  {
    window.location.href = "/login";
  }
}