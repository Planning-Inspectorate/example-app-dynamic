import IdentifierQuestion from "./question.js";

describe('./src/dynamic-forms/components/identifier/question.js', () => {
    it('should create', () => {
        const TITLE = 'title';
        const QUESTION = 'Question?';
        const DESCRIPTION = 'Describe';
        const FIELDNAME = 'field-name';
        const URL = 'url';
        const PAGE_TITLE = 'this appears in <title>';
        const VALIDATORS = [1, 2];
        const HTML = '/path/to/html.njk';
        const HINT = 'hint';
        const INPUT_CLASSES = 'govuk-body';
        const LABEL = 'A label';

        const question = new IdentifierQuestion({
            title: TITLE,
            question: QUESTION,
            description: DESCRIPTION,
            fieldName: FIELDNAME,
            url: URL,
            pageTitle: PAGE_TITLE,
            validators: VALIDATORS,
            html: HTML,
            hint: HINT,
            inputClasses: INPUT_CLASSES,
            label: LABEL
        });

        expect(question.title).toEqual(TITLE);
        expect(question.question).toEqual(QUESTION);
        expect(question.description).toEqual(DESCRIPTION);
        expect(question.fieldName).toEqual(FIELDNAME);
        expect(question.viewFolder).toEqual('identifier');
        expect(question.url).toEqual(URL);
        expect(question.pageTitle).toEqual(PAGE_TITLE);
        expect(question.validators).toEqual(VALIDATORS);
        expect(question.html).toEqual(HTML);
        expect(question.hint).toEqual(HINT);
        expect(question.inputClasses).toEqual(INPUT_CLASSES);
        expect(question.label).toEqual(LABEL);
    });
});
