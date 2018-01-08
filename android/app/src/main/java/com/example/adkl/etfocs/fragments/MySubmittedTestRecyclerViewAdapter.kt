package com.example.adkl.etfocs.fragments

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.SubmittedTestDTO


class MySubmittedTestRecyclerViewAdapter(private val mValues: List<SubmittedTestDTO>) : RecyclerView.Adapter<MySubmittedTestRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.fragment_submittedtest, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.mItem = mValues[position]
        holder.mTitleView.text = mValues[position].title
        holder.mSubjectView.text = "Subject: " + mValues[position].subject
        holder.mPointsSumView.text = "Points: " + (mValues[position].points_sum?.toString() ?: "-")
    }

    override fun getItemCount(): Int {
        return mValues.size
    }

    inner class ViewHolder(val mView: View) : RecyclerView.ViewHolder(mView) {
        val mTitleView: TextView = mView.findViewById<TextView>(R.id.title)
        val mSubjectView: TextView = mView.findViewById<TextView>(R.id.subject)
        val mPointsSumView: TextView = mView.findViewById<TextView>(R.id.pointsSum)
        var mItem: SubmittedTestDTO? = null


        override fun toString(): String {
            return super.toString() + " '" + mTitleView.text + "'"
        }
    }
}
