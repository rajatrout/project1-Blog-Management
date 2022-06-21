let axios = require("axios")

//Sessions available in District
const districtSession = async (req, res) => {
    try {
        let id = req.query.district_id
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(options)
        res.status(200).send({ msg: "Seesions", data: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//Getting Tempreture of few cities.
const getTemp = async (req, res) => {
    try {
        let city = req.query.q
        let appid = req.query.appid
        let options = {
            method: "get",
            url: ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid} `
        }
        let result = await axios(options)
        let cities = [result.data.main.temp]
        res.status(200).send({ msg: "Seesions", temp: cities })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const getTempOfCities = async (req, res) => {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []

        for (let i = 0; i < cities.length; i++) {
            let obj =  {city : cities[i]}
            let options = {
                method: "get",
                url: ` https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=68340f6477cc652e6a93ec5dc0ca0f52 `
            }
            let result = await axios(options)
            obj.temp = result.data.main.temp  // creating a new key in obj object and assigning a new value.
            cityObjArray.push(obj)
        }
        let sorted = cityObjArray.sort(function (a,b){return a.temp - b.temp})
        res.status(200).send({ data:sorted })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

/// ascending and descending sorting
//let sorted = cityObjArray.sort(function (a,b){return a.temp - b.temp })











































let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.districtSession = districtSession
module.exports.getTemp = getTemp
module.exports.getTempOfCities = getTempOfCities