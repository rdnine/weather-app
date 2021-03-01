# Weather App - Server Side
**Web Server for the Weather App**

---
## Tech Stack
- NodeJS
- ExpressJS
- Axios
- Winston

---
## Install

**Considering you are already inside the "server" folder**

```
  $ npm install
```

## Run
```
  $ npm run start
```
---

## Api Endpoints

```http
GET /
```
Base endpoint. Serves as a checker for the service status

```http
GET /v1/api/weather/cities/:name
```
Returns all cities based on search query

```http
GET /v1/api/weather/city/:name
```
Returns a city based on search query

```http
GET /v1/api/weather/city/id/:id
```
Returns a city based on id