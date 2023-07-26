"use client"; // This is a client component 👈🏽
import { useChat } from "ai/react";
import TextArea from "./TextArea";
import Button from "./Button";
import { FormEvent, useEffect, useState } from "react";
import { useSchema } from "@/hooks/useSchema";
import { ChatRequestOptions } from "ai";

export function Chat(): JSX.Element {
  const { schema } = useSchema();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    error,
  } = useChat({
    body: { schema } || undefined,
  });

  const [schemaError, setSchemaError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (error) {
      setMessages([]);
      setSchemaError('Please enter a schema in the "Schema" tab.');
    }
  }, [error, setMessages]);

  function handleClickGenerate(
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ): void {
    e.preventDefault();

    if (!schema) {
      setSchemaError("Please enter a schema in the Schema tab.");
      return;
    }
    setSchemaError(undefined);
    handleSubmit(e, chatRequestOptions);
  }

  return (
    <>
      <div className="py-8 text-left max-w-2xl w-full h-full overflow-y-auto">
        {messages.map((message) => (
          <div
            className={`flex gap-4 p-4 text-sm leading-7 ${
              message.role === "user" ? "bg-gray-800" : "bg-gray-700"
            }`}
            key={message.id}
          >
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

      <form className="max-w-2xl w-full" onSubmit={handleClickGenerate}>
        <TextArea
          id="user-input"
          value={input}
          placeholder="What do you want to query?"
          onChange={handleInputChange}
          error={schemaError}
        />
        <Button type="submit" text="Generate query" />

        <span
          className="block text-sm underline underline-offset-4 w-fit mx-auto text-center pt-4 cursor-pointer"
          onClick={() => setMessages([])}
        >
          Clear chat
        </span>
      </form>
    </>
  );
}

export default Chat;
