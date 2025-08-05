export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tailwind Test</h1>
        <p className="text-gray-600">
          If you can see this styled text, Tailwind is working!
        </p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Test Button
        </button>
      </div>
    </div>
  );
}
