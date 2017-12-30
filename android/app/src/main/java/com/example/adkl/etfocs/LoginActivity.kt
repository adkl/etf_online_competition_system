package com.example.adkl.etfocs

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.annotation.TargetApi
import android.content.pm.PackageManager
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import android.app.LoaderManager.LoaderCallbacks
import android.content.CursorLoader
import android.content.Intent
import android.content.Loader
import android.database.Cursor
import android.net.Uri
import android.os.AsyncTask
import android.os.Build
import android.os.Bundle
import android.provider.ContactsContract
import android.text.TextUtils
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.ArrayAdapter
import android.widget.TextView

import java.util.ArrayList

import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection

/**
 * A login screen that offers login via email/password.
 */
class LoginActivity : AppCompatActivity() {
    /**
     * Keep track of the login task to ensure we can cancel it if requested.
     */
    private var mAuthTask: UserLoginTask? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        // Set up the login form.

        password.setOnEditorActionListener(TextView.OnEditorActionListener { _, id, _ ->
            if (id == EditorInfo.IME_ACTION_DONE || id == EditorInfo.IME_NULL) {
                attemptLogin()
                return@OnEditorActionListener true
            }
            false
        })

        email_sign_in_button.setOnClickListener { attemptLogin() }
    }


    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private fun attemptLogin() {
        if (mAuthTask != null) {
            return
        }

        // Reset errors.
        username.error = null
        password.error = null

        // Store values at the time of the login attempt.
        val emailStr = username.text.toString()
        val passwordStr = password.text.toString()

        var cancel = false
        var focusView: View? = null

        // Check for a valid password, if the user entered one.
        if (!TextUtils.isEmpty(passwordStr) && !isPasswordValid(passwordStr)) {
            password.error = getString(R.string.error_invalid_password)
            focusView = password
            cancel = true
        }

        // Check for a valid email address.
        if (TextUtils.isEmpty(emailStr)) {
            username.error = getString(R.string.error_field_required)
            focusView = username
            cancel = true
        } else if (!isEmailValid(emailStr)) {
            username.error = getString(R.string.error_invalid_email)
            focusView = username
            cancel = true
        }

        if (cancel) {
            // There was an error; don't attempt login and focus the first
            // form field with an error.
            focusView?.requestFocus()
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user login attempt.
            showProgress(true)
            mAuthTask = UserLoginTask(this, emailStr, passwordStr, ipAddress.text.toString())
            mAuthTask!!.execute(null as Void?)
        }
    }

    fun onSuccessfulLoginResponse(token: String) {
        Utils.setSharedPreferencesEntry("token", token, this)
        val intent = Intent(this, MainActivity::class.java)
        this.startActivity(intent)
        this.finish()
    }

    private fun isEmailValid(email: String): Boolean {
        //TODO: Replace this with your own logic
        return true
    }

    private fun isPasswordValid(password: String): Boolean {
        //TODO: Replace this with your own logic
        return password.length > 4
    }

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private fun showProgress(show: Boolean) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            val shortAnimTime = resources.getInteger(android.R.integer.config_shortAnimTime).toLong()

            login_form.visibility = if (show) View.GONE else View.VISIBLE
            login_form.animate()
                    .setDuration(shortAnimTime)
                    .alpha((if (show) 0 else 1).toFloat())
                    .setListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator) {
                            login_form.visibility = if (show) View.GONE else View.VISIBLE
                        }
                    })

            login_progress.visibility = if (show) View.VISIBLE else View.GONE
            login_progress.animate()
                    .setDuration(shortAnimTime)
                    .alpha((if (show) 1 else 0).toFloat())
                    .setListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator) {
                            login_progress.visibility = if (show) View.VISIBLE else View.GONE
                        }
                    })
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            login_progress.visibility = if (show) View.VISIBLE else View.GONE
            login_form.visibility = if (show) View.GONE else View.VISIBLE
        }
    }


    /**
     * Represents an asynchronous login/registration task used to authenticate
     * the user.
     */
    inner class UserLoginTask internal constructor(
            private val mCaller: LoginActivity,
            private val mUsername: String,
            private val mPassword: String,
            private val mIpAddress: String) : AsyncTask<Void, Void, String>() {

        override fun doInBackground(vararg params: Void): String? {

            try {
                val url = URL(Routes.BASE_URL(mIpAddress) + Routes.LOGIN_ROUTE)
                val connection = url.openConnection() as HttpURLConnection

                connection.doOutput = true
                connection.doInput = true
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json;")
                connection.setRequestProperty("Accept", "application/json")

                val body = JSONObject()
                body.put("username", mUsername)
                body.put("password", mPassword)

                val writer = OutputStreamWriter(connection.outputStream)
                writer.write(body.toString())
                writer.flush()
                writer.close()



                val status = connection.responseCode
                if (status == 200) {
                    val bufferedReader = BufferedReader(InputStreamReader(connection.inputStream))
                    val stringBuilder = StringBuilder()
                    var line = bufferedReader.readLine()
                    while (line != null) {
                        stringBuilder.append(line)
                        line = bufferedReader.readLine()
                    }
                    bufferedReader.close()
                    val tokenResponse = JSONObject(stringBuilder.toString())
                    val token = tokenResponse.getString("token")
                    return token
                }
                else {
                    return null
                }


            } catch (e: InterruptedException) {
                return null
            }

        }

        override fun onPostExecute(token: String?) {
            mAuthTask = null
            showProgress(false)

            if (token != null) {
                mCaller.onSuccessfulLoginResponse(token)

            } else {
                password.error = getString(R.string.error_incorrect_password)
                password.requestFocus()
            }
        }

        override fun onCancelled() {
            mAuthTask = null
            showProgress(false)
        }
    }

}
