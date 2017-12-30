package com.example.adkl.etfocs;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by adkl on 12/30/17.
 */

public class Utils {
    private static final String SHARED_PREFERENCES = "etfocssharedprefs";

    public static String getSharedPreferencesEntry(String key, Context context) {
        SharedPreferences preferences = context.getApplicationContext()
                .getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);
        return preferences.getString(key, null);
    }
    public static void setSharedPreferencesEntry(String key, String value, Context context) {
        SharedPreferences preferences = context.getApplicationContext()
                .getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(key, value);
        editor.apply();
    }
    public static void deleteSharedPreferencesEntry(String key, Context context) {
        SharedPreferences preferences = context.getApplicationContext()
                .getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.remove(key);
        editor.apply();
    }
}
