import http from "./http-common";

class EdufinderDataService {
  getFirstQuestion() {
    return http.get("/question/");
  }

  getNextQuestion(answers: Object) {
    return http.post("/question/", answers);
  }

  getRecommendations(answers: Object) {
    return http.post("/recommend/", answers)
  }

}

export default new EdufinderDataService();