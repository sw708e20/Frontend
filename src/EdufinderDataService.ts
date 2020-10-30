import http from "./http-common";
import { Question, Education } from "./QuestionManager";

// Class for communicating with the backend service
// Communication is facilitated used HTTP GET and POST requests
class EdufinderDataService {

  getFirstQuestion() : Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      http.get("/question/").then((res) => {
        resolve(new Question(res.data.id, res.data.question));
      }).catch((res) => {
        reject(res);
      });
    });
  }

  getNextQuestion(answers: Object) : Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      http.post("/question/", answers).then((res) => {
        resolve(new Question(res.data.id, res.data.question));
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  getRecommendations(answers: Object) : Promise<Education[]> {
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

}

export default new EdufinderDataService();