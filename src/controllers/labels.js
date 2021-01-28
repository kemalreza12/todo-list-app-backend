const labelsModels = require('../models/labels')
const helper = require('../helpers/helpers')

const labels = {
    getLabelById: (req, res) => {
        const id  = req.params.id;
        labelsModels.getLabelById(id)
        .then((result) => {
            resultLabels = result;
            helper.response(res, resultLabels, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getAllLabel: (req, res) => {
        const sortdata = req.query.sort || 'id';
        const typeSort = req.query.typesort || 'ASC' 
        const search = req.query.search
        const limit = req.query.limit || 9
        const offset = ((req.query.page || 1) -1) * limit
        labelsModels.getAllLabel({sortdata,typeSort, search, limit, offset})
        .then((result) => {
          resultLabels = result
    
        //   res.json(resultProducts);
        //   client.setex('getallproduct', 60*60*12 , JSON.stringify(resultProducts))
          helper.response(res, resultLabels, 200, null, req.paginations)
        })
        .catch((err) => {
          console.log(err)
        })
      },
    updateLabel: (req, res) => {
        const id = req.params.idtes
        const {label, desc} = req.body
        const data = {
            label,
            desc,
            updated_at: new Date()
        }
        labelsModels.updateLabel(id, data)
        .then((result) => {
            const resultLabels = result;
            console.log(result)
            helper.response(res, resultLabels, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    deleteLabel: (req, res) => {
        const id = req.params.id
        LabelsModels.deleteLabel(id)
        .then((result) => {
            resultLabels = result;
            helper.response(res, resultLabels, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    insertLabel: (req, res) => {
        const {label, desc} = req.body
        const data = {
            label,
            desc,
            created_at: new Date(),
            updated_at: new Date()
        }
        labelsModels.insertLabel(data)
        .then((result) => {
            const resultLabels = result;
            console.log(result)
            // res.json(resultLabels)
            helper.response(res, resultLabels, 200, null)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = labels