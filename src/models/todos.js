const connection = require('../configs/db')
const {actionQuery} = require('../helpers/helpers')

const todos = {
    getTaskById: (id) => {
      return actionQuery("SELECT * FROM todos WHERE id= ?", id)
    },
    searchTask:(search) =>{
      console.log(search)
      return actionQuery('SELECT * FROM todos WHERE task LIKE ?',`%${search}%`)
    },
    getAllTask: ({...arg}) => {
      console.log(arg)
      return actionQuery(`SELECT * FROM todos ${arg.search? 'WHERE task LIKE ?': ''} ORDER BY ?? ${arg.typeSort} LIMIT ${arg.limit} OFFSET ${arg.offset}`, arg.search ? [`%${arg.search}%`, arg.sortdata]:arg.sortdata )
    },
    countTask: () => {
      return actionQuery(`SELECT count(*) AS totalData FROM todos`)
    },
    updateTask: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE todos SET ? WHERE id = ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteTask: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM todos WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject( new Error(err))
                }
            })
        })
    },
    insertTask: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO todos SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            } )
        })
    }
}

module.exports = todos