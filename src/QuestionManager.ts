import EdufinderDataService from "./EdufinderDataService";

export class Education {
  id: number;
  educationTypes: EducationType[];

  constructor(id: number) {
    this.id = id;
    this.educationTypes = [];
  }
}

export class EducationType {

}

export class Question {
  id: number;
  question: string;
  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
  }
}
enum Answer_Enum {
  Yes = 2,
  Probably = 1,
  Dont_know = 0,
  Probably_not = -1,
  No = -2,

}

export class Answer {
  question: Question;
  value: Answer_Enum;

  constructor(question: Question, value: Answer_Enum) {
    this.question = question;
    this.value = value;
  }
}


class QuestionManager {
  
  private answers: Answer[] = [];
  
  getFirstQuestion() {
    return EdufinderDataService.getFirstQuestion();
  }
  
  getQuestion(answer: Answer) {
    this.answers.push(answer);
    let converted_numbers = this.getConvertedArray();
    return EdufinderDataService.getNextQuestion(converted_numbers);
  }
  
  getConvertedArray(){
    let converted_numbers: { [key: string]: number } = {};
    
    for (let element of this.answers) {
      let question_key: any = element.question.id.toString();
      let answer_key = element.value;
      converted_numbers[question_key] = answer_key;
    }
    return converted_numbers;
  }
  
  getRecommendations(answer:Answer) {
    this.answers.push(answer);
    let converted_numbers = this.getConvertedArray();
    return EdufinderDataService.getRecommendations(converted_numbers);
  }
  
}

export const questionManager = new QuestionManager();