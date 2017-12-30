package com.example.adkl.etfocs.rest;

import com.example.adkl.etfocs.Routes;
import com.example.adkl.etfocs.dto.ScheduledTestDTO;
import com.example.adkl.etfocs.dto.ScheduledTestDetailsDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

/**
 * Created by adkl on 12/30/17.
 */

public interface IRESTService {
    @GET(Routes.SCHEDULED_TESTS)
    Call<List<ScheduledTestDTO>> scheduledTests(@Header("Authorization") String authorization);
    @GET(Routes.SCHEDULED_TEST_DETAILS)
    Call<ScheduledTestDetailsDTO> scheduledTestDetails(@Header("Authorization") String authorization, @Path("id") int id);
}