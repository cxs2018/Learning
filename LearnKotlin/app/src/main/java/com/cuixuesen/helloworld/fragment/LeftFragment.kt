package com.cuixuesen.helloworld.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.cuixuesen.helloworld.R

class LeftFragment: Fragment(){
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        if (activity != null) {
            val mainActivity = activity as FragmentMainActivity
        }
        return inflater.inflate(R.layout.left_fragment, container, false)
    }
}