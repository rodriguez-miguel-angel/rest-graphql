import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    }
});

const Contacts = mongoose.model('contacts', contactSchema);

export { Contacts };