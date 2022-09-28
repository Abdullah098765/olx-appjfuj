import { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [showModal, setShowModal] = useState(false)
  const [adsList, setAdsList] = useState('')
  const [edit_ad, setEdit_ad] = useState({})
  const [city, setCity] = useState('')
  const [searchValue, setSearchValue] = useState('')

  function getUser (params) {
    return user
  }
  function getEdit_ad (params) {
    return edit_ad
  }

  function getAdsList (params) {
    return adsList
  }
  function getCity (params) {
    return city
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        getUser,
        adsList,
        setAdsList,
        getAdsList,
        city,
        setCity,
        getCity,
        showModal,
        setShowModal,
        edit_ad,
        setEdit_ad,
        searchValue,
        setSearchValue
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
