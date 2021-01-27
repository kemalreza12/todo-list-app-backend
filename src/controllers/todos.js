const todosModels = require('../models/todos')
const helper = require('../helpers/helpers')

const todos = {
    getTaskById: (req, res) => {
        const id  = req.params.id;
        todosModels.getTaskById(id)
        .then((result) => {
            resultTodos = result;
            helper.response(res, resultTodos, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getAllTask: (req, res) => {
        todosModels.getAllTask()
        .then((result) => {
          resultTodos = result
          helper.response(res, resultTodos, 200, null, req.paginations)
        })
        .catch((err) => {
          console.log(err)
        })
      },
    updateTask: (req, res) => {
        const id = req.params.idtes
        const {task, completed} = req.body
        const data = {
            task,
            completed,
            updated_at: new Date()
        }
        todosModels.updateTask(id, data)
        .then((result) => {
            const resultTodos = result;
            console.log(result)
            helper.response(res, resultTodos, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    deleteTask: (req, res) => {
        const id = req.params.id
        todosModels.deleteTask(id)
        .then((result) => {
            resultTodos = result;
            helper.response(res, resultTodos, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    insertTask: (req, res) => {
        console.log(req.file);
        const {user_id, label_id, task} = req.body
        const data = {
            user_id,
            label_id,
            task,
            created_at: new Date(),
            updated_at: new Date()
        }
        todosModels.insertTask(data)
        .then((result) => {
            const resultTodos = result;
            console.log(result)
            // res.json(resultTodos)
            helper.response(res, resultTodos, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = todos