export default async function Home() {
  const response = await fetch(`${process.env.API_BASE_URL}/hello/index`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("エラー");
  }

  return (
    <div>
      <h1>Hello, Next.js</h1>
    </div>
  );
}
