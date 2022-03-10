//a function that takes an array of object and return a random amount of items from the object
let randomQuestions = function (questionBank, amount) {
    let result = []
    let questions = []

    if (amount > questionBank.length) {
        return []
    }
    //run thru a loop, the amount of times questions need to be get
    for (let questionIndex = 0; questionIndex < amount; questionIndex++) {
        //make random indexes present tin the question bank
        let index = Math.round(Math.random() * (questionBank.length - 1));
        //ERROR HANDLING : make sure no index is repeated
        while (result.includes(index)) {
            index = Math.round(Math.random() * (questionBank.length - 1));
        }
        //hold the indexes temporarily in  in an array 
        result.push(index);
    }

    //go over the indexes get questions that correspond to them
    for (let index of result) {
        questions.push(questionBank[index])
    }
    return questions
}


module.exports = { randomQuestions }
// let rr = randomQuestions([{ age: 2 }, { gender: 5 }, { school: 3 }, { chores: 2 }, { bb: 4 }], 3)
// console.log(rr);
