"use client";
import { useState } from "react";
import styles from "./Chat.module.sass";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
}

export const Chat = (props: { agent: string }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: crypto.randomUUID(), role: "system", content: props.agent },
  ]);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessages: Message[] = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: input },
    ];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setMessages([
      ...newMessages,
      { id: crypto.randomUUID(), role: "assistant", content: data.answer },
    ]);
    setInput("");
  };

  return (
    <main className={styles.Chat}>
      <h1 className={styles.Chat__title}>Ask anything, buy everything</h1>
      <form onSubmit={handleSubmit} className={styles.Chat__form}>
        <input
          className={styles.Chat__input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to buy?"
        />
        <button className={styles.Chat__button}>Send</button>
      </form>
      <section className={styles.Chat__messages}>
        {messages
          .filter((m) => m.role !== "system")
          .map((m) => (
            <span key={m.id} className={styles.Chat__message}>
              <div className={styles.Chat__message__icon}>
                {m.role === "assistant" ? "🤖" : "😊"}
              </div>
              <div>{m.content}</div>
            </span>
          ))}
      </section>
    </main>
  );
};
