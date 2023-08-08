package com.cuixuesen.helloworld.broadcast

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.cuixuesen.helloworld.R

class LoginActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val login: Button = findViewById(R.id.login)
        val accountEdit: EditText = findViewById(R.id.accountEdit)
        val passwordEdit: EditText = findViewById(R.id.passwordEdit)
        login.setOnClickListener {
            val account = accountEdit.text.toString()
            val password = passwordEdit.text.toString()
            if (account == "admin" && password == "123456") {
                val intent = Intent(this, BroadcastMainActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "account or password is invalid", Toast.LENGTH_SHORT).show()
            }
        }
    }
}