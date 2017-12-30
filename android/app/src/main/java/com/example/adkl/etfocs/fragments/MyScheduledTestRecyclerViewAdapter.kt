package com.example.adkl.etfocs.fragments

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.ScheduledTestDTO

import com.example.adkl.etfocs.fragments.ScheduledTestFragment.OnListFragmentInteractionListener
import com.example.adkl.etfocs.fragments.dummy.DummyContent.DummyItem
import org.w3c.dom.Text

/**
 * [RecyclerView.Adapter] that can display a [ScheduledTestDTO] and makes a call to the
 * specified [OnListFragmentInteractionListener].
 * TODO: Replace the implementation with code for your data type.
 */
class MyScheduledTestRecyclerViewAdapter(private val mValues: List<ScheduledTestDTO>, private val mListener: OnListFragmentInteractionListener?) : RecyclerView.Adapter<MyScheduledTestRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.fragment_scheduledtest, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.mItem = mValues[position]
        holder.mIdView.text = mValues[position].id.toString()
        holder.mContentView.text = mValues[position].title

        holder.mView.setOnClickListener {
            mListener?.onListFragmentInteraction(holder.mItem!!)
        }
    }

    override fun getItemCount(): Int {
        return mValues.size
    }

    inner class ViewHolder(val mView: View) : RecyclerView.ViewHolder(mView) {
        val mIdView: TextView
        val mContentView: TextView
        var mItem: ScheduledTestDTO? = null

        init {
            mIdView = mView.findViewById<TextView>(R.id.id)
            mContentView = mView.findViewById<TextView>(R.id.content)
        }

        override fun toString(): String {
            return super.toString() + " '" + mContentView.text + "'"
        }
    }
}
