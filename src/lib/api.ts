export async function apiGet(path: string) {
  const response = await fetch(path);
  return response.json();
}

export async function apiPost(path: string, body: any) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return response.json();
}