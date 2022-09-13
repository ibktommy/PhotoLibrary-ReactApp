import React, { useState, useEffect } from 'react'
import Photo from './component/Photo'
import { FaSearch } from 'react-icons/fa'

const clientID = `?client_id=${process.env.REACT_APP_API_ACCESS_KEY}`
// APP API URL
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  // App State 
  const [isLoading, setIsLoading] = useState(false)

  const [photos, setPhotos] = useState([])

  // Setting Up FUnction to Fetch Photos Data
  const fetchPhotos = async () => {
    setIsLoading(true)
    let url;
    url = `${mainUrl}${clientID}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  // Setting Up useEffect Hook to Call The FetchPhotos function
  useEffect(() => {
    fetchPhotos()
  }, [])
  return <h2>stock photos starter</h2>
}

export default App
