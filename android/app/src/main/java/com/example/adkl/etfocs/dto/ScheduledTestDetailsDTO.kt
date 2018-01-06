package com.example.adkl.etfocs.dto

import junit.framework.Test
import java.io.Serializable
import java.util.*

/**
 * Created by adkl on 12/30/17.
 */
class ScheduledTestDetailsDTO constructor(
        val id: Int,
        val title: String,
        val start: Date,
        val duration: Float,
        val test_setup: TestSetupDTO
) : Serializable {
    inner class TestSetupDTO constructor(
            val id: Int,
            val questions: List<QuestionDTO>,
            val title: String
    ) : Serializable
    inner class QuestionDTO constructor(
            val id: Int,
            val text: String,
            val question_type: Int,
            val predefined_answers: List<PredefinedAnswerDTO>,
            var user_answer: String
    ) : Serializable
    inner class PredefinedAnswerDTO constructor(
            val id: Int,
            val text: String,
            var selected: Boolean
    ) : Serializable
}