export class QuizUI extends Phaser.Scene {
    /**
     * 
     * @param {{
     * question: string,
     * answer1: string,
     * answer2: string,
     * answer3: string,
     * answer4: string,
     * answer: number
     * }} data 
     */
    constructor(data) {
        super();

        this.question = data.question;
        this.answers = {
            "A": data.answer1,
            "B": data.answer2,
            "C": data.answer3,
            "D": data.answer4,
            "get": () => {
                return [this.A, this.B, this.C, this.D][data.answer - 1];
            }
        }
    }
}