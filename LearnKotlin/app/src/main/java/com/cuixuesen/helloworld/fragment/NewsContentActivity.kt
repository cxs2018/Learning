package com.cuixuesen.helloworld.fragment

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.cuixuesen.helloworld.R

class NewsContentActivity : AppCompatActivity() {
    companion object {
        fun actionStart(context: Context, title: String, content: String) {
            val intent = Intent(context, NewsContentActivity::class.java).apply {
                putExtra("news_title", title)
                putExtra("news_content", content)
            }
            context.startActivity(intent)
        }
    }

    private lateinit var fragment: NewsContentFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_new_content)
        val title = intent.getStringExtra("news_title")
        val content = intent.getStringExtra("news_content")
        fragment =
            supportFragmentManager.findFragmentById(R.id.newsContentFrag) as NewsContentFragment
        if (title != null && content != null) {
            fragment.refresh(title, content)
        }
    }
}