package com.cuixuesen.helloworld

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.Toast
import com.cuixuesen.helloworld.ui.UIBestPracticeActivity

class MainActivity : AppCompatActivity() {
    val TAG = MainActivity::class.simpleName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d(TAG, "onCreate: " + this.toString())
        val button1: Button = findViewById(R.id.button1)
        button1.setOnClickListener {
//            Toast.makeText(this, "You clicked Button1", Toast.LENGTH_LONG).show()
//            finish()
//            val data = "Hello SecondActivity"
            val intent = Intent(this, SecondActivity::class.java)
//            intent.putExtra("extra_data", data)
//            val intent = Intent("com.cuixuesen.helloworld.ACTION_START")
//            intent.addCategory("com.cuixuesen.helloworld.MY_CATEGORY")
//            val intent = Intent(Intent.ACTION_VIEW)
//            intent.data = Uri.parse("https://www.baidu.com")
//            val intent = Intent(Intent.ACTION_DIAL)
//            intent.data = Uri.parse("tel:10086")
//            startActivity(intent)

            startActivityForResult(intent, 1)
        }

        val startLifeCycleActivity: Button = findViewById(R.id.startLifeCycleActivity);
        startLifeCycleActivity.setOnClickListener {
            val intent = Intent(this, LifeCycleActivity::class.java)
            startActivity(intent)
        }

        val launchMode: Button = findViewById(R.id.launchModeSelf)
        launchMode.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        val uicomponent: Button = findViewById(R.id.uicomponent)
        uicomponent.setOnClickListener {
            val intent = Intent(this, UIComponentActivity::class.java)
            startActivity(intent)
        }

        val learnLayout: Button = findViewById(R.id.learnLayout)
        learnLayout.setOnClickListener {
//            val intent = Intent(this, LayoutActivity::class.java)
//            val intent = Intent(this, ListViewActivity::class.java)
//            val intent = Intent(this, RecyclerViewActivity::class.java)
            val intent = Intent(this, UIBestPracticeActivity::class.java)
            startActivity(intent)
        }

        supportActionBar?.hide()
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true;
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.add_item -> Toast.makeText(this, "You clicked Add", Toast.LENGTH_SHORT).show()
            R.id.remove_item -> Toast.makeText(this, "You clicked Remove", Toast.LENGTH_SHORT).show()
        }
        return true
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when(requestCode) {
            1 -> if (resultCode == RESULT_OK) {
                val returnedData = data?.getStringExtra("data_return")
                Log.d(TAG, "onActivityResult: returned data is $returnedData")
            }
        }
    }

    override fun onResume() {
        super.onResume()
    }
}