import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';
Object.keys(rules).forEach(rule => {
    if (typeof rules[rule] === 'function') defineRule(rule, rules[rule]);
});

export default defineNuxtPlugin(() => {
    defineRule('emailAndRequired', (value) => {
        if (rules.email(value) && rules.required(value)) {
            return true;
        }

        // return 'Значення не відповідає поштовому формату: email@site.com';
        return 'Email should be in format: email@site.com'
    });

    defineRule('requiredIfFieldFilled', (value, [target]) => {
        if (rules.required(value)) return true;

        return "Це поле є обов'язковим";
    });

    defineRule('min_value', (value, [min]) => {
        if (rules.min_value(value, [min]) && value !== null) return true;

        return `Значення повинно бути > ${min}`;
    });

    defineRule('password', (value) => {
        if ( rules.required(value) && rules.min(value, { length: 8 })) {
            return true;
        }
        return 'Password must be at least 8 characters';
    });

    defineRule('confirmPassword', (value, [target], ctx) => {
        if (rules.required(value) && value === ctx.form[target]) {
            return true;
        }

        return 'Passwords must match';
    });

    defineRule('name', (value) => {
        return rules.max(value, { length: 60 })
            ? true
            : 'Name may not exceed 60 characters';
    });
    
})