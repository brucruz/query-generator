"use client"; // This is a client component 👈🏽

import { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import { useSchema } from "@/hooks/useSchema";

const example = `CREATE TABLE Orders (
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

export function SchemaSidebar(): JSX.Element {
  const [value, setValue] = useState("");
  const { schema, saveSchema } = useSchema();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveSchema(value);
  };

  return (
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

      <form className="max-w-md" onSubmit={handleSubmit}>
        <h3 className="text-left text-md font-semibold text-slate-100 pt-4">
          Database Schema:
        </h3>

        <TextArea
          id="user-input"
          value={value}
          rows={12}
          placeholder="What is your database schema?"
          onChange={(e) => setValue(e.target.value)}
          resizable
        />
        <Button type="submit" text="Save schema" />

        <span
          className="block text-sm underline underline-offset-4 w-fit mx-auto text-center py-4 cursor-pointer"
          onClick={() => setValue(example)}
        >
          Show Example
        </span>
      </form>

      <div className="pt-8">
        <h3 className="text-left text-md font-semibold text-slate-100">
          Current schema:
        </h3>

        <div className="py-4 whitespace-break-spaces">
          <p className="text-slate-100 text-sm">
            {schema ? schema : "No schema saved yet"}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default SchemaSidebar;
