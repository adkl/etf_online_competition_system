package com.example.adkl.etfocs.rest;

import com.example.adkl.etfocs.Routes;
import com.example.adkl.etfocs.dto.ScheduledTestDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.Retrofit;

public class RESTClient {

    private IRESTService mService;
    private String mToken;

    public RESTClient(String token) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Routes.BASE_URL(""))
                .build();

        mService = retrofit.create(IRESTService.class);
        mToken = token;
    }

    public Call<List<ScheduledTestDTO>> getScheduledTest() {
        return mService.scheduledTests("JWT " + mToken);
    }
}