import CheckboxQuestion from "./components/checkbox/question.js";
import MultiFileUploadQuestion from "./components/multi-file-upload/question.js";
import BooleanQuestion from "./components/boolean/question.js";
import RadioQuestion from "./components/radio/question.js";
import DateQuestion from "./components/date/question.js";
import TextEntryQuestion from "./components/text-entry/question.js";
import SingleLineInputQuestion from "./components/single-line-input/question.js";
import MultiFieldInputQuestion from "./components/multi-field-input/question.js";
import NumberEntryQuestion from "./components/number-entry/question.js";
import SiteAddressQuestion from "./components/site-address/question.js";
import UnitOptionEntryQuestion from "./components/unit-option-entry/question.js";
import ListAddMoreQuestion from "./components/list-add-more/question.js";

// This looks a bit grim because so few of our
// Questions overlap with Question correctly.
// Maybe something to fix at some point
/** @type {Record<string, import('./question')>} */
export const questionClasses = Object.freeze({
    checkbox: CheckboxQuestion,
    'multi-file-upload': MultiFileUploadQuestion,
    boolean: BooleanQuestion,
    radio: RadioQuestion,
    date: DateQuestion,
    'text-entry': TextEntryQuestion,
    'single-line-input': SingleLineInputQuestion,
    'multi-field-input': MultiFieldInputQuestion,
    number: NumberEntryQuestion,
    'site-address': SiteAddressQuestion,
    'unit-option': UnitOptionEntryQuestion,
    'list-add-more': ListAddMoreQuestion
});

