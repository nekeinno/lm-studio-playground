export async function sendPrompt(prompt: string, model: string) {
  const url = "http://localhost:3000/api";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: prompt,
      model: model
    }),
  };
  const response = await (await fetch(url, options)).json()
  return response.response || response.error;
}

export async function getAvailableModels() {
  const url = "http://localhost:3000/models";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    }
  };
  const response = await (await fetch(url, options)).json()
  return response.models || [];
};
