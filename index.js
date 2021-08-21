const input = document.querySelector('#input-birthdate');
const btnCheck = document.querySelector('#btn-check');
const output = document.querySelector('#output');

function revrseString(inpStr) {
    let str = inpStr;
    let revStr = str.split('').reverse().join('');
    return revStr;
}

function checkPalindrome(inpStr) {
    return inpStr === revrseString(inpStr);
}

function dateToString(date) {
    let dateInStr = {
        day: '',
        month: '',
        year: ''
    }
    date.day < 10 ? dateInStr.day = '0' + date.day.toString() : dateInStr.day = date.day.toString();
    date.month < 10 ? dateInStr.month = '0' + date.month.toString() : dateInStr.month = date.month.toString();
    dateInStr.year = date.year.toString();
    return dateInStr;
}

function getDateInAllFormat(date) {

    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDate(date) {
    let dateAllFormatList = getDateInAllFormat(date);
    var palindromeList = [];
    for (var i = 0; i < dateAllFormatList.length; i++) {
        var result = checkPalindrome(dateAllFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = dateToString(nextDate);
        var resultList = checkPalindromeForAllDate(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date) {

    var previousDate = getPreviousDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = dateToString(previousDate);
        var resultList = checkPalindromeForAllDate(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

function check() {
    let bday = input.value;
    if (bday !== '') {
        let bdate = bday.split('-');
        let yyyy = bdate[0];
        let mm = bdate[1];
        let dd = bdate[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        let strDate = dateToString(date);
        let listDate = checkPalindromeForAllDate(strDate);
        var isPalindrome = false;
        for (let i = 0; i < listDate.length; i++) {
            if (listDate[i]) {
                isPalindrome = true;
                break;
            }
        }
        if (isPalindrome == false) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, prevDate] = getPreviousPalindromeDate(date);
            if (ctr1 > ctr2) {
                output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
            } else {
                output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
            }
            output.style.color = "#F472B6";
        } else {
            output.innerText = "yes!, It's a Palindrome";
            output.style.color = "#34D399";
        }
    } else {
        output.innerText = "Please select a date first !!";
        output.style.color = "#F472B6";
    }
}

btnCheck.addEventListener('click', check);