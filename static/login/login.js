function login()
{
  const body = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value};
  fetch("/auth", {
    method: "POST",
    body: JSON.stringify(body),
    redirect: "manual"
  }).then(response =>
  {
    if(response.status === 200)
    {
      window.location.href = "/";
    }
    else if(response.status === 401)
    {
      document.getElementById("message").innerText = "Incorrect email or password.";
    }
  });
}