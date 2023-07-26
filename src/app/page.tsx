import Chat from "@/components/Chat";
import SchemaSidebar from "@/components/SchemaSidebar";

export default function Home() {
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

        <Chat />
      </div>
    </main>
  );
}
