package com.example.adkl.etfocs.fragments

import android.support.v7.widget.LinearLayoutCompat
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO

import com.example.adkl.etfocs.fragments.TakeTestFragment.OnListFragmentInteractionListener


class MyTakeTestRecyclerViewAdapter(
        private val mValues: List<ScheduledTestDetailsDTO.QuestionDTO>,
        private val mListener: OnListFragmentInteractionListener?) : RecyclerView.Adapter<MyTakeTestRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return if (viewType == 1) {
            val view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.fragment_taketest_question_type_text, parent, false)
            TextViewHolder(view)
        }
        else {
            val view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.fragment_taketest_question_type_single_choice, parent, false)
            ChoiceViewHolder(view)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return mValues[position].question_type
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.mItem = mValues[position]

        holder.mView.setOnClickListener {
            mListener?.onListFragmentInteraction(holder.mItem!!)
        }

        if (holder is TextViewHolder) {
            val textViewHolder = holder as TextViewHolder
            textViewHolder.mQuestionTextView.text = holder.mItem!!.text
            textViewHolder.setListeners()
        }
        else if (holder is ChoiceViewHolder) {
            val choiceViewHolder = holder as ChoiceViewHolder
            choiceViewHolder.mQuestionTextView.text = holder.mItem!!.text
            choiceViewHolder.updateChilds()
        }
    }

    override fun getItemCount(): Int {
        return mValues.size
    }

    inner class ChoiceViewHolder(override val mView: View) : MyTakeTestRecyclerViewAdapter.ViewHolder(mView) {
        val mQuestionTextView: TextView = mView.findViewById<TextView>(R.id.question_textView)

        fun updateChilds() {
            val parent = (mView as LinearLayoutCompat)
            // remove all checkboxes
            for (index: Int in 0 until parent.childCount) {
                var child = parent.getChildAt(index)
                if (child is CheckBox) {
                    parent.removeView(child)
                }
            }
            // add new checkboxes
            for (predefined_answer in mItem!!.predefined_answers) {
                var checkBox = CheckBox(mView.context)
                checkBox.text = predefined_answer.text
                checkBox.tag = "cb"
                checkBox.setOnCheckedChangeListener { _, isChecked -> predefined_answer.selected = isChecked }
                parent.addView(checkBox)
            }

        }

    }

    inner class TextViewHolder(override val mView: View): MyTakeTestRecyclerViewAdapter.ViewHolder(mView) {
        val mQuestionTextView: TextView = mView.findViewById<TextView>(R.id.question_textView)
        val mTextEdit: EditText = mView.findViewById<EditText>(R.id.answer_editText)

        fun setListeners() {
            mTextEdit.addTextChangedListener(object: TextWatcher {
                override fun afterTextChanged(s: Editable?) {
                    return
                }
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                    return
                }

                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    mItem!!.user_answer = s.toString()
                }

            })
        }
    }

    open inner class ViewHolder(open val mView: View) : RecyclerView.ViewHolder(mView) {

        var mItem: ScheduledTestDetailsDTO.QuestionDTO? = null

        init {

        }

        override fun toString(): String {
            return super.toString() + " '" + "nezz" + "'"
        }
    }
}
