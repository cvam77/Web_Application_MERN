const mongoose = require('mongoose');

const UrlKeywordSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }
    // keyword: {
    //     type: String, 
    //     required: true,
    // },
});

module.exports = mongoose.model('UrlKeyword',UrlKeywordSchema);