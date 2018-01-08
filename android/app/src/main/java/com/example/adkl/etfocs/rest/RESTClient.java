package com.example.adkl.etfocs.rest;

import android.content.Context;

import com.example.adkl.etfocs.Routes;
import com.example.adkl.etfocs.Utils;
import com.example.adkl.etfocs.dto.ScheduledTestDTO;
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO;
import com.example.adkl.etfocs.dto.SubmitTestDTO;
import com.example.adkl.etfocs.dto.SubmittedTestDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RESTClient {

    private IRESTService mService;
    private String mToken;

    public RESTClient(Context context) {
        Retrofit retrofit = new Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(Routes.BASE_URL(""))
                .build();

        mService = retrofit.create(IRESTService.class);
        mToken = "JWT " + Utils.getSharedPreferencesEntry("token", context);
    }

    public Call<List<ScheduledTestDTO>> getScheduledTests() {
        return mService.scheduledTests(mToken);
    }

    public Call<ScheduledTestDetailsDTO> getScheduledTestDetails(Integer id) {
        return mService.scheduledTestDetails(mToken, id);
    }

    public Call<List<SubmittedTestDTO>> getSubmittedTest() {
        return mService.submittedTests(mToken);
    }

    public Call<Void> submitTest(SubmitTestDTO test) {
        return mService.submitTest(mToken, test);
    }
}