export default function persianToEnglishNumber(persianNumber) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    let englishNumber = '';
    let digitNum = ''
    for (let index = 0; index < persianNumber.length; index++) {
       let digit = persianNumber[index]
       digitNum = persianDigits.indexOf(digit) === -1 ? englishNumber += persianNumber[index] : englishNumber += persianDigits.indexOf(digit)
    }
    return digitNum
}