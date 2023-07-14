const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntakeModel = {
    firstName: {
        type: String,
        required: true
    },
    lastInitial: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    animalType: {
        type: String,
        required: true
    },
    petNames: {
        type: String,
        required: true
    },
    specialInstructions: {
        type: String,
        required: false
    },
    triggersOrAggressions: {
        type: String,
        required: false
    },
    intakeBody:{
        type: String,
        required: true
    }
}

const intakeSchema = new Schema(IntakeModel)
const Intake = mongoose.model("Intake", intakeSchema);

module.exports = Intake;