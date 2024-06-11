import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questons',
  templateUrl: './questons.component.html',
  styleUrl: './questons.component.css',
})
export class QuestonsComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  userAnswers: any = {};
  loading: boolean = true;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http.get(`${environment.apiUrl}/mock/getQuestions`).subscribe(
      (res: any) => {
        this.questions = res;
        this.loading = false;
      },
      (err) => {
        console.log('error', err);
        this.loading = false;
      }
    );
  }

  answerQuestion(option: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.userAnswers[currentQuestion.question_number] = option;
    if (option === currentQuestion.correct_answer) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = {};
  }
}
