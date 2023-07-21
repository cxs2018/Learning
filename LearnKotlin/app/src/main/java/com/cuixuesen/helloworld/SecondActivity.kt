package com.cuixuesen.helloworld

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button

class SecondActivity : AppCompatActivity() {
    val TAG = "SecondActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second)

        val extraData = intent.getStringExtra("extra_data")
        Log.d(TAG, "onCreate: extra_data is $extraData")

        val button2: Button = findViewById(R.id.button2)
        button2.setOnClickListener {
            val intent = Intent()
            intent.putExtra("data_return", "Hello FirstActivity")
            setResult(RESULT_OK, intent)
            finish()
        }
    }

    override fun onBackPressed() {
//        super.onBackPressed()
        val intent = Intent()
        intent.putExtra("data_return", "Hello FirstActivity")
        setResult(RESULT_OK, intent)
        finish()
    }

    companion object {
        @JvmStatic
        fun actionStart(context: Context, data1: String, data2: String) {
            val intent = Intent(context, SecondActivity::class.java).apply {
                putExtra("param1", data1);
                putExtra("param2", data2);
            }
            context.startActivity(intent)
        }
    }
}