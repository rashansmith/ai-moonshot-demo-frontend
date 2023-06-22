import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white p-4 shadow flex justify-between">
        <div>
        <Link href="/">
          <h1 className="text-lg font-sans">Platform Demo (Pandas AI)</h1>
        </Link>
        </div>
        <div>
        <Link href="/excel">
          <h3 className="text-lg font-sans">Excel Data</h3>
        </Link>
        </div>
      </header>

      {/* Content */}
      <main className=" flex flex-col items-center  mt-24 w-1/2">
        {/* Container for two halves */}
        <div className="flex w-full">
          {/* Left half */}
          {/* <div className="w-1/2 bg-gray-200 p-8 overflow-y-auto max-h-screen"> */}
            {/* Content for left half */}
            {/* <div className="h-full">
              <p className="text-center py-8">Excel tables</p>
              <div className="min-w-full">
                <ExcelUploader />
              </div>
            </div> */}
          {/* </div> */}

          {/* Right half */}
          <div className="w-full min-h-screen p-8">
            {/* Content for right half */}
            <div className="flex flex-col items-center justify-start max-h-screen">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4">
                <option value="option0" disabled selected>
                  Select an Excel Data Table
                </option>
                <option value="option1">Summary</option>
                <option value="option2">Countries</option>
                <option value="option3">Outputs</option>
                <option value="option3">Projects</option>
              </select>
              <div className="w-full flex items-center justify-center relative mb-4">
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Enter prompt here.."
                />
                <button className="absolute bottom-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
              {/* Results */}
              <div className="w-full max-h-screen bg-gray-200">
                <div className="p-8">
                  <p>Results go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
