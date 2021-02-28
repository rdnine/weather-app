import axios from 'axios'
import config from 'config'
import moment from 'moment'

let responseObj = {
  message: 'error'
}

// Gets weather information by city name (param)
export const getWeather = (req, res) => {
  // Get request to openweathermaps api - Current weather endpoint
  axios.get(
    `${config.get('api.endpoint')}/weather?q=${req.params.name}&appid=${config.get('api.key')}&units=metric`
  ).then(response => {
    // If request was successful
    if(response.status === 200) {
      responseObj.message = 'success'

      responseObj.data = {
        name: response.data.name,
        country: response.data.sys.country,
        weather: {
          temperature: response.data.main.temp,
          title: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        },
        dates: {
          sunrise: moment.unix(response.data.sys.sunrise).format('HH:mm'), // Convert unix timestamp to time
          sunset: moment.unix(response.data.sys.sunset).format('HH:mm') // Convert unix timestamp to time
        }
      }
    }
    
    // Send built responsive object or error message depending on status
    res.send(responseObj)

  }).catch(err => {
    // 404 - No city found. Sends error message and header to FE
    responseObj.message = 'not found'
    res.send(responseObj)
  })

}

// Gets weather information by city id (param)
export const getWeatherByID = (req, res) => {
  // Get request to openweathermaps api - Current weather endpoint
  axios.get(
    `${config.get('api.endpoint')}/weather?id=${req.params.id}&appid=${config.get('api.key')}&units=metric`
  ).then(response => {
    // If request was successful
    console.log(response)
    if(response.status === 200) {
      responseObj.message = 'success'

      responseObj.data = {
        id: response.data.id,
        name: response.data.name,
        country: response.data.sys.country,
        weather: {
          temperature: response.data.main.temp,
          title: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        },
        dates: {
          sunrise: moment.unix(response.data.sys.sunrise).format('HH:mm'), // Convert unix timestamp to time
          sunset: moment.unix(response.data.sys.sunset).format('HH:mm') // Convert unix timestamp to time
        }
      }
    }
    
    // Send built responsive object or error message depending on status
    res.send(responseObj)

  }).catch(err => {
    // 404 - No city found. Sends error message and header to FE
    responseObj.message = 'not found'
    res.send(responseObj)
  })

}


// Gets a list of cities based on search query (param)
export const getCities = (req, res) => {
  
  // Get request to openweathermaps api - Current weather endpoint
  axios
    .get(
      `${config.get('api.endpoint')}/find?q=${
        req.params.name
      }&appid=${config.get('api.key')}&units=metric`
    )
    .then((response) => {
      if (response.status === 200) {
        responseObj.message = 'success'

        responseObj.data = {
          count: response.data.count,
          list: response.data.list,
        }
      }

      // Send built responsive object or error message depending on status
      res.send(responseObj)
    })
    .catch((err) => {
      // 404 - No city found. Sends error message and header to FE
      responseObj.message = 'not found'
      res.send(responseObj)
    })
}