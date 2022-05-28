auto();
toast("开始运行，按音量下键结束运行")
function untilClick(view0) {
    let view = view0
    while (true) {
        if (view == null) break;
        if (view.clickable()) {
            view.click()
            break
        } else {
            view = view.parent()
        }
    }
}

function openXingChengCard() {
    launch("com.xingchengcode.android")
    waitForPackage("com.xingchengcode.android")
    textContains("您于前14天内到达或途经").findOne()
    takeScreenshot()
}

function openDingDing() {
    launch("com.alibaba.android.rimet")
    waitForPackage("com.alibaba.android.rimet")
    untilClick(text("工作通知:百色学院").findOne())
    textContains("百色学院的百色学院邀你填写").findOne()
    let listView = className("ListView").findOne()
    let view = listView.child(listView.childCount() - 1)
    view.findOne(text("开始填写")).click()
    text("百色学院疫情防控健康填报-学生版").findOne()

    for (let i = 0; i < 4; i++) {
        swipe(10, 1500, 10, 0, 100)
    }
    sleep(400)
    let viewList = text("请上传当日的通信行程卡截图").findOne()
        .parent().children()

    for (child of viewList) {
        if (child.clickable() &&
            child.className() == "android.widget.Image") {
            child.click()
            break
        }
    }

    text("所有图片").findOne()
    className("GridView").findOne().child(1).findOne(desc("未选中")).click()
    text("发送(1)").click()
    while (true) {
        text("获取").findOne().click()
        let isSuccess = text("地点微调").findOne(5000)
        if (isSuccess != null) {
            break
        }
        text("我知道了").findOne().click()
    }
    for (let i = 0; i < 3; i++) {
        swipe(10, 1500, 10, 0, 100)
    }
    sleep(300)
    text("提交").findOne().click()
    toast("完成")
}

function backToWechatLauncherUi() {
    while (currentActivity() != "com.tencent.mm.ui.LauncherUI" && text("发现").findOne(200) == null) {
        back()
        sleep(200)
    }
}

function openWechat() {
    launch("com.tencent.mm")
    waitForPackage("com.tencent.mm")
    backToWechatLauncherUi()
    waitForActivity("com.tencent.mm.ui.LauncherUI")
    untilClick(text("发现").findOne())
    untilClick(text("小程序").findOne(500))
    var button = text("通信行程卡").findOne(2000)
    if (button != null) {
        untilClick(button)
    } else {
        untilClick(desc("搜索").findOne())
        className("EditText").text("搜索").findOne().setText("通信行程卡")
        sleep(1000)
        untilClick(text("通信行程卡").findOne())
    }
    // untilClick(text("通信行程卡").findOne())
    text("同意并授权运营商查询本人在疫情期间14天内到访地信息").findOne()
    untilClick(className("RadioButton").findOne())
    sleep(500)
    untilClick(text("查 询").enabled(true).findOne())
    textContains("您于前14天内到达或途经").findOne()
    takeScreenshot()
}

//openXingChengCard()
openWechat()
sleep(2000)
//home()
//sleep(2000)
openDingDing()
