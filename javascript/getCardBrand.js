var CARD_NUMBERS = {
    'american_express': {
        '34': ['15'],
        '37': ['15'],
    },
    'diners_club': {
        '36'      : ['14-19'],
        '300-305' : ['16-19'],
        '3095'    : ['16-19'],
        '38-39'   : ['16-19'],
        '301'     : ['16-19'],
        '305'     : ['16-19'],

    },
    'jcb': {
        '3528-3589': ['16-19'],
    },
    'discover': {
        '6011'         : ['16-19'],
        '622126-622925': ['16-19'],
        '624000-626999': ['16-19'],
        '628200-628899': ['16-19'],
        '64'           : ['16-19'],
        '65'           : ['16-19'],
    },
    'dankort': {
        '5019': ['16'],
    },
    'maestro': {
        '6759'  : ['12-19'],
        '676770': ['12-19'],
        '676774': ['12-19'],
        '50'    : ['12-19'],
        '56-69' : ['12-19'],
    },
    'mastercard': {
        '2221-2720': ['16'],
        '51-55'    : ['16'],
    },
    'unionpay': {
        '81': ['16'],
    },
    'visa': {
        '4': ['13-19'],
    },
    'elo':{
      '438935'  : ['15-16'],
      '451416'  : ['15-16'],
      '5067'    : ['15-16'],
      '4576'    : ['15-16'],
      '4011'    : ['15-16'],
      '504175'  : ['15-16'],
      '506699'  : ['15-16'],
    }
    };

  function getCardBrand(cardNumber, validateLength = true) {
    let foundCardBrand = '';
    
    cardNumber = String(cardNumber);
    cardNumber = cardNumber.replace(/[- .]/g, ''); // Trim and remove noise
    
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cardNumber.charAt(0))) { // Try to find card number only if first digit is a number, if not then there is no need to check
        cardNumber = cardNumber.replace(/[^0-9]/g, '0'); // Set all non-digits to zero, like "X" and "#" that maybe used to hide some digits
        cardNumber = cardNumber.padEnd(6, '0'); // If cardNumber passed is less than 6 digits, will append 0s on right to make it 6
        
        let firstSixDigits = parseInt(cardNumber.slice(0, 6), 10); // Get first 6 digits
        let cardNumberLength = cardNumber.length; // Total digits of the card
        
        for (let brand in CARD_NUMBERS) {
            for (let prefix in CARD_NUMBERS[brand]) {
                let lengths = CARD_NUMBERS[brand][prefix];
                prefix = String(prefix);
                let prefixMin = 0;
                let prefixMax = 0;
                if (prefix.includes('-')) { // If "dash" exist in prefix, then this is a range of prefixes
                    let prefixArray = prefix.split('-');
                    prefixMin = parseInt(prefixArray[0].padEnd(6, '0'), 10);
                    prefixMax = parseInt(prefixArray[1].padEnd(6, '9'), 10);
                } else { // This is fixed prefix
                    prefixMin = parseInt(prefix.padEnd(6, '0'), 10);
                    prefixMax = parseInt(prefix.padEnd(6, '9'), 10);
                }

                let isValidPrefix = firstSixDigits >= prefixMin && firstSixDigits <= prefixMax; // Is string starts with the prefix

                if (isValidPrefix && !validateLength) {
                    foundCardBrand = brand;
                    break; // Break from both loops
                }
                if (isValidPrefix && validateLength) {
                    for (let length of lengths) {
                        let isValidLength = false;
                        if (length.includes('-')) { // If "dash" exist in length, then this is a range of lengths
                            let lengthArray = length.split('-');
                            let minLength = parseInt(lengthArray[0], 10);
                            let maxLength = parseInt(lengthArray[1], 10);
                            isValidLength = cardNumberLength >= minLength && cardNumberLength <= maxLength;
                        } else { // This is fixed length
                            isValidLength = cardNumberLength === parseInt(length, 10);
                        }
                        if (isValidLength) {
                            foundCardBrand = brand;
                            break; // Break from all 3 loops
                        }
                    }
                }
            }
        }
    }
    
    return foundCardBrand;
}
