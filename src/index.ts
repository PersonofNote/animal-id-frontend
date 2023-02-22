import { DateTime } from 'luxon';
import luhn from 'luhn';

import { DEFAULT_DATE_FORMATS } from './constants';

/*
* Regular Expressions
* */
const requiredPattern = /[^\s]{1,}/; //No empty strings
const alphaOnlyPattern = /^[A-Za-z]*$/;
const numericOnlyPattern = /^[0-9]*$/;
const alphaNumericOnlyPattern = /^[A-Za-z0-9]*$/;
const namePattern = /^[A-Za-z ,-/'/.]*$/;
const addressCharactersPattern = /^[A-Za-z0-9. -/']*$/;
const zipCharactersPattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"!'#$%^&*]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z-]{2,}))$/;
const telephonePattern = /^(([+]?1)|(\(?[+]?1\)))?[-./ ]?\(?(\d{3})\)?[-./ ]?(\d{3})[-./ ]?(\d{4})$/;
const intlTelephonePattern = /^(\+?)(?:[0-9] ?){9,14}[0-9]$/;
const fedExPattern = /^ *((#\d+)|((box|bin)[-. \\]?\d+)|(.*p[ .]? ?(o|0)[-. \\]? *-?((box|bin)|b|(#|num)?\d+))|(p(ost)? *(o(ff(ice)?)?)? *((box|bin)|b)? *\d+)|(p *-?\/?(o)? *-?box)|post office box|((box|bin)|b) *(number|num|#)? *\d+|(num|number|#) *\d+)/i;
const websitePattern = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)|(https?:\/\/)?(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])*[\w\-._~:/?#[\]@!$&'()*+,;=]+/;
const httpUrlPattern = /(https?:\/\/)(www\.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)|(https?:\/\/)(www\.)?(?!ww)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)|(https?:\/\/)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])*[\w\-._~:/?#[\]@!$&'()*+,;=]+/;
const httpUrlWithQueryPattern = /^(https?:\/\/)(www\.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#&/=]*\?[-a-zA-Z0-9@:%_+.~#&/=]+)|^(https?:\/\/)(www\.)?(?!ww)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#&/=]*\?[-a-zA-Z0-9@:%_+.~#&/=]+)|^(https?:\/\/)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])*([-a-zA-Z0-9@:%_+.~#&/=]*\?[-a-zA-Z0-9@:%_+.~#&/=]*)/;
// Password validation pattern
const containsUpperAndLowerPattern = /(?=.*[a-z])(?=.*[A-Z])/;
const containsNumericPattern = /(?=.*\d)/;
const containsSpecialCharactersPattern = /(?=.*[-!$%^&@*()_+|~=`{}[\]:";'<>?,./\\])/;
const noBeginnigOrEndingSpacesPattern = /^[^\s].+[^\s]$/;
const noConsecutiveSpacesPattern = /^((?!\s{2,}).)*$/;

/* 
* Other validation methods 
* */
const luhnValidation = (value: string): boolean => value && value.length < 14 || value.length > 16 ? false : luhn.validate(value);
const validDate = (value: string): boolean => DEFAULT_DATE_FORMATS.some(format => DateTime.fromFormat(value, format).isValid || DateTime.fromISO(value).isValid);


export type Validator<V = string | null> = (value?: V) => boolean;
export type ValidatorWithParams<V = string | null, P = void> = (params: P, value?: V) => boolean;

export const notBlank: Validator = (value) => !!value?.match(requiredPattern);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const required: Validator<any> = (value) => typeof value === 'string' ? notBlank(value) : !!value; 

export const pattern: ValidatorWithParams<string | null, RegExp> = (regex, value) => !!`${value || ''}`.match(regex);

// validation checks below are not concerned for empty values, only entered values
// (required handles empty or not and would be a new validation pattern)
export const emptyOrPattern: ValidatorWithParams<string | null, RegExp> = (regex, value) => value ? pattern(regex, value) : true;

export const alphaOnly: Validator = (value) => pattern(alphaOnlyPattern, value);

export const explicitLength: ValidatorWithParams<string | null, number> = (length, value) => value ? value.length === length : true;

export const maxLength: ValidatorWithParams<string | null, number> = (maxLength, value) => value ? value.length <= maxLength : true;

export const minLength: ValidatorWithParams<string | null, number> = (minLength, value) => value ? value.length >= minLength : true;

export const maxNumber: ValidatorWithParams<number | null, number> = (max, value) => value ? value <= max : true;

export const minNumber: ValidatorWithParams<number | null, number> = (min, value) => value ? value >= min : true;

// check for checks other than Regex
export const emptyOrValidator: ValidatorWithParams<string | null, (arg: string) => boolean > = (validator, value) => value ? validator(value) : true;


export const numericOnly: Validator = (value) => emptyOrPattern(numericOnlyPattern, value);

export const alphaNumericOnly: Validator = (value) => emptyOrPattern(alphaNumericOnlyPattern, value);

export const name: Validator = (value) => emptyOrPattern(namePattern, value);

export const addressCharacters: Validator = (value) => emptyOrPattern(addressCharactersPattern, value);

export const zipCharacters: Validator = (value) => emptyOrPattern(zipCharactersPattern, value);

export const email: Validator = (value) => emptyOrPattern(emailPattern, value);

export const telephone: Validator = (value) => emptyOrPattern(telephonePattern, value);

export const intlTelephone: Validator = (value) => emptyOrPattern(intlTelephonePattern, value);

export const fedEx: Validator = (value) => emptyOrPattern(fedExPattern, value);

export const website: Validator = (value) => emptyOrPattern(websitePattern, value);

export const httpUrl: Validator = (value) => emptyOrPattern(httpUrlPattern, value);

export const httpUrlWithQuery: Validator = (value) => emptyOrPattern(httpUrlWithQueryPattern, value);

export const hasUpperAndLowerCharacters: Validator = (value) => emptyOrPattern(containsUpperAndLowerPattern, value);

export const hasNumericCharacters: Validator = (value) => emptyOrPattern(containsNumericPattern, value);

export const hasSpecialCharacters: Validator = (value) => emptyOrPattern(containsSpecialCharactersPattern, value);

export const hasNoSpacesAtBeginningOrEnd: Validator = (value) => emptyOrPattern(noBeginnigOrEndingSpacesPattern, value);

export const hasNoConsecutiveSpaces: Validator = (value) => emptyOrPattern(noConsecutiveSpacesPattern, value);

export const isValidCreditCardNumber: Validator = (value) => emptyOrValidator(luhnValidation, value);

export const isValidDate: Validator = (value) => emptyOrValidator(validDate, value);


