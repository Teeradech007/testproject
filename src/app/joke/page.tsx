'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Joke {
  setup: string
  punchline: string
  type: string
  id: number
}

export default function JokePage() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }
      const jokeData: Joke = await response.json()
      setJoke(jokeData)
    } catch {
      // Fallback to a demo joke when API is not accessible
      console.log('API not accessible, using demo joke')
      const demoJokes: Joke[] = [
        {
          setup: "Why don't scientists trust atoms?",
          punchline: "Because they make up everything!",
          type: "science",
          id: 1
        },
        {
          setup: "What do you call a fake noodle?",
          punchline: "An impasta!",
          type: "food",
          id: 2
        },
        {
          setup: "Why did the scarecrow win an award?",
          punchline: "He was outstanding in his field!",
          type: "general",
          id: 3
        },
        {
          setup: "What do you call a bear with no teeth?",
          punchline: "A gummy bear!",
          type: "animal",
          id: 4
        }
      ]
      
      // Select a random demo joke
      const randomJoke = demoJokes[Math.floor(Math.random() * demoJokes.length)]
      setJoke(randomJoke)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            🎭 Random Joke Generator
          </h1>
          
          {loading && (
            <div className="py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading...</p>
            </div>
          )}
          
          {error && (
            <div className="py-8">
              <p className="text-red-600 text-lg mb-4">{error}</p>
            </div>
          )}
          
          {joke && !loading && (
            <div className="py-8">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                  {joke.setup}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xl text-indigo-600 font-semibold">
                    {joke.punchline}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-6">
                Category: {joke.type}
              </div>
            </div>
          )}
          
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
          >
            {loading ? 'Loading...' : 'Get a New Joke'}
          </button>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-indigo-600 hover:text-indigo-800 underline text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}