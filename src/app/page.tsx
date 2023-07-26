"use client"; // This is a client component 👈🏽

import Button from "@/components/Button";
import SchemaSidebar from "@/components/SchemaSidebar";
import TextArea from "@/components/TextArea";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex h-screen w-full bg-gray-900">
      <SchemaSidebar />

      <div className="flex-1 flex flex-col items-center w-full px-12 pt-24 py-16 h-screen space-between">
        <div className="max-w-2xl w-full">
          <h1 className="text-center text-2xl font-bold text-slate-100 pb-8">
            Generate SQL queries with AI
          </h1>

          <h3 className="text-left text-md font-semibold text-slate-100">
            What do you want to query?
          </h3>

          <p className="pt-4 text-sm">
            Describe to the AI assistant what you want to achieve with your
            database and it will return the SQL
          </p>
        </div>

        <div className="py-8 text-left max-w-2xl w-full h-full">
          {messages.map((message) => (
            <div className="flex gap-4 py-4" key={message.id}>
              <div className="w-1/4 font-semibold">
                <p className="text-slate-100">
                  {message.role === "user" ? "You:" : "AI:"}
                </p>
              </div>
              <div className="w-3/4">
                <p className="text-slate-100 whitespace-break-spaces">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form className="max-w-2xl w-full" onSubmit={handleSubmit}>
          <TextArea
            id="user-input"
            value={input}
            placeholder="What do you want to query?"
            onChange={handleInputChange}
          />
          <Button type="submit" text="Generate names" />
        </form>
      </div>
    </main>
    // </div>
  );
}
