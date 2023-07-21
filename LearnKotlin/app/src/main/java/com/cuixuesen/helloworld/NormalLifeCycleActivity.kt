package com.cuixuesen.helloworld

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class NormalLifeCycleActivity: AppCompatActivity() {
    private val TAG = "NormalLifeCycleActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate: ")
        setContentView(R.layout.activity_lifecycle_normal)
    }
}