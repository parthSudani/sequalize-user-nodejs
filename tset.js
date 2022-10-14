dateString = "16-11-1996"
var Birthday = moment(dateString, 'DD-MM-YYYY')
var DOB = Birthday.format('MM-DD-YYYY')

var split = DOB.split('-');

var year = parseInt(split[2]);
var month = parseInt(split[0]);
var day = parseInt(split[1]);
var today = new Date();

var age = today.getFullYear() - year;

if (today.getMonth() + 1 < month || (today.getMonth() + 1 == month && today.getDate() < day) && age != 18) {
    age--;
}