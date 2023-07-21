package com.cuixuesen.helloworld

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class LifeCycleActivity: AppCompatActivity() {
    private val TAG = "LifeCycleActivity"

    // 加载布局、绑定事件
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate: ")
        setContentView(R.layout.activity_lifecycle)

        if (savedInstanceState != null) {
            val tempData = savedInstanceState.getString("data_key")
            Log.d(TAG, "onCreate: tempData is $tempData")
        }

        val button1: Button = findViewById(R.id.startNormalActivity)
        button1.setOnClickListener {
            val intent = Intent(this, NormalLifeCycleActivity::class.java)
            startActivity(intent)
        }

        val button2: Button = findViewById(R.id.startDialogActivity)
        button2.setOnClickListener {
            val intent = Intent(this, DialogLifeCycleActivity::class.java)
            startActivity(intent)
        }
    }

    // Activity由不可见变为可见的时候调用
    override fun onStart() {
        super.onStart()
        Log.d(TAG, "onStart: ")
    }

    // 在Activity准备好和用户进行交互的时候调用，此时Activity一定位于返回栈栈顶，并且处于运行状态
    override fun onResume() {
        super.onResume()
        Log.d(TAG, "onResume: ")
    }

    // 在系统准备去启动或者恢复另一个Activity的时候调用，将消耗CPU的资源释放掉，以及保存一些关键数据
    override fun onPause() {
        super.onPause()
        Log.d(TAG, "onPause: ")
    }

    // 在Activity完全不可见的时候调用
    override fun onStop() {
        super.onStop()
        Log.d(TAG, "onStop: ")
    }

    // Activity被销毁之前调用
    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "onDestroy: ")
    }

    // Activity由停止状态变为运行状态之前调用
    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "onRestart: ")
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        val tempData = "something you just typed"
        outState.putString("data_key", tempData)
    }
}