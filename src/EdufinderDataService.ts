import http from "./http-common";
import { Question, Education } from "./QuestionManager";

class EdufinderDataService {
  getFirstQuestion() {
    return new Promise<Question>((resolve, reject) => {
      http.get("/question/").then((res) => {
        resolve(new Question(res.data.id, res.data.question));
      }).catch((res) => {
        reject(res);
      });
    });
  }

  getNextQuestion(answers: Object) {
    return new Promise<Question>((resolve, reject) => {
      http.post("/question/", answers).then((res) => {
        resolve(new Question(res.data.id, res.data.question));
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

  getRecommendations(answers: Object) {
    return new Promise<Education[]>((resolve, reject) => {
      http.post("/recommend/", answers).then((res) => {
        console.log(res);
        resolve()
      }).catch((reason) => {
        reject(reason);
      });
    });
  }

}

export default new EdufinderDataService();