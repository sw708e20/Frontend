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
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

export class Question {
  id: number;
  question: string;
  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
  }
}

export enum Answer_Enum {
  YES = 2,
  PROBABLY = 1,
  DONT_KNOW = 0,
  PROBABLY_NOT = -1,
  NO = -2,
}

export function getAnswerString(value: Answer_Enum): string {
  let result: string = "";
  switch (value) {
    case Answer_Enum.YES:
      result = "Ja";
      break;
    case Answer_Enum.PROBABLY:
      result = "Måske";
      break;
    case Answer_Enum.DONT_KNOW:
      result = "Ved ikke";
      break;
    case Answer_Enum.PROBABLY_NOT:
      result = "Måske ikke";
      break;
    case Answer_Enum.NO:
      result = "Nej";
      break;
  }
  return result;
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

  getConvertedArray() {
    let converted_numbers: { [key: string]: number } = {};

    for (let element of this.answers) {
      let question_key: any = element.question.id.toString();
      let answer_key = element.value;
      converted_numbers[question_key] = answer_key;
    }
    return converted_numbers;
  }

  getRecommendations(answer: Answer) {
    this.answers.push(answer);
    let converted_numbers = this.getConvertedArray();
    return EdufinderDataService.getRecommendations(converted_numbers);
  }

}

export const questionManager = new QuestionManager();