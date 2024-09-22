
import { useState } from 'react'
import Axios from 'axios'
import './App.css'



function App() {
 

    const [ Code, SetCode] = useState("")
    const [Output, SetOutput] = useState("")

    const HandleChange = (e) => {
      SetCode(e.target.value)
    }

    const runCode = async () => {
      
      const code= Code.toString()
      Axios.post('http://localhost:8000', {
        code : code
      }).then(response => {
        let output = response.data.output
        SetOutput(output)
      })
    }

    const HandleKeyDown = (e) => {
      if (e.key === 'Tab') {
        //give tab space when key is Tab
        e.target.value += "  ";
        e.preventDefault();
      }
    }

  return (
    <>
    {/* code input */}
       <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Code Editor</h1>
      <textarea
        onChange={HandleChange}
        onKeyDown={HandleKeyDown}
        className="w-full h-64 p-4 text-sm font-mono bg-gray-800 text-white rounded-lg shadow-md border-2 border-gray-700 focus:outline-none focus:border-blue-500"
        placeholder="Write your code here..."
      />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">
        Run Code
      </button>
    </div>


    {/* code output */}

    <div className="flex flex-col items-center p-4 mt-6">
    <h1 className="text-xl font-bold mb-4">Output</h1>
    <div className="w-full h-48 p-4 bg-gray-900 text-white font-mono text-sm rounded-lg shadow-md border-2 border-gray-700 overflow-auto">
     { Output}
    </div>
  </div>
    </>
  )
}

export default App
