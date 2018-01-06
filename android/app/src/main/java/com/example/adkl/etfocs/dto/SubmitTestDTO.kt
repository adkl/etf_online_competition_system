package com.example.adkl.etfocs.dto

/**
 * Created by adkl on 1/6/18.
 */
class SubmitTestDTO(
        var id: Int,
        var answers: Array<AnswerDTO>?
) {

    constructor(test: ScheduledTestDetailsDTO) : this(0, null) {
        this.id = test.id
        val questions = test.test_setup.questions


        this.answers = Array<AnswerDTO>(test.test_setup.questions.count(), {
            i: Int -> AnswerDTO(questions[i].id, questions[i].user_answer, ArrayList(0))
        })

        for (i in 0 until questions.count()) {
            if (questions[i].question_type == 2) {
                for (j in 0 until questions[i].predefined_answers.count()) {
                    if (questions[i].predefined_answers[j].selected) {
                        this.answers!![i].selected!!.add(questions[i].predefined_answers[j].id)
                    }
                }
            }
        }

    }

    inner class AnswerDTO(
            val id: Int?,
            val text: String?,
            val selected: ArrayList<Int>?
    )
}