'use client'
import Link from 'next/link';
import Prompt_Results from './components/Pandas_AI';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [tableName, setTableName ] = useState('Projects')
  const [sendRequest, setSendRequest ] = useState(false)
  const [data, setData ] = useState('')

  const handlePromptChange = (event) => {
    // console.log(prompt)
    setPrompt(event.target.value);
  };


  const submitRequest = () => {
    setSendRequest(true);
    fetchProjectData()
  };

  const fetchProjectData = async () => {
    console.log(prompt)
    if (prompt && tableName) {
      try {
        const response = await axios.post('http://localhost:5000/', {
          table_name: tableName,
          prompt: ` ${prompt} `
        });

        console.log(typeof response.data);
        console.log(response);
        setData(response.data);

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


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
              {/* <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4">
                <option value="option3">Projects</option>
                <option value="option3">Outputs</option>
              </select> */}
              <div className="w-full flex items-center justify-center relative mb-4">
                <textarea
                  value={prompt} 
                  onChange={handlePromptChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Enter prompt here.."
                />
                <button onClick={submitRequest} className="absolute bottom-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
              {/* Results */}
              <div className="w-full max-h-screen bg-gray-200">
                <div className="p-8">
                  <Prompt_Results sendRequest={sendRequest} prompt={prompt} tableName={tableName} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
