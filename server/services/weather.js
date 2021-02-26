import axios from 'axios'
import config from 'config'
import moment from 'moment'

let responseObj = {
  message: 'error'
}

export const getWeather = (req, res) => {

  // Get request to openweathermaps api - Current weather endpoint
  axios.get(
    `${config.get('api.endpoint')}?q=${req.params.name}&appid=${config.get('api.key')}&units=metric`
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
          sunrise: moment.unix(response.data.sys.sunrise).format('HH:mm'),
          sunset: moment.unix(response.data.sys.sunset).format('HH:mm')
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