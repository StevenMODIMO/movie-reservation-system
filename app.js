async function post() {
  try {
    const formData = new FormData();

    formData.append("start_time", "2026-06-22T10:00:00Z");
    formData.append("end_time", "2026-06-23T12:00:00Z");
    formData.append("created_at", new Date().toISOString());

    const response = await fetch(
      "http://127.0.0.1:8000/api/mrs/create-movie-showtime",
      {
        method: "POST",
        body: formData,
      },
    );

    const json = await response.json();
    return json
  } catch (error) {
    return error;
  }
}

async function main() {
  const data = await post();
  console.log(data);
}

main();

console.log(new Date());
