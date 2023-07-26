package com.cuixuesen.helloworld.fragment

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import androidx.fragment.app.Fragment
import com.cuixuesen.helloworld.R

class FragmentMainActivity : AppCompatActivity() {
    private lateinit var button: Button
    private lateinit var fragment: Fragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fragment_main)

//        fragment = supportFragmentManager.findFragmentById(R.id.leftFrag) as LeftFragment
//
//        button = findViewById(R.id.button)
//        button.setOnClickListener {
//            replaceFragment(AnotherRightFragment())
//        }
//        replaceFragment(RightFragment())
    }
//
//    private fun replaceFragment(fragment: Fragment) {
//        val fragmentManager = supportFragmentManager
//        val transaction = fragmentManager.beginTransaction()
//        transaction.replace(R.id.rightLayout, fragment)
//        transaction.addToBackStack(null)
//        transaction.commit()
//    }
}