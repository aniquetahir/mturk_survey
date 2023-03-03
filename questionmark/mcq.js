class MCQ {
    constructor(question, choices) {
        this.question = question;
        this.choices = choices;
    }

    getData(){
        return {
            'question': this.question,
            'choices': this.choices
        }

    }
}