package com.cuixuesen.helloworld

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog

class UIComponentActivity : AppCompatActivity(), View.OnClickListener {
    var editText: EditText? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_uicomponent)

        val getEditTextButton: Button = findViewById(R.id.getEditText)
        getEditTextButton.setOnClickListener(this)

        editText = findViewById(R.id.editText)
    }

    override fun onClick(v: View?) {
        when(v?.id) {
            R.id.getEditText -> {
//                val inputText = editText?.text.toString();
//                Toast.makeText(this, inputText, Toast.LENGTH_SHORT).show()
                AlertDialog.Builder(this).apply {
                    setTitle("This is Dialog")
                    setMessage("Something important.")
                    setCancelable(false)
                    setPositiveButton("OK") {
                        dialog, which -> {}
                    }
                    setNegativeButton("Cancel") {
                        dialog, which -> {}
                    }
                    show()
                }
            }
        }
    }
}