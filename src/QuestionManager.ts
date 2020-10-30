import EdufinderDataService from "./EdufinderDataService";

export class Education {
  id: number;
  description: string
  name: string
  education_types: EducationType[];

  constructor(id: number, name:string, description:string) {
    this.id = id;
    this.name = name
    this.description = description
    this.education_types = [];
  }
}

// Education type that contains the name of the education, and the url of it
export class EducationType {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

// Question class containing the id of the question, and the string that is the question.
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

// Get the answer string based on the provided enum
export function getAnswerString(value: Answer_Enum) : string {
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

  // Get the first question from the backend
  getFirstQuestion() : Promise<Question> {
    return EdufinderDataService.getFirstQuestion();
  }

  // Get the next question from the backend using the current answers
  getNextQuestion(answers: Answer[]) : Promise<Question> {
    let converted_numbers : AnswerData[] = this.getConvertedArray(answers);
    return EdufinderDataService.getNextQuestion(converted_numbers);
  }

  // Create an AnswerData array from an Answer array
  getConvertedArray(answers : Answer[]) : AnswerData[] {
    let converted_answers: AnswerData[] = answers.map((an) => new AnswerData(an));
    return converted_answers;
  }

  // Get recomendations from the backend
  getRecommendations(answers: Answer[]) : Promise<Education[]> {
    let converted_numbers : AnswerData[] = this.getConvertedArray(answers);
    return EdufinderDataService.getRecommendations(converted_numbers);
  }
}

export const questionManager = new QuestionManager();