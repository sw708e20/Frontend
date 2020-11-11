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
  id: number;

  constructor(name: string, url: string, id: number) {
    this.name = name;
    this.url = url;
    this.id = id;
  }
}

// Question class containing the id of the question, and the string that is the question.
export class Question {
  id: number;
  en: string;
  da: string;
  constructor(id: number, en: string, da: string) {
    this.id = id;
    this.en = en;
    this.da = da;
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
  let result: string = "recommender.answer_opts.";
  switch (value) {
    case Answer_Enum.YES:
      result += 'yes';
      break;
    case Answer_Enum.PROBABLY:
      result += "probably";
      break;
    case Answer_Enum.DONT_KNOW:
      result += "dont_know";
      break;
    case Answer_Enum.PROBABLY_NOT:
      result += "probably_not";
      break;
    case Answer_Enum.NO:
      result += "no";
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

  // Get the first question from the backend
  getFirstQuestion() : Promise<Question> {
    return EdufinderDataService.getFirstQuestion();
  }

  // Get the next question from the backend using the current answers
  getNextQuestion(answers: { [key: number]: number; }) : Promise<Question> {
    return EdufinderDataService.getNextQuestion(answers);
  }

  // Get recomendations from the backend
  getRecommendations(answers: { [key: number]: number; }) : Promise<Education[]> {
    return EdufinderDataService.getRecommendations(answers);
  }

  sendGuessData(answers: { [key: number]: number; }, education: Education) {
    return EdufinderDataService.postGuessData({questions: answers, education: education.id});
  }

  getEducations(q: string) {
    return EdufinderDataService.getEducations(q);
  }
}

export const questionManager = new QuestionManager();