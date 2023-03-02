import { reject } from 'lodash';

import  { Contacts } from '../models/contact';

export const resolvers = {
    Query: {
        getContacts: () => {
            return Contacts.find();
        },
        getContact: (root, {id}) => {
            return new Promise((resolve) => {
                Contacts.findById(id,(err, contact) => {
                    if(err) reject(err);
                    else {
                        console.log("Contact", contact);
                        resolve(contact);
                    }
                });
            });
        }
    },
    Mutation: {
        createContact: (root, {input} ) => {
            const newContact = new Contacts({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                company: input.company
            });
            
            newContact.id = newContact._id;

            return new Promise((resolve) => {
                newContact.save((err) => {
                    if(err) reject(err);
                    else {
                        console.log("newContact", newContact);
                        resolve(newContact);
                    }
                });
            });
        },
        updateContact: (root, {input} ) => {
            return new Promise((resolve) => {
                Contacts.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, contact) => {
                    if(err) reject(err);
                    else {
                        console.log("modifiedContact", contact);
                        resolve(contact);
                    }
                });
            });
        },
        deleteContact: (root, {id} ) => {
            return new Promise((resolve) => {
                Contacts.remove({_id: id}, (err) => {
                    if(err) reject(err);
                    else {
                        resolve("Successfully deleted contact!");
                    }
                });
            });
        }
    }

};
