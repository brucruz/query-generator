import { GoPaste } from "react-icons/go";
import { Message } from "ai/react";

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps): JSX.Element {
  return (
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
      <div className="w-3/4 relative">
        <p className="text-slate-100 whitespace-break-spaces">
          {message.content}
        </p>

        {message.role === "assistant" && (
          <div className="absolute top-0 right-0">
            <button
              className="p-1 text-slate-100 opacity-20 hover:opacity-100"
              onClick={() => navigator.clipboard.writeText(message.content)}
            >
              <GoPaste />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
