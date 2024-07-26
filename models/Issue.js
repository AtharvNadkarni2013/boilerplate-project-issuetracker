const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
    issue_title: {type: String, required: true },
    issue_text: {type: String, required: true },
    created_by: {type: String, required: true },
    assigned_to: {type: String, required: false },
    project: {type: String, required: true },
    open: {type: Boolean, required: true, default: true },
    status_text: {type: String, required: false }
}, {timestamps: {
    createdAt: "created_on",
    updatedAt: "updated_on",
}, versionKey: false})

module.exports = mongoose.model("Issue", issueSchema)