const API_URL = "http://127.0.0.1:5000";

export async function getRecommendation(answers) {
  const response = await fetch(`${API_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answers,
    }),
  });

  return response.json();
}
