var countryCodeRegex = /^(\d{1}\-)?(\d{1,2})$/

var emailRegex = /\S+@\S[a-z]+\.\S+/;

var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

var dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/

var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,200}$/

var firstName = /^[a-zA-Z0-9,._'() ]*$/

var latLongitude = /^[-|+]?[0-9]{0,3}(.[0-9]{0,6})?$/

var multipleLogin = true
module.exports = {
    countryCodeRegex,
    emailRegex,
    phoneRegex,
    dateRegex,
    passwordRegex,
    firstName,
    latLongitude,
    multipleLogin
}