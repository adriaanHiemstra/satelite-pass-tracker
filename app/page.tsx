import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Connection Test</h1>

      <div className="p-6 bg-zinc-800 rounded-lg max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">
          Status: Supabase is Connected!
        </h2>

        <p className="mb-2 text-zinc-400">Current User Data:</p>
        <pre className="bg-black p-4 rounded text-sm overflow-auto text-zinc-300">
          {JSON.stringify(data, null, 2)}
        </pre>

        {error && (
          <>
            <p className="mt-4 mb-2 text-red-400">Connection Error:</p>
            <pre className="bg-red-950 p-4 rounded text-sm overflow-auto text-red-200">
              {JSON.stringify(error, null, 2)}
            </pre>
          </>
        )}
      </div>
    </main>
  );
}
