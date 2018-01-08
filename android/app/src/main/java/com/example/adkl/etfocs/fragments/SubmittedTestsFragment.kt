package com.example.adkl.etfocs.fragments

import android.content.Context
import android.os.Bundle
import android.app.Fragment
import android.support.v7.widget.GridLayoutManager
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.SubmittedTestDTO
import com.example.adkl.etfocs.rest.RESTClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


/**
 * Mandatory empty constructor for the fragment manager to instantiate the
 * fragment (e.g. upon screen orientation changes).
 */
class SubmittedTestsFragment : Fragment() {
    // TODO: Customize parameters
    private var mColumnCount = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (arguments != null) {
            mColumnCount = arguments.getInt(ARG_COLUMN_COUNT)
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_submittedtest_list, container, false)

        // Set the adapter
        if (view is RecyclerView) {
            val context = view.getContext()
            if (mColumnCount <= 1) {
                view.layoutManager = LinearLayoutManager(context)
            } else {
                view.layoutManager = GridLayoutManager(context, mColumnCount)
            }
            val restClient = RESTClient(activity)
            restClient.submittedTest.enqueue(object: Callback<List<SubmittedTestDTO>> {
                override fun onResponse(call: Call<List<SubmittedTestDTO>>?, response: Response<List<SubmittedTestDTO>>?) {
                    if (response!!.code() == 200) {
                        view.adapter = MySubmittedTestRecyclerViewAdapter(response!!.body()!!)
                    }
                }
                override fun onFailure(call: Call<List<SubmittedTestDTO>>?, t: Throwable?) {
                    return
                }

            })
        }
        return view
    }


    companion object {

        // TODO: Customize parameter argument names
        private val ARG_COLUMN_COUNT = "column-count"

        // TODO: Customize parameter initialization
        fun newInstance(columnCount: Int): SubmittedTestsFragment {
            val fragment = SubmittedTestsFragment()
            val args = Bundle()
            args.putInt(ARG_COLUMN_COUNT, columnCount)
            fragment.arguments = args
            return fragment
        }
    }
}
