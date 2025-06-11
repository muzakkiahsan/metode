export async function calculateIntegral(data) {
  const response = await fetch('http://localhost:8000/api/integral/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error menghitung integral');
  }
  return response.json();
}
