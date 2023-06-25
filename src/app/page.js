'use client'
import Link from 'next/link';
import Prompt_Results from './components/Pandas_AI';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [displayPrompt, setDisplayPrompt] = useState('')
  const [tableName, setTableName ] = useState('Projects')
  const [sendRequest, setSendRequest ] = useState(false)
  const [data, setData ] = useState('')
  const [submit, setSubmit ] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false); 

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const submitRequest = () => {
    setSendRequest(true);
    setSubmit(true)
    fetchProjectData()
    setDisplayPrompt(prompt)
    setPrompt('')

  };

  const fetchProjectData = async () => {
    console.log(prompt)
    if (prompt && tableName) {
      try {
        setLoading(true); // Set loading state to true before fetching data
        setLoadingIcon(true); 
        const response = await axios.post('http://localhost:5000/', {
          table_name: tableName,
          prompt: ` ${prompt} `
        });

        console.log(typeof response.data);
        console.log(response);
        setData(response.data);
        setLoading(false); // Set loading state to false after data fetching
        setLoadingIcon(false); // 

      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Set loading state to false in case of error
        setLoadingIcon(false); //
      }
    }
  };

return (
  <div className="bg-neutral-800 min-h-screen">

    {submit === false ? (
      <div>
          <header className="fixed top-0 w-full pl-8 pr-8 flex justify-between">
          <div>
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
            >
              <Image
                src="/undp_logo_white.png"
                alt="UNDP Logo"
                // className="dark:invert"
                width={160}
                height={50}
                priority
              />
            </a>
            
          </div>
        </header>

      <div className="flex flex-col items-center justify-center bg-neutral-800 h-screen text-white">
        <main className="flex min-h-screen flex-col items-center justify-between pb-24">
          <div className="mb-12">
            <div className="text-white text-center text-3xl pb-4 pt-32">Welcome to the</div>
            <div className="text-white text-6xl border-l-green-700 border-l-4 mt-2 mb-18 pt-2 pb-2 pr-3 pl-3 bg-gradient-to-r from-green-900 backdrop-blur-2xl">Energy Moonshot AI</div>
            <div className="text-gray-300 text-center text-md pt-4">Accelerating the sustainable and just energy transition</div>
          </div>
          <div className="w-full flex items-center justify-center relative mb-4">
            <input
              value={prompt} 
              onChange={handlePromptChange} 
              className="bg-transparent p-8 justify-center w-full px-4 py-2 border border-gray-500 text-lg rounded-md focus:outline-none focus:border-white resize-none"
              rows={2}
              style={{ paddingTop: '14px', paddingBottom: '14px' }}
              placeholder="Example: How many beneficiaries are there per region for UNDP energy projects active in 2022?"
            />
            <button onClick={submitRequest} className="absolute bottom-1 right-2 mb-2 bg-green-800 hover:bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-lg">
              <span>&#10148;</span>
            </button>
          </div>
          <div className="mt-28 mb-24 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <h2 className="mb-3 text-2xl font-semibold text-center">
                Data Insights
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50 text-center">
                Add data science questions about the UNDP Energy portfolio or country-level statistics and generate analysis, tables, and graphs
              </p>
            </div>
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30">
              <h2 className="mb-3 text-2xl font-semibold text-center">
                Personalized answers
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50 text-center">
                Answers are based on your unique questions, and our vast database of information.
              </p>
            </div>
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <h2 className="mb-3 text-2xl font-semibold text-center">
                Generative Text
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50 text-center">
                Get custom text generated for energy policies, NOCs, targets, or other documents on renewable energy and the just energy transition.
              </p>
            </div>
          </div>
        </main>
      </div>
      </div>
    ) : (
      <div className="flex flex-col items-center text-black justify-center bg-neutral-800">
  {/* Header */}


  {/* Content */}
  <div className="flex flex-col min-h-screen w-full pl-12 pr-12 mt-16 justify-center items-center">
    <div className="w-full relative">
    <div className="flex-grow p-4 pl-8 text-gray-400 overflow-y-scroll bg-gray-700 w-full">
      <p>Prompt: {displayPrompt}</p>
    </div>
      <div className="flex pb-6 pt-4 pl-8 overflow-y-scroll bg-gray-500 w-full text-gray-300">
        <Prompt_Results sendRequest={sendRequest} prompt={prompt} tableName={tableName} data={data} loadingIcon={loadingIcon}/>
      </div>

      {/* Input and button */}
      <div className="w-full relative bg-gray-700 pt-6 pb-6 pl-8 pr-8">
        <input
          type="text"
          style={{ paddingTop: '14px', paddingBottom: '14px' }}
          className="relative bg-gray-800 border border-gray-700 rounded-md py-2 px-4 w-full text-white"
          placeholder="Enter prompt here..."
          value={prompt} 
          onChange={handlePromptChange} 
        />
        <button
          onClick={submitRequest}
          className="absolute bg-green-800 right-0 hover:bg-green-600 text-white text-sm font-semibold px-3 py-2 mr-10 mt-2 rounded-lg pt-2"
        >
          <span>&#10148;</span>
        </button>
      </div>
    </div>
  </div>
  <div className="fixed top-0 w-full bg-neutral-800 p-4 flex justify-between ">
  <header className="w-full pl-8 pr-8 flex  ">
    <a
      href="/"
    >
      <Image
        src="/undp_logo_white.png"
        alt="UNDP Logo"
        // className="dark:invert"
        width={130}
        height={24}
        priority
      />
    </a>
    <div className="text-white text-3xl mt-2 mb-18 pt-10 pb-2 pr-3 pl-20">Energy Moonshot AI</div>
    <div className="fixed top-0 right-0 text-white text-md mt-2 mb-18 pt-16 pb-2 pr-14 pl-3">Prompt Ideas</div>
</header>
  </div>
</div>

    )}
  </div>
)}
