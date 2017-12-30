package com.example.adkl.etfocs;

/**
 * Created by adkl on 12/24/17.
 */

public class Routes {
    public static String BASE_URL(String ip_address) {
        return "http://" + "192.168.0.14" + ":8000";
    }
    public final static String LOGIN_ROUTE = "/api-token-auth/";
    public final static String SCHEDULED_TESTS = "/api/scheduled-tests/available-tests/";
    public final static String SCHEDULED_TEST_DETAILS = "/api/scheduled-tests/{id}/";
}
