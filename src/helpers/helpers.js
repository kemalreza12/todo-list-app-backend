const connection = require('../configs/db')

module.exports = {
    response: (res, result, status, err, pagination) => {
     let resultPrint = {}
     if(pagination) {
         resultPrint.paginations = pagination
       }
       resultPrint.status = 'success'
       resultPrint.status_code = status
       resultPrint.result = result
       resultPrint.err = err || null
       return res.status(resultPrint.status_code).json(resultPrint)
    },
    actionQuery: (...arg) => {
      console.log(arg)
      return new Promise((resolve, reject) => {
        connection.query(...arg, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      })
    },
    actionQuery: (...arg) => {
      console.log(arg)
      return new Promise((resolve, reject) => {
        connection.query(...arg, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      })
    }
}