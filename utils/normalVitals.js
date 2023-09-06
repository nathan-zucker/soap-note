const normalPulse = {
    'elderly': [90],
    'adult': [60, 100],
    'adolescent': [60, 105],
    'school-age': [60, 120],
    'toddler': [80, 150],
    'infant': [120, 150],
}
const normalRespirations = {
    'elderly': [12, 20],
    'adult': [12, 20],
    'adolescent': [12, 20],
    'school-age': [15, 30],
    'toddler': [15, 30],
    'infant': [25, 50],
}
export function getAgeTag ({age}) {
    console.log(age)
    if (age < 1) {
        return 'infant'
    }
    else if (age < 5) {
        return 'toddler'
    }
    else if (age < 12) {
        return 'school-age'
    }
    else if (age < 16) {
        return 'adolescent'
    }
    else if (age < 75) {
        return 'adult'
    }
    else if (75 <= age) {
        return 'elderly'
    }
    return console.error('getAgeTag could not parse (in normalVitals.js)')
}

function isPulseNormal({age, pulse}) {
    if ( normalPulse[getAgeTag(age)][0] <= pulse && pulse <= normalPulse[getAgeTag(age)][1]) {
        return true
    }
    else {
        return false
    }
}
function isRespirationNormal({age, respirations}) {
    const normalRange = normalRespirations(getAgeTag(age))
    if (normalRange[0] <= respirations && respirations <= normalRange[1]) {
        return true;
    }
    else {
        return false;
    }
}
export {
    isPulseNormal,
    isRespirationNormal,
}