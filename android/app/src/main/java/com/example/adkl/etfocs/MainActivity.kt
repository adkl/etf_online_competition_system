package com.example.adkl.etfocs

import android.app.Fragment
import android.content.Intent
import android.os.Bundle
import android.support.design.widget.NavigationView
import android.support.v4.view.GravityCompat
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.view.MenuItem
import com.example.adkl.etfocs.dto.ScheduledTestDTO
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO
import com.example.adkl.etfocs.fragments.ScheduledTestsFragment
import com.example.adkl.etfocs.fragments.SubmittedTestsFragment
import com.example.adkl.etfocs.fragments.TakeTestFragment
import com.example.adkl.etfocs.rest.RESTClient
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.app_bar_main.*
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity :
        AppCompatActivity(),
        NavigationView.OnNavigationItemSelectedListener,
        ScheduledTestsFragment.OnListFragmentInteractionListener,
        TakeTestFragment.OnListFragmentInteractionListener {
    override fun onListFragmentInteraction(item: ScheduledTestDetailsDTO.QuestionDTO) {
        return
    }

    override fun onListFragmentInteraction(item: ScheduledTestDTO) {
        val restClient = RESTClient(this)
        restClient.getScheduledTestDetails(item.id).enqueue(object: Callback<ScheduledTestDetailsDTO> {
            override fun onResponse(call: Call<ScheduledTestDetailsDTO>?, response: Response<ScheduledTestDetailsDTO>?) {
                if (response!!.code() == 200) {
                    val test = response!!.body()!!
                    fragmentManager.beginTransaction()
                            .replace(R.id.main_frame, TakeTestFragment.newInstance(1, test))
                            .addToBackStack("scheduled_test_details")
                            .commit()
                }
                else {
                    AlertDialog.Builder(this@MainActivity)
                            .setTitle("Response error")
                            .setMessage(JSONObject(response!!.errorBody()!!.string()).getString("error"))
                            .show()
                }
            }
            override fun onFailure(call: Call<ScheduledTestDetailsDTO>?, t: Throwable?) {
                // jbg();
                return
            }
        })

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        val toggle = ActionBarDrawerToggle(
                this, drawer_layout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close)
        drawer_layout.addDrawerListener(toggle)
        toggle.syncState()

        nav_view.setNavigationItemSelectedListener(this)

        // set default menu item
        onNavigationItemSelected(nav_view.menu.findItem(R.id.nav_available_tests))
        nav_view.menu.findItem(R.id.nav_available_tests).isChecked = true
    }

    override fun onBackPressed() {
        if (drawer_layout.isDrawerOpen(GravityCompat.START)) {
            drawer_layout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        // Handle navigation view item clicks here.
        var fragment: Fragment?
        when (item.itemId) {
            R.id.nav_available_tests -> {
                fragment = ScheduledTestsFragment()
            }
            R.id.nav_submitted_tests -> {
                fragment = SubmittedTestsFragment()
            }
            R.id.nav_about -> {
                AlertDialog.Builder(this)
                        .setTitle("About")
                        .setMessage("Adnan Alibegovic | Anisa Hadzibulic | Edin Ceric")
                        .show()
                return false
            }
            R.id.nav_logout -> {
                val intent = Intent(this, LoginActivity::class.java)
                this.startActivity(intent)
                this.finish()
                Utils.deleteSharedPreferencesEntry("token", this)
                return false
            }
            else -> {
                return false
            }
        }
        fragmentManager.beginTransaction()
                .replace(R.id.main_frame, fragment)
                .commit()

        drawer_layout.closeDrawer(GravityCompat.START)
        return true
    }
}
