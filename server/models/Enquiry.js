const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  status: String,
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  changedAt: { type: Date, default: Date.now },
  note: String,
});

enquirySchema_def = {
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  serviceRequired: { type: String, default: '' },
  projectLocation: { type: String, default: '' },
  estimatedBudget: { type: String, default: '' },
  message: { type: String, default: '' },
  preferredContactMethod: { type: String, default: 'WhatsApp' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'closed'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  followUpDate: Date,
  statusHistory: [statusHistorySchema],
  ipAddress: String,
  submittedAt: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false },
};

const enquirySchema = new mongoose.Schema(enquirySchema_def, { timestamps: true });

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ phone: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
