package com.example.adkl.etfocs.rest;

import com.example.adkl.etfocs.dto.ScheduledTestDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

/**
 * Created by adkl on 12/30/17.
 */

public interface IRESTService {
    @GET("nez")
    Call<List<ScheduledTestDTO>> scheduledTests(@Header("Authorization") String authorization);
}