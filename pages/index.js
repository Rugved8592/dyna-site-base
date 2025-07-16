export default function Home() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) greeting = "Good Morning 🌅";
  else if (hour < 18) greeting = "Good Afternoon ☀️";
  else greeting = "Good Evening 🌙";

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>{greeting}, Welcome to Dyna-site 👋</h1>
      <p>This message changes based on your local time.</p>
    </div>
  );
}
