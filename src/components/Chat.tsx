import { useChat } from "ai/react";
import TextArea from "./TextArea";
import Button from "./Button";
import { useEffect, useState } from "react";

export function Chat(): JSX.Element {
  const storedSchema = localStorage.getItem("schema");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    error,
  } = useChat({
    body: { schema: storedSchema } || undefined,
  });

  const [schemaError, setSchemaError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setMessages([]);
      setSchemaError('Please enter a schema in the "Schema" tab.');
    }
  }, [error, setMessages]);

  useEffect(() => {
    if (!storedSchema) {
      setSchemaError('Please enter a schema in the "Schema" tab.');
    }
  }, [storedSchema]);

  return (
    <>
      {schemaError && (
        <div className="bg-red-500 text-white text-center py-2">
          {schemaError}
        </div>
      )}
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

      <form className="max-w-2xl w-full" onSubmit={handleSubmit}>
        <TextArea
          id="user-input"
          value={input}
          placeholder="What do you want to query?"
          onChange={handleInputChange}
        />
        <Button type="submit" text="Generate names" />

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
