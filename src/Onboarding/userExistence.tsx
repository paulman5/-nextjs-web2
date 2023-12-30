// Example function to check user existence
export async function checkUserExists(email: string) {
  const response = await fetch(`/api/users/me`);
  if (response.ok) {
    const data = await response.json();
    return data.exists;
  }
  throw new Error("Error checking user existence");
}
