const mongoose = require("mongoose");

const QualityOfWorkSchema = new mongoose.Schema({
  rating: String,
  comments: String,
});

const CoreValuesAndObjectivesSchema = new mongoose.Schema({
  qualityofwork: QualityOfWorkSchema,
  attendanceandPunctuality: QualityOfWorkSchema,
  reliability: QualityOfWorkSchema,
  communicationSkills: QualityOfWorkSchema,
  judgement: QualityOfWorkSchema,
});

const KnowledgeOfPositionSchema = new mongoose.Schema({
  rating: String,
  comments: String,
});

const JobSpecificPerformanceCriteriaSchema = new mongoose.Schema({
  knowledgeofposition: KnowledgeOfPositionSchema,
  workconsistency: KnowledgeOfPositionSchema,
});

const ReportSchema = new mongoose.Schema({
  date: String,
  name: String,
  negative: String,
  overallrating: String,
  performancegoals: String,
  positive: String,
  reviewfrom: String,
  reviewto: String,
  supervisor: String,
  title: String,
  coreValuesAndObjectives: [CoreValuesAndObjectivesSchema],
  jobspecificperformancecriteria: [JobSpecificPerformanceCriteriaSchema],
});

const PresModel = mongoose.model("report", ReportSchema);

module.exports = PresModel;
