package com.cuixuesen.helloworld.tools

import android.content.ComponentName
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.cuixuesen.helloworld.R

class GuideMIUISettingsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_guide_miuisettings)

        val openMIUISettingsActivity: Button = findViewById(R.id.openMIUIHideNavigationPage)
        openMIUISettingsActivity.setOnClickListener {
            val componentName = ComponentName("com.android.settings", "com.android.settings.SubSettings")
            val intent = Intent()
            intent.component = componentName
            intent.putExtra(":android:no_headers", true)
            intent.putExtra(":android:show_fragment", "com.android.settings.FullScreenDisplaySettings")
            startActivity(intent)
        }
    }
}