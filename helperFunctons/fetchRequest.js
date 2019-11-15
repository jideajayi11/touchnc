export default async request => {
  try {
    const response = await fetch(request.url, {
      method: request.method,
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });
    return await response.json();
  } catch (err) {
    return {status: 'error'};
  }
};
