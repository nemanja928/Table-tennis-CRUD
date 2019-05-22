//#region Imports
import * as express from 'express';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import * as fromInterfaces from './../models/interfaces/index';

const moment = require('moment');
const PhoneNumber = require('awesome-phonenumber');
const config = require('./../config/constants/constants');
const letterNumberUnderscoreRegEx: RegExp = /^[\w& .-/+]+$/;
// tslint:disable-next-line:max-line-length
const emailRegEx: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface DoB {
    day: number;
    month: number;
    year: number;
    message: string;
}
//#endregion

export default class Functions {
    /**
     * Function retrive token from http header
     * @param headers - http header
     */
    public getToken = headers => {
        if (headers && headers.authorization) {
            let parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    public decodeToken = (token): string => {
        const decode = jwt.decode(token, config.secret);
        return decode;
    };

    // public createGameIdArray = (
    //     input: fromInterfaces.IUser,
    //     createGame: fromInterfaces.IGame
    // ): number[] => {
    //     const gameIds: number[] = [createGame._id];
    //     if (!_.isNil(input.games)) {
    //         for (const game of input.games) {
    //             if (!_.isNil(game._id)) {
    //                 if (createGame._id !== game._id) {
    //                     gameIds.push(game._id);
    //                 }
    //             }
    //         }
    //     }
    //     return gameIds;
    // };

    /**
     * Function for authenticating password
     * @param {string | number} - password from request
     * @param {string | number} - password from found user in database
     */
    public authenticatePassword = (
        password: string,
        userFound_password,
        cb: any
    ): void => {
        bcrypt.compare(password, userFound_password, (err, isMatch) => {
            if (err) {
                console.log("Password don't match");
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

    public getErrorMessage = err => {
        if (err.errors) {
            for (let errName in err.errors) {
                if (err.errors[errName].message) {
                    return err.errors[errName].message;
                }
            }
        } else {
            return 'Unknown server error';
        }
    };

    public validateLogin = (username: string, password: string): any => {
        const username_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            username,
            'Username',
            3,
            50,
            letterNumberUnderscoreRegEx
        );
        const password_validate = this.validatePassword(
            password,
            'Password',
            3,
            128
        );
        if (_.isObject(username_validate)) {
            return { error: username_validate };
        }
        if (_.isObject(password_validate)) {
            return { error: password_validate };
        }
        if (_.isString(username_validate) && _.isString(password_validate)) {
            const username_out: string = username_validate.replace(/\s/g, '');
            const result = {
                username: username_out,
                password: password
            };

            return result;
        }
    };

    public validateRegister = (user, res: express.Response): any => {
        const name_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            user.name,
            'Name',
            2,
            35,
            letterNumberUnderscoreRegEx
        );
        if (_.isObject(name_validate)) {
            return { error: name_validate };
        }
        const last_name_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            user.lastname,
            'Lastname',
            2,
            35,
            letterNumberUnderscoreRegEx
        );
        if (_.isObject(last_name_validate)) {
            return { error: last_name_validate };
        }
        const username_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            user.username,
            'Username',
            2,
            35,
            letterNumberUnderscoreRegEx
        );
        if (_.isObject(username_validate)) {
            return { error: username_validate };
        }
        const password_validate = this.validatePassword(
            user.password,
            'Password',
            3,
            128
        );
        if (_.isObject(password_validate)) {
            return { error: password_validate };
        }
        const email_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            user.email,
            'Email',
            3,
            255,
            emailRegEx
        );
        if (_.isObject(email_validate)) {
            return { error: email_validate };
        }
        // const active_validate = this.validateEmptyInputTrim(user.active);
        // console.log(`active_validate`);
        // console.log(active_validate);
        // if (_.isObject(active_validate)) {
        //     return { error: active_validate };
        // }
        const separatedDoB: DoB = this.separateDoB(user.DoB, 'L');
        const day_validate = this.validateDayMonth(
            separatedDoB.day,
            'Day',
            1,
            31
        );
        if (!_.isInteger(day_validate)) {
            return { error: day_validate };
        }
        const month_validate = this.validateDayMonth(
            separatedDoB.month,
            'Month',
            1,
            12
        );
        if (!_.isInteger(month_validate)) {
            return { error: month_validate };
        }
        const year_validate = this.validateYear(separatedDoB.year, 'Year', 4);
        if (!_.isInteger(year_validate)) {
            return { error: year_validate };
        }
        const birthday = `${year_validate}/${month_validate}/${day_validate}`;
        const birthday_validate = this.validateBirthday(
            birthday,
            'Birthday',
            Number(day_validate),
            Number(month_validate),
            Number(year_validate)
        );
        if (birthday_validate !== undefined) {
            return { error: birthday_validate };
        }
        const additionalInfo_validate = this.validateStringEmptyMinMaxLenRegexpInput(
            user.additionalInfo,
            'Aditional info',
            2,
            700,
            letterNumberUnderscoreRegEx
        );
        if (_.isObject(name_validate)) {
            return { error: name_validate };
        }
        const result = {
            name: name_validate,
            lastname: last_name_validate,
            username: username_validate,
            password: password_validate,
            email: email_validate,
            active: user.active,
            DoB: birthday,
            additionalInfo: additionalInfo_validate,
            role: user.roleIdArr
        };
        return result;
    };

    private separateDoB(dateOfBirth: string, format: string) {
        const delimiter = /['.', '\,', '-', '/']/;
        const formatedDate = moment(dateOfBirth).format(format);
        const formatedDate_split = formatedDate.split(delimiter);
        let result: DoB;
        if (formatedDate_split[0].length > 2 && Number(formatedDate_split[0]) > 12) {
            result = {
                day: 0,
                month: 0,
                year: 0,
                message: `Correct format for input is ${format}`
            };
            return result;
        }

        result = {
            day: Number(formatedDate_split[1]),
            month: Number(formatedDate_split[0]),
            year: Number(formatedDate_split[2]),
            message: 'success'
        };
        return result;
    }

    /**
     * Check if string is empty,
     * check if its between 3 and 30 characters long,
     * check if its (a-z, A-Z, 0-9, -)
     * @param param - string input
     * @param response - express.Response
     */
    private validateStringEmptyMinMaxLenRegexpInput = (
        param: string,
        name: string,
        min_len: number,
        max_len: number,
        regexp?: RegExp
    ) => {
        if (param === '' || param === null || !param) {
            return {
                message: `${name}: (${param}) can\'t be empty`
            };
        }
        if (param.trim().length < min_len) {
            return {
                message: `${name}: (${param}) must be at least ${min_len} characters long`
            };
        }
        if (param.trim().length > max_len) {
            return {
                message: `${name}: (${param}) can\'t be longer then ${max_len} characters`
            };
        }
        if (regexp) {
            if (!regexp.test(param.trim())) {
                return {
                    message: `${name}: (${param}) can only containe a-z, A-Z, 0-9, -`
                };
            }
        }

        return param.trim();
    };

    private validateEmail = (
        param: string,
        name: string,
        min_len: number,
        max_len: number,
        regexp?: RegExp
    ): string | object => {
        if (param === '' || param === null || !param) {
            return {
                message: `${name}: (${param}) can\'t be empty`
            };
        }
        if (param.trim().length < min_len) {
            return {
                message: `${name}: (${param}) must be at least ${min_len} characters long`
            };
        }
        if (param.trim().length > max_len) {
            return {
                message: `${name}: (${param}) can\'t be longer then ${max_len} characters`
            };
        }
        if (regexp) {
            if (!regexp.test(param.trim())) {
                return {
                    message: `${name}: (${param}) is not in correct format`
                };
            }
        }

        return param.trim();
    };

    private validatePassword = (
        input: string,
        name: string,
        min_len: number,
        max_len: number
    ) => {
        if (!input) {
            return {
                message: `${name} can't be empty!`
            };
        }
        if (input === '' || input === null || !input) {
            return {
                message: `${name} can't be empty!`
            };
        }
        if (input.length < min_len) {
            return {
                message: `${name} must have at lest ${min_len} characters!`
            };
        }
        if (input.length > max_len) {
            return {
                message: `${name} can't be longer then ${max_len} characters!`
            };
        }
        return input;
    };

    /**
     * Function check if string is empty,
     * if its not trim() white spaces
     * before, after
     * @param param - string input
     * @param response - express.Response
     */
    private validateEmptyInputTrim = (param: string): string => {
        let description: string = '';
        if (param !== '' || param) {
            description = param.trim();
        } else {
            description = param;
        }
        return description;
    };

    /**
     * Function check if input is empty,
     * check if input is only numeric (0 - 9)
     * @param param  - string input
     * @param response - express.Response
     */
    private validateNumericInput = (
        param: any,
        name: string,
        regexp?: RegExp
    ): string | object => {
        let pttTemp: string = '';
        if (param !== '' || param) {
            pttTemp = param.replace(/\s/g, '');
        } else {
            return {
                message: `${name} can\'t be empty`
            };
        }
        if (regexp) {
            if (!regexp.test(pttTemp)) {
                return {
                    message: `${name} (${param}) can only containe numbers 0-9 and spaces.`
                };
            }
        }
        return pttTemp;
    };

    /**
     * Return month name depending on number input
     * @param {number} - 1 - 12 for evry month in year
     */
    private monthNames = (number: number): string => {
        let result: string = '';
        switch (number) {
            case 1:
                result = 'Januray';
                break;
            case 2:
                result = 'February';
                break;
            case 3:
                result = 'March';
                break;
            case 4:
                result = 'April';
                break;
            case 5:
                result = 'May';
                break;
            case 6:
                result = 'June';
                break;
            case 7:
                result = 'July';
                break;
            case 8:
                result = 'August';
                break;
            case 9:
                result = 'September';
                break;
            case 10:
                result = 'October';
                break;
            case 11:
                result = 'November';
                break;
            case 12:
                result = 'December';
                break;
            default:
                result = "Don't exists";
                break;
        }

        return result;
    };

    /**
     * Return number of days in each month
     * @param {number} - month input
     * @param {number} - year input
     */
    private daysInMonth = (month: number, year: number): number => {
        return new Date(year, month, 0).getDate();
    };

    private validatePhoneMobile = (
        input: string,
        name: string
    ): string | object => {
        console.log(`validatePhoneMobile!!!`);
        try {
            let phone: string = '';
            if (input === '' || !input) {
                console.log(`${name} is not mandatory`);
                return phone;
            } else {
                if (input.trim().charAt(0) !== '+') {
                    return {
                        message: `${name} mora početi sa znakom +`
                    };
                } else {
                    const phoneTemp: any = new PhoneNumber(input);
                    // console.log(name);
                    // console.log(phoneTemp);
                    phone = phoneTemp.getNumber();
                    console.log(`phone/*-/*-/-*/*-/*-/*-/-*/*-/*-/`);
                    console.log(phone);
                    if (phone === undefined) {
                        return {
                            message: `Polje - ${phone} - ostavite prazno, ili unesite validan broj - ${name} -`
                        };
                    }
                    return phone;
                }
            }
        } catch (error) {
            return {
                message: `${error}`
            };
        }
    };

    /**
     * Validate day or month input (empty, zero value, integer, min - max value)
     * @param {string} - date or month input value
     * @param {string} - name date or mont
     * @param {number} - minimum value
     * @param {number} - maximum value
     */
    private validateDayMonth = (
        input: number,
        name: string,
        min_len: number,
        max_len: number
    ): number | object => {
        const input_num: number = Number(input);
        if (input_num === 0) {
            return {
                message: `${name} can't be zero`
            };
        }
        if (input_num === null || !input_num) {
            return {
                message: `${name} can't be empty!`
            };
        }
        if (input_num < min_len) {
            return {
                message: `${name} can't be lower then ${min_len}!`
            };
        }
        if (input_num > max_len) {
            return {
                message: `${name} can't be bigger then ${max_len}!`
            };
        }
        if (!_.isInteger(input_num)) {
            return {
                message: `${name} must be whole number.`
            };
        }
        return input_num;
    };

    /**
     * Validate year input (empty, zero value, integer, carater length)
     * @param {string} - year input value
     * @param {string} - name
     * @param {number} - max character length
     */
    private validateYear = (
        input: number,
        name: string,
        max_len: number
    ): number | object => {
        // console.log(`validateYear!!!`);
        if (input === null || !input) {
            return {
                message: `${name} can't be empty`
            };
        }
        if (input === 0) {
            return {
                message: `${name} can't be zero!`
            };
        }
        if (input !== parseInt(input.toString(), 10)) {
            return {
                message: `${name} must be whole number`
            };
        }
        const inputLength = (Math.log(input) * Math.LOG10E + 1) | 0; // get number of digits
        if (inputLength > max_len) {
            return {
                message: `${name} can't have more then ${max_len} characters`
            };
        }
        const full_year_now: Date = new Date();
        const year_now: number = full_year_now.getFullYear();
        if (input > year_now) {
            return {
                message: `${name} can't be bigger that this year!`
            };
        }
        if (input < 1900) {
            return {
                message: `${name} can't be lower then 1900`
            };
        }
        return input;
    };

    /**
     * Validate birthday (empty, bigger then Date.now(), valid date - moment)
     * @param {string} - birthday input
     * @param {string} - name
     * @param {number} - day value
     * @param {number} - month value
     * @param {number} - year value
     */
    private validateBirthday = (
        input: string,
        name: string,
        dayTemp: number,
        monthTemp: number,
        yearTemp: number
    ) => {
        // console.log(`validateBirthday!!!`);
        if (input === '' || input === null || !input) {
            return {
                message: `${name} can't be empty!`
            };
        }
        const full_year_now: Date = new Date();
        const month_name = this.monthNames(monthTemp);
        // console.log(`month_name`);
        // console.log(month_name);
        const days_in_month: number = this.daysInMonth(monthTemp, yearTemp);
        // console.log(`days_in_month`);
        // console.log(days_in_month);
        const input_to_date: any = new Date(input);
        if (input_to_date.getTime() > full_year_now.getTime()) {
            return {
                message: 'Date you choose is bigger then today date!'
            };
        }
        // console.log(`moment(input, 'L')`);
        // console.log(moment(input, 'L'));
        // console.log(`moment(input, 'L').isValid()`);
        // console.log(moment(input, 'L').isValid());
        // if (!moment(input, 'L').isValid()) {
        //     return {
        //         message: `Year ${yearTemp}, ${month_name} had ${days_in_month} days. For - Day - you entered - ${dayTemp} -.`
        //     };
        // }
    };

    /**
     * Function check if input is empty
     * @param {number} param  - request input
     * @param {string} name - name of field
     */
    private validateBoolean = (param: number, name: string): number => {
        let isActiveTemp: number = 0;
        if (Number(param) !== null) {
            isActiveTemp = param;
        } else {
            isActiveTemp = 0;
        }
        return isActiveTemp;
    };
}
