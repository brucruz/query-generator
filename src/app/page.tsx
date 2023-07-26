"use client"; // This is a client component 👈🏽

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const example = `
  CREATE TABLE Orders (
    OrderID int,
    CustomerID int,
    OrderDate datetime,
    OrderTime varchar(8),
    PRIMARY KEY (OrderID)
  );

  CREATE TABLE OrderDetails (
    OrderDetailID int,
    OrderID int,
    ProductID int,
    Quantity int,
    PRIMARY KEY (OrderDetailID)
  );

  CREATE TABLE Products (
    ProductID int,
    ProductName varchar(50),
    Category varchar(50),
    UnitPrice decimal(10, 2),
    Stock int,
    PRIMARY KEY (ProductID)
  );

  CREATE TABLE Customers (
    CustomerID int,
    FirstName varchar(50),
    LastName varchar(50),
    Email varchar(100),
    Phone varchar(20),
    PRIMARY KEY (CustomerID)
  );`;

  return (
    <main className="flex h-screen w-full bg-gray-900">
      <aside className="flex-none border-solid border-r px-12 py-24 h-full bg-gray-800 border-gray-700 max-w-lg overflow-y-auto">
        <h2 className="text-left text-lg font-semibold text-slate-100">
          How it works?
        </h2>

        <ol className="py-8">
          <li className="list-decimal list-inside pb-2 text-sm">
            Enter your schema and save it
          </li>
          <li className="list-decimal list-inside pb-2 text-sm">
            Describe what you want to query to the AI assistant and it will
            generate it for you
          </li>
          <li className="list-decimal list-inside text-sm">
            Copy the query and use it in your project
          </li>
        </ol>

        <form className="max-w-md" onSubmit={() => {}}>
          <h3 className="text-left text-md font-semibold text-slate-100 pt-4">
            Database Schema:
          </h3>

          <TextArea
            id="user-input"
            value=""
            rows={12}
            placeholder="What is your database schema?"
            onChange={() => {}}
          />
          <Button type="submit" text="Save schema" />

          <span className="block text-sm underline underline-offset-4 w-fit mx-auto text-center py-4 cursor-pointer">
            Show Example
          </span>
        </form>

        <div className="pt-8">
          <h3 className="text-left text-md font-semibold text-slate-100">
            Current schema:
          </h3>

          <div className="py-4 whitespace-break-spaces">
            <p className="text-slate-100 text-sm">{example}</p>
          </div>
        </div>
      </aside>

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
