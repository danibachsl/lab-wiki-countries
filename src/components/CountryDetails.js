import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function CountryDetails() {

    const {alpha3Code} = useParams()

    const [countryDetails, setCountryDetails] = useState(null)
    const [countryBorders, setCountryBorders] = useState([])

    const getDetails = async () => {
        const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`)
         // console.log(response)
         setCountryDetails(response.data)
         setCountryBorders(response.data.borders)
    }

    useEffect(()=> {
        getDetails()
      }, [alpha3Code])
    
      if (!countryDetails) {
        return <div>...isLoading</div>
      }

  return (
    <div>
        <h1>Each Country Details</h1>

        <h2>{countryDetails.name.common}</h2>

        <img src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`} />  

        <h4>Capital: {countryDetails.capital}</h4>

        <p><b>Area: </b>{countryDetails.area}</p>

        <p><b>Borders: </b></p>
        {countryBorders.map((eachBorder, index)=>{
            return <Link to={`/${eachBorder}`} key={index + eachBorder}>{eachBorder}</Link>
          })}

        <Link to={"/"}> Back to List</Link>
    </div>
  )
}

export default CountryDetails