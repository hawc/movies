export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (response?.ok) {
      return await response.json();
    } else {
      console.error(`HTTP Response Code: ${response?.status}`);
      return null;
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
    return null;
  }
}
