import axios from 'axios'
import config from 'config'

export const getWeather = (req, res) => {

  // Get request to openweathermaps api - Current weather endpoint
  axios.get(
    `${config.get('api.endpoint')}?q=${req.params.name}&appid=${config.get('api.key')}&units=metric`
  ).then(response => {
    console.log(response)
    res.send(response.data)
  }).catch(err => {
    res.send(err.data)
  })

}