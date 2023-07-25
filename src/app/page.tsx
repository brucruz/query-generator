"use client"; // This is a client component 👈🏽

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3 className="text-2xl font-bold text-slate-100 mb-4">
        Generate SQL queries with AI
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="animal"
          placeholder="Enter an animal"
          value={input}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-96 text-slate-900"
        />
        <input
          type="submit"
          value="Generate names"
          className="ml-4 bg-slate-100 border border-gray-300 rounded-md p-2 text-slate-900"
        />
      </form>
      <div className="text-left">
        {messages.map((message) => (
          <div className="flex gap-4 py-4" key={message.id}>
            <div className="w-1/4">
              <p className="text-slate-100">
                {message.role === "user" ? "You:" : "AI:"}
              </p>
            </div>
            <div className="w-3/4">
              <p className="text-slate-100">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
