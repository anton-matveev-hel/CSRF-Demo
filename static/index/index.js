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
}

function handleError(response) {
  if(response.status === 401)
  {
    window.location.href = "/login";
  }
}

// function readResponseBody(response)
// {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     response.body.on("data", chunk => console.log(chunk));
//     response.body.on("end", () => resolve(Buffer.concat(chunks)));
//     response.body.on("error", reject);
//   });
// }