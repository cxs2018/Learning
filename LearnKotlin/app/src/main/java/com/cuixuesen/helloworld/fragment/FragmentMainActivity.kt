package com.cuixuesen.helloworld.fragment

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import com.cuixuesen.helloworld.R
import com.cuixuesen.helloworld.databinding.ActivityFragmentMainBinding

class FragmentMainActivity : AppCompatActivity() {
    private val TAG = "FragmentMainActivity"
    private lateinit var button: Button
    private lateinit var fragment: Fragment

    private lateinit var binding: ActivityFragmentMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_fragment_main)

        binding = ActivityFragmentMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        var newsTitleRecyclerView = binding.newsTitleLayout?.findViewById<RecyclerView>(R.id.newsTitleRecyclerView)

        Log.d(TAG, "onCreate: " + newsTitleRecyclerView)

//        fragment = supportFragmentManager.findFragmentById(R.id.leftFrag) as LeftFragment
//
//        button = findViewById(R.id.button)
//        button.setOnClickListener {
//            replaceFragment(AnotherRightFragment())
//        }
//        replaceFragment(RightFragment())
    }

//    private fun replaceFragment(fragment: Fragment) {
//        val fragmentManager = supportFragmentManager
//        val transaction = fragmentManager.beginTransaction()
//        transaction.replace(R.id.rightLayout, fragment)
//        transaction.addToBackStack(null)
//        transaction.commit()
//    }
}