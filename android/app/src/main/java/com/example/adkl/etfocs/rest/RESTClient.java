package com.example.adkl.etfocs.rest;

import android.content.Context;

import com.example.adkl.etfocs.Routes;
import com.example.adkl.etfocs.Utils;
import com.example.adkl.etfocs.dto.ScheduledTestDTO;
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO;

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
}