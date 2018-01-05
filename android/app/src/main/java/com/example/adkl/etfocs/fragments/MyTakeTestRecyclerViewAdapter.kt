package com.example.adkl.etfocs.fragments

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TextView
import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO

import com.example.adkl.etfocs.fragments.TakeTestFragment.OnListFragmentInteractionListener
import com.example.adkl.etfocs.fragments.dummy.DummyContent.DummyItem

/**
 * [RecyclerView.Adapter] that can display a [DummyItem] and makes a call to the
 * specified [OnListFragmentInteractionListener].
 * TODO: Replace the implementation with code for your data type.
 */
class MyTakeTestRecyclerViewAdapter(
        private val mValues: List<ScheduledTestDetailsDTO.QuestionDTO>,
        private val mListener: OnListFragmentInteractionListener?) : RecyclerView.Adapter<MyTakeTestRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        var layout: Int
        if (viewType == 1) {
            layout = R.layout.fragment_taketest_question_type_text
        }
        else {
            layout = R.layout.fragment_taketest_question_type_single_choice
        }


        val view = LayoutInflater.from(parent.context)
                .inflate(layout, parent, false)
        return ViewHolder(view)
    }

    override fun getItemViewType(position: Int): Int {
        return mValues[position].question_type
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.mItem = mValues[position]


        holder.mView.setOnClickListener {
            mListener?.onListFragmentInteraction(holder.mItem!!)
        }
    }

    override fun getItemCount(): Int {
        return mValues.size
    }

    inner class ViewHolder(val mView: View) : RecyclerView.ViewHolder(mView) {
        val mQuestionTextView: TextView
        val mTextEdit: EditText?
        var mItem: ScheduledTestDetailsDTO.QuestionDTO? = null

        init {
            mQuestionTextView = mView.findViewById<TextView>(R.id.question_textView)
            mTextEdit = mView.findViewById<EditText>(R.id.answer_editText)
        }

        override fun toString(): String {
            return super.toString() + " '" + "nezz" + "'"
        }
    }
}
