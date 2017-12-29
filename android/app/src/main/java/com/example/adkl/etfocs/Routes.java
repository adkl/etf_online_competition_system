package com.example.adkl.etfocs;

/**
 * Created by adkl on 12/24/17.
 */

public class Routes {
    public final static String LOGIN_ROUTE = "/api-token-auth/";

    public static String BASE_URL(String ip_address) {
        return "http://" + "192.168.0.14" + ":8000";
    }
}
