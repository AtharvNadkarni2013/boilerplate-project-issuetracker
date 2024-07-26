'use strict';

const Issue = require("../models/Issue")

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
      Issue.find({ project, ...req.query }, (err, data) => {
        if (err) return res.status(500).json({ error: "internal server error" })


        const fullDataObj = {
          "_id": "",
          issue_title: "",
          issue_text: "",
          created_on: "",
          updated_on: "",
          created_by: "",
          assigned_to: "",
          open: false,
          status_text: ""
        }


        const response = data.map(obj => Object.assign({}, fullDataObj, obj._doc))

        return res.json(response)
      })
    })

    .post(function (req, res) {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body

      if ([issue_title, issue_text, created_by].includes(undefined)) {
        return res.json({ error: 'required field(s) missing' })
      }

      const issue = new Issue({ issue_title, issue_text, created_by, assigned_to, status_text, project })

      issue.save((err, data) => {
        if (err) return console.error(err)

          const fullDataObj = {
            "_id": "",
            issue_title: "",
            issue_text: "",
            created_on: "",
            updated_on: "",
            created_by: "",
            assigned_to: "",
            open: false,
            status_text: ""
          }
  
  
          const response = Object.assign({}, fullDataObj, data._doc)

        delete data.project;

        return res.json(response)
      })
    })

    .put(function (req, res) {
      let project = req.params.project;

      const { _id, ...rest } = req.body


      if (!_id) return res.json({ error: "missing _id" })

      if (Object.keys(rest).length == 0) return res.json({ error: 'no update field(s) sent', '_id': _id })

      Issue.findByIdAndUpdate(_id, rest, (err) => {
        if (err) return res.json({ error: 'could not update', '_id': _id })

        return res.json({ result: "successfully updated", _id })
      })
    })

    .delete(function (req, res) {
      let project = req.params.project;

      const { _id } = req.body

      if (!_id) return res.json({ error: 'missing _id' })

      Issue.findByIdAndDelete(_id, (err) => {
        if (err) return res.json({ error: 'could not delete', '_id': _id })

        return res.json({ result: "successfully deleted", _id })
      })
    });

};
