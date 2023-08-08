package com.cuixuesen.helloworld.broadcast

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import com.cuixuesen.helloworld.R

class BroadcastMainActivity : BaseActivity() {
    lateinit var timeChangeReceiver: TimeChangeReceiver

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_broadcast_main)
        val intentFilter = IntentFilter()
        intentFilter.addAction("android.intent.action.TIME_TICK")
        timeChangeReceiver = TimeChangeReceiver()
        registerReceiver(timeChangeReceiver, intentFilter)

        val forceOffline: Button = findViewById(R.id.forceOffline)
        forceOffline.setOnClickListener {
            val intent = Intent("com.cuixuesen.helloworld.FORCE_OFFLINE")
            sendBroadcast(intent)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(timeChangeReceiver)
    }

    inner class TimeChangeReceiver: BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            Toast.makeText(context, "Time has changed", Toast.LENGTH_SHORT).show()
        }
    }
}