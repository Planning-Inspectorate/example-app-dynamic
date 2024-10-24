// Define all questions
import AddressValidator from "@pins/dynamic-forms/src/validator/address-validator.js";
import RequiredValidator from "@pins/dynamic-forms/src/validator/required-validator.js";
import {createQuestions} from "@pins/dynamic-forms/src/create-questions.js";
import {questionClasses} from "@pins/dynamic-forms/src/questions.js";

/** @type {Record<string, QuestionProps>} */
export const questionProps = {
    appealSiteAddress: {
        type: 'site-address',
        title: 'What is the address of the appeal site?',
        question: 'What is the address of the appeal site?',
        fieldName: 'siteAddress',
        html: 'resources/site-address/site-address.html',
        url: 'appeal-site-address',
        viewFolder: 'address-entry',
        validators: [new AddressValidator()]
    },
    otherTenantsAgriculturalHolding: {
        type: 'boolean',
        title: 'Are there any other tenants?',
        question: 'Are there any other tenants?',
        fieldName: 'otherTenantsAgriculturalHolding',
        url: 'other-tenants',
        validators: [new RequiredValidator('Select yes if there are any other tenants')]
    },
    myQuestion: {
        type: 'radio',
        title: 'Select an option',
        question: 'Which option would you like?',
        options: [
            {
                text: 'Choice 1',
                value: 1
            },
            {
                text: 'Choice 2',
                value: 2
            },
            {
                text: 'Choice 3',
                value: 3
            }
        ],
        fieldName: 'myQuestion',
        url: 'my-q',
        validators: [new RequiredValidator()]
    }
};

export const getQuestions = () => createQuestions(questionProps, questionClasses, {});
