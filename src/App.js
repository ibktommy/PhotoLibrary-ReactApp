import React, { useState, useEffect, useRef } from 'react'
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
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Setting useRef
  const rendered = useRef(false)

  // Setting Up FUnction to Fetch Photos Data
  const fetchPhotos = async () => {
    setIsLoading(true)
    let url;
    const perPage = `&page=${pageNumber}`
    const searchQuery = `&query=${searchTerm}`

    if (searchTerm) {
      url = `${searchUrl}${clientID}${perPage}${searchQuery}`
    } else {
      url = `${mainUrl}${clientID}${perPage}`
    }


    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setPhotos((prevPhotos) => {
        if (searchTerm && pageNumber === 1) {
          return data.results
        }
        else if (searchTerm) {
          return data.results
        } else {
          return [...prevPhotos, ...data]
        }
      })
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  // Setting Up useEffect Hook to Call The FetchPhotos function
  useEffect(() => {
    fetchPhotos()
  }, [pageNumber])

  // Setting up useEffect-Hook that will run on renders after the first-render of the App
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true
      return
    }
    console.log('other renders')
  }, [])

  // Function To Handle Form Submission
  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (!searchTerm) return
    if (pageNumber === 1) {
      fetchPhotos()
    }
    setPageNumber(1)
  }

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder='search' className='form-input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type='submit' className='submit-btn' onClick={formSubmitHandler}>
            <FaSearch />
          </button>
        </form>
      </section>

      <section className='photos'>
        <div className="photos-center">
          {photos.map((imageProps, index) => {
            return <Photo key={index} {...imageProps} />
          })}
        </div>

        {isLoading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  )
}

export default App
