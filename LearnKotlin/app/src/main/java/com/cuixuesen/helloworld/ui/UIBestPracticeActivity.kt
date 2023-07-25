package com.cuixuesen.helloworld.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.cuixuesen.helloworld.R

class UIBestPracticeActivity : AppCompatActivity(), View.OnClickListener {
    private val msgList = ArrayList<Msg>()

    private var adapter: MsgAdapter? = null

    private var send: Button? = null

    private var inputText: EditText? = null

    private lateinit var recyclerView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_uibest_practice)
        initMsg()
        val layoutManager = LinearLayoutManager(this)
        recyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = layoutManager
        adapter = MsgAdapter(msgList)
        recyclerView.adapter = adapter
        send = findViewById(R.id.send);
        send?.setOnClickListener(this)

        inputText = findViewById(R.id.inputText)
    }

    private fun initMsg() {
        val msg1 = Msg("Hello guy.", Msg.TYPE_RECEIVED)
        msgList.add(msg1)
        val msg2 = Msg("Hello. Who is that?", Msg.TYPE_SENT)
        msgList.add(msg2)
        val msg3 = Msg("This is Tom. Nice taking to you. ", Msg.TYPE_RECEIVED)
        msgList.add(msg3)
    }

    override fun onClick(v: View?) {
        when(v) {
            send -> {
                val content = inputText?.text.toString()
                if (content.isNotEmpty()) {
                    val msg = Msg(content, Msg.TYPE_SENT)
                    msgList.add(msg)
                    adapter?.notifyItemInserted(msgList.size - 1) // 当有新消息时，刷新RecyclerView中的显示
                    if (::recyclerView.isInitialized) {
                        recyclerView.scrollToPosition(msgList.size - 1) // 将RecyclerView定位到最后一行
                    }
                    inputText?.setText("") // 清空输入框中的内容
                }
            }
        }
    }
}