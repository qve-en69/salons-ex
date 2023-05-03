/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createDecorator } from 'vue-class-component';

const validationCreator = function() {
    const validations = this.$options.__validations || {};
    const ret = {};
    for (const k in validations) {
        // eslint-disable-next-line no-prototype-builtins
        if (!validations.hasOwnProperty(k)) {
            continue;
        }
        const propValidators = validations[k];
        const validators = {};
        for (const i in propValidators) {
            // eslint-disable-next-line no-prototype-builtins
            if (!propValidators.hasOwnProperty(i)) {
                continue;
            }

            if (typeof propValidators[i] === 'function') {
                if (propValidators[i].name === '') {
                    validators[i] = propValidators[i];
                } else {
                    validators[i] = propValidators[i].call(this);
                }
            }
        }
        ret[k] = validators;
    }
    return ret;
};

export function Validate(rule, message) {
    return createDecorator((componentOptions, k) => {
        if (!componentOptions.__validations) {
            componentOptions.__validations = { [k]: {} };
        }
        if (!componentOptions.__validations[k]) {
            componentOptions.__validations[k] = {};
        }
        if (!componentOptions.__messages) {
            componentOptions.__messages = { [k]: {} };
        }
        if (!componentOptions.__messages[k]) {
            componentOptions.__messages[k] = {};
        }

        const id = 'validator' + Object.keys(componentOptions.__validations[k]).length;
        componentOptions.__validations[k][id] = rule;
        componentOptions.__messages[k][id] = message;

        const messages = componentOptions.computed || {};
        const method = camelize('_' + k + '-' + id);
        messages[method] = {
            get: function() {
                return message;
            }
        };
        componentOptions.computed = messages;
        componentOptions.validations = validationCreator;
    });
}

function camelize(s) {
    return s.replace(/(?:^|[-_])(\w)/g, function(stripped, letter) {
            return letter ? letter.toUpperCase() : '';
        })
        .replace(/(^\w)/, function (letter) {
            return letter.toLowerCase();
        });
}