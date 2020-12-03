import auth from "solid-auth-client";

async function login() {
  let session = await auth.currentSession();
  //https://solidcommunity.net/common/popup.html
  let popupUri = "https://solidcommunity.net/common/popup.html"; //"https://solid.community/common/popup.html";
  if (!session) session = await auth.popupLogin({ popupUri });
  console.log(`Logged in as ${session.webId}`);
}

async function getWebid() {
  const session = await auth.currentSession();
  return session.webId;
}

function logout() {
  auth.logout().then(() => alert("Goodbye!"));
}

export { login, getWebid, logout };
