

const divisorValueDictionary = [
    { divisor: 3, value: "Foo" },
    { divisor: 5, value: "Bar" },
    { divisor: 7, value: "Qix" },
]

const conditions = {
    isValueDivisibleByDivisor: (val) => ({ divisor }) => val % divisor === 0,
    isDigitEqualToDivisor: (digit) => ({ divisor }) => divisor.toString() === digit,
}

const processRules = (conditionFunction,actionFunction) => (currentAccumulated, currentDivisor) => {
    if(conditionFunction(currentDivisor)){
        return actionFunction(currentAccumulated,currentDivisor)
    }
    return currentAccumulated

}
const processValue = (val) => {
    const processValueActionFunction = (currentAccumulated,currentDivisor)=>{
       currentAccumulated += currentDivisor.value
        return currentAccumulated
    }
    return divisorValueDictionary.reduce(processRules(conditions.isValueDivisibleByDivisor(val),processValueActionFunction),"")
};

const processDigits = (val) =>{
    let result =''
    const intToString = val.toString()
    for(const digit of intToString){
        result+= processDigit(digit)
    }
    return result;
}
const processDigit = (digit)=>{
    const processDigitActionFunction = (currentAccumulated,currentDivisor)=>{
            currentAccumulated = currentDivisor.value
        return currentAccumulated
    }
    return divisorValueDictionary.reduce(processRules(conditions.isDigitEqualToDivisor(digit),processDigitActionFunction),"")
}

function compute(val){
    const processValueResult = processValue(val)
    const processDigitsResult = processDigits(val)
    return processValueResult+processDigitsResult;
}
describe('FooBarFix', () => {

    describe('value is a single digit', () => {
        test('When number is 3', () => {
            expect(compute(3)).toBe("FooFoo");
        });
        test('When number is 5', () => {
            expect(compute(5)).toBe("BarBar");
        });
        test('When number is 7', () => {
            expect(compute(7)).toBe("QixQix");
        });
    });

    describe('value is multi-digit', () => {
        test('value is divisible by multiple factors', () => {
            expect(compute(15)).toBe("FooBarBar");
        });
            test('value contains multiple special digits', () => {
                expect(compute(357)).toBe("FooQixFooBarQix");
            });
            test('value is divisible and contains special digits', () => {
                expect(compute(35)).toBe("BarQixFooBar");
            });
        });

})

