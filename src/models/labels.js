const connection = require('../configs/db')
const {actionQuery} = require('../helpers/helpers')

const labels = {
    getLabelById: (id) => {
      return actionQuery("SELECT * FROM labels WHERE id= ?", id)
    },
    searchLabel:(search) =>{
      console.log(search)
      return actionQuery('SELECT * FROM labels WHERE label LIKE ?',`%${search}%`)
    },
    getAllLabel: ({...arg}) => {
      console.log(arg)
      return actionQuery(`SELECT * FROM labels ${arg.search? 'WHERE label LIKE ?': ''} ORDER BY ?? ${arg.typeSort} LIMIT ${arg.limit} OFFSET ${arg.offset}`, arg.search ? [`%${arg.search}%`, arg.sortdata]:arg.sortdata )
    },
    countlabels: () => {
      return actionQuery(`SELECT count(*) AS totalData FROM labels`)
    },
    updateLabel: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE labels SET ? WHERE id = ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteLabel: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM labels WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject( new Error(err))
                }
            })
        })
    },
    insertLabel: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO labels SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            } )
        })
    }
}

module.exports = labels