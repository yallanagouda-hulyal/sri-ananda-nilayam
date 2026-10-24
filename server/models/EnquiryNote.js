const mongoose = require('mongoose');

const enquiryNoteSchema = new mongoose.Schema({
  enquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
  text: { type: String, required: true },
}, { timestamps: true });

enquiryNoteSchema.index({ enquiry: 1, createdAt: -1 });

module.exports = mongoose.model('EnquiryNote', enquiryNoteSchema);
