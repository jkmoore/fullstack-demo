import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Failed to fetch");
      });
  }, []);

  return <div>{message}</div>;
}
