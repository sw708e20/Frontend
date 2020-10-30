import EdufinderDataService from "./EdufinderDataService";

export class Education {
  id: number;
  education_types: EducationType[];
  description: string;
  name: string;

  constructor(id: number, description: string, name: string) {
    this.id = id;
    this.education_types = [];
    this.description = description;
    this.name = name;
  }
}

export class EducationType {
  name: string;
  url: string;
  id: number;

  constructor(name: string, url: string, id: number) {
    this.name = name;
    this.url = url;
    this.id = id;
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

class AnswerData{
  id: number;
  answer: number;

  constructor(answer: Answer){
    this.id = answer.question.id
    this.answer = answer.value
  }
}


class QuestionManager {

  getFirstQuestion() {
    return EdufinderDataService.getFirstQuestion();
  }

  getQuestion(answers: Answer[]) {
    let converted_numbers = this.getConvertedArray(answers);
    return EdufinderDataService.getNextQuestion(converted_numbers);
  }

  getConvertedArray(answers : Answer[]) {
    let converted_numbers: { [key: string]: number } = {};

    
    for (let element of answers) {
      let question_key: any = element.question.id.toString();
      let answer_key = element.value;
      converted_numbers[question_key] = answer_key;
    }
    

    
    let converted_answers: AnswerData[] = answers.map((an) => new AnswerData(an));
    return converted_answers;
  }

  getRecommendations(answers: Answer[]) {
    let converted_numbers = this.getConvertedArray(answers);
    return EdufinderDataService.getRecommendations(converted_numbers);
  }

  sendGuessData(answers: Answer[], education: Education) {
    let converted_numbers = this.getConvertedArray(answers);
    return EdufinderDataService.postGuessData({questions: converted_numbers, education: education.id});
  }

  getEducations(q: string) {
    return EdufinderDataService.getEducations(q);
  }
}

export const questionManager = new QuestionManager();