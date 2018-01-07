package com.example.adkl.etfocs.fragments

import android.content.Context
import android.os.Bundle
import android.app.Fragment
import android.content.DialogInterface
import android.support.v7.app.AlertDialog
import android.support.v7.widget.GridLayoutManager
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import com.example.adkl.etfocs.MainActivity

import com.example.adkl.etfocs.R
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO
import com.example.adkl.etfocs.dto.SubmitTestDTO
import com.example.adkl.etfocs.rest.RESTClient
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.fragment_taketest_main.*
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * A fragment representing a list of Items.
 *
 *
 * Activities containing this fragment MUST implement the [OnListFragmentInteractionListener]
 * interface.
 */
/**
 * Mandatory empty constructor for the fragment manager to instantiate the
 * fragment (e.g. upon screen orientation changes).
 */
class TakeTestFragment : Fragment() {
    // TODO: Customize parameters
    private var mColumnCount = 1
    private var mTest: ScheduledTestDetailsDTO? = null
    private var mListener: OnListFragmentInteractionListener? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (arguments != null) {
            mColumnCount = arguments.getInt(ARG_COLUMN_COUNT)
            mTest = arguments.getSerializable(ARG_TEST) as ScheduledTestDetailsDTO
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_taketest_main, container, false)


        val recycler = view.findViewById<RecyclerView>(R.id.questions_recyclerView)
        recycler.adapter = MyTakeTestRecyclerViewAdapter(mTest!!.test_setup.questions, mListener)

        val submitButton = view.findViewById<Button>(R.id.test_submit_btn)
        submitButton.setOnClickListener(object: View.OnClickListener {
            override fun onClick(v: View?) {
                submitTest(mTest!!)
            }

        })
        return view
    }

    fun submitTest(test: ScheduledTestDetailsDTO) {
        // reformat to SubmitTestDTO
        val restClient = RESTClient(activity)
        restClient.submitTest(SubmitTestDTO(test))
                .enqueue(object: Callback<Void> {
                    override fun onResponse(call: Call<Void>?, response: Response<Void>?) {
                        if (response!!.code() == 201) {
                            AlertDialog.Builder(activity)
                                    .setTitle("Success!")
                                    .setCancelable(false)
                                    .setPositiveButton("Go back!", { _: DialogInterface, _: Int ->
                                        (activity as MainActivity).onNavigationItemSelected(activity.nav_view.menu.findItem(R.id.nav_available_tests))
                                    })
                                    .show()


                        }
                        else {
                            AlertDialog.Builder(activity)
                                    .setTitle("Response error")
                                    .setMessage("Unknown error")
                                    .show()
                        }
                    }

                    override fun onFailure(call: Call<Void>?, t: Throwable?) {
                        return
                    }
                } )

    }


    override fun onAttach(context: Context) {
        super.onAttach(context)
        if (context is OnListFragmentInteractionListener) {
            mListener = context
        } else {
            throw RuntimeException(context.toString() + " must implement OnListFragmentInteractionListener")
        }
    }

    override fun onDetach() {
        super.onDetach()
        mListener = null
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     *
     *
     * See the Android Training lesson [Communicating with Other Fragments](http://developer.android.com/training/basics/fragments/communicating.html) for more information.
     */
    interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        fun onListFragmentInteraction(question: ScheduledTestDetailsDTO.QuestionDTO)
    }

    companion object {

        // TODO: Customize parameter argument names
        private val ARG_COLUMN_COUNT = "column-count"
        private val ARG_TEST = "test"

        // TODO: Customize parameter initialization
        fun newInstance(columnCount: Int, test: ScheduledTestDetailsDTO): TakeTestFragment {
            val fragment = TakeTestFragment()
            val args = Bundle()
            args.putInt(ARG_COLUMN_COUNT, columnCount)
            args.putSerializable(ARG_TEST, test)
            fragment.arguments = args
            return fragment
        }
    }
}
