import http from "./http-common";
import { Question, Education } from "./QuestionManager";

// Class for communicating with the backend service
// Communication is facilitated used HTTP GET and POST requests
class EdufinderDataService {

  getFirstQuestion() : Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      http.get("/question/").then((res) => {
        resolve(new Question(res.data.id, res.data.en, res.data.da));
      }).catch((res) => {
        reject(res);
      });
    });
  }

  getNextQuestion(answers: { [key: number]: number; }) : Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      http.post("/question/", answers).then((res) => {
        resolve(new Question(res.data.id, res.data.en, res.data.da));
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  getRecommendations(answers: { [key: number]: number; }) : Promise<Education[]> {
    return new Promise<Education[]>((resolve, reject) => {
      http.post("/recommend/", answers).then((res) => {
        let list:Education[] = []
        list = res.data

        resolve(list)
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  postGuessData(guessData: Object) {
    return new Promise<Education[]>((resolve, reject) => {
      http.post("/guess/", guessData).then((res) => {
        resolve()
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  getEducations(q: string) {
    return new Promise<Education[]>((resolve, reject) => {
      http.get("/educations/", {params: {q: q}}).then((res) => {
        let list:Education[] = []
        list = res.data

        resolve(list)
      }).catch((reason) => {
        reject(reason);
      });
    });
  }
}

export default new EdufinderDataService();