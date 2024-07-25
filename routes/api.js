'use strict';

const Issue = require("../models/Issue")

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
      Issue.find({ project }, (err, data) => {
        if (err) return res.status(500).json({ error: "internal server error" })

        return res.json(data)
      })
    })

    .post(function (req, res) {
      let project = req.params.project;
      const {issue_title, issue_text, created_by, assigned_to, status_text} = req.body
      
      const issue = new Issue({issue_title, issue_text, created_by, assigned_to, status_text})

      issue.save((err, data) => {
        if (err) return res.status(500).json({error: "error happened"})

        return res.json(data)
      })
    })

    .put(function (req, res) {
      let project = req.params.project;

    })

    .delete(function (req, res) {
      let project = req.params.project;

    });

};
