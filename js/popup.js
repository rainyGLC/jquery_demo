const identification = {
  data:{
    userInfo:'',
    uname:"",//姓名katiao
    pic:"https://randomuser.me/api/portraits/men/10.jpg",//头像
    genderSex:'女',//
    gender:['男','女'],//性别
    // registerEmail:"",//邮件地址//kat.iao@ctigroup.hk
    // oldPassword:"",//旧密码//katiao123
    welcomeMessage:'',//欢迎信息
    isOk:true
  },
  init:function(){
    this.bind()
  },
  bind:function(){
    //弹出窗口
    $('#popup').on('click',this.showMask);
    //关闭窗口
    $('body').on('click','.container-close',this.removeMask);
    //性别下拉收起
    $('body').on('click','.sex-btn',this.toggleClass);
    //点击性别到input输入框中
    $('body').on('click','.sex-item',this.sexSelect);
    //点击去修改密码
    $('body').on('click','#update-btn',this.updataBtn);
    //原密码聚焦
    $('body').on('focus','.old-password',this.olderrRemove);
    //新密码聚焦
    $('body').on('focus','.new-password',this.newerrRemove);
    //确认密码聚焦
    $('body').on('focus','.con-password',this.conErrRemove);
    // 点击确定按钮修改信息
    $('body').on('click','#showSecTemplete',this.showSure);
    // $('body').on('click','#showSecTemplete',this.showSecondMask);
    //点击取消关闭
    $('body').on('click','.btn-cancel',this.btnCancel);
    // 点击按钮修改密码成功
    $('body').on('click','.btn-preve',this.btnSave);
    //点击按钮取消
    $('body').on('click','.btn-cance',this.showPreMask);
    //上传图片
    $('body').on('change','#file',this.uploadingChang)
  },
  showMask:function(){
    let html = `
      <div class="authentication-context">
        <div class="authentication-mask"></div>
        <div class="authentication-container"> 
        </div>
      </div>`;
      $('body').append(html);
      identification.showMaskoneHtml();
  },
  showMaskoneHtml:function(){
    $.ajax({
      url:'http://localhost:3001/name',
      dataType:'jsonp',
      type:"get",
       jsonp: "callback",
       jsonpCallback:"flightHandler",
      success:(data)=>{
        identification.data.userInfo = data.user;
      }
    })
    let genderHTML = identification.genderHTML();
    // let pic = identification.data.userInfo.avator;
    let userInfo = identification.data.userInfo;
    console.log(userInfo);
    let pic = userInfo.avator;
    identification.data.pic = pic;
    let registerEmail = userInfo.registerEmail;
    let uname = userInfo.email;
    identification.data.uname = uname;
    // let registerEmail = identification.data.registerEmail;
    // let genderSex = identification.data.genderSex;
    let genderSex = userInfo.genderSex;
    identification.data.genderSex = genderSex;
    let welcomeMessage = userInfo.welcomeMessage;
    identification.data.welcomeMessage = welcomeMessage;
    let html = `
      <div class="certificate-container-one">
        <div class="container-close"></div>
        <div class="certificate-one">
          <div class="certificate-member-one">
           
            <h2 class="certificate-title">修改个人信息
              <img src="src/img/nembers.png">
            </h2>
            <p class="certificate-desc">Modify personal authentication information
              <span class="number" id="update-btn">修改密码</span>
            </p>

          </div>
          <div class="certificate-message-one">
            <div class="certificate-avator">
              <div id="box">
                <input type="file" name="file" id="file" multiple="multiple" />
                <img src="${pic}" id="img">
              </div>
              <input class="nember-name" value="${uname}"></input>
            </div>
            <div class="certificate-from">
              <div class="from-one clearfix">
                <span class="sex">性别：</span>
                <div class="sex-container">
                  <a href="javascript:;" id="sex-select" type="text" name = "sex">
                    ${genderSex}
                    <a class="sex-btn" href="javascript:;"></a>
                  </a>
                    <ul class="sex-list">
                     ${genderHTML}
                    </ul>
                </div>
                <span class="city">邮件地址：</span>
                <div class="city-container">
                  <span class="city-select provinceSelect" type="text">
                    ${registerEmail}
                  </span>
                </div>
            </div>
            <div class="from-two clearfix">
              <span class="status">welcome message：</span>
              <textarea class="message-title">${welcomeMessage}</textarea>
            </div> 
          </div>
          <div class="certificate-btn">
            <button class="btn-next" id="showSecTemplete">确定</button>
            <button class="btn-cancel" id="cance-close">取消</button>
          </div>
        </div>
      </div> 
      `
    $('.authentication-container').append(html);
  },
  toggleClass:function(){
    $('.sex-list').toggleClass('active');
  },
  genderHTML:function(){
    let gender = identification.data.gender;
    let genderH = gender.map((item)=>{
      return `<li value="${item}" class="sex-item" name ="${item}">${item}</li>` 
    }).join('');
    return genderH
  },
  sexSelect:function(e){
    $(this).toggleClass('active');
    // var thisText = $(this).text();
    var thisText = $(this).text().replace(/[\r\n]/g,"");
    // console.log(thisText);
    identification.data.genderSex = thisText;
    //设置表单中的文本内容
    $('#sex-select').text(thisText);
    identification.toggleClass();
    // identification.heightLightBtn();
  },
  uploadingChang:function(){
    identification.run(this, function (data) { 
      console.log(this,'ppp')
      // console.log(data,'oooo');
        $('#img').attr('src', data);
        let baseURL=identification.data.pic = data;
        console.log(baseURL,'ooooo123');
      // let userBase=$('#testFile').val(data);
      // console.log(userBase);  
        // $('#testArea').val(data);  
    });
  },
  run: function(input_file, get_data) {  
    /*input_file：文件按钮对象*/  
    /*get_data: 转换成功后执行的方法*/  
    if (typeof (FileReader) === 'undefined') {  
        alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");  
    } else {  
      try {  
        /*图片转Base64 核心代码*/  
        var file = input_file.files[0];  
        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件  
        if (!/image\/\w+/.test(file.type)) {  
            alert("请确保文件为图像类型");  
            return false;  
        }  
        var reader = new FileReader();  
        reader.onload = function () {  
            get_data(this.result);  
        }  
        reader.readAsDataURL(file);  
      } catch (e) {  
          alert('图片转Base64出错啦！' + e.toString())  
      }  
    }  
  },
  removeMask:function(){
    $('.authentication-context').remove();
  },
  updataBtn:function(){
    identification.showSecondMask();
  },
  showSure:function(){
    let avator =identification.data.pic;
    console.log(avator,'9');
    let registerEmail = identification.data.userInfo.registerEmail;
    console.log(registerEmail,'0');
    // let genderSex = $('#sex-select').text();
    let genderSex = identification.data.genderSex;
    console.log(genderSex,'1');
    let email = $('.nember-name').val();
    console.log(email,'2')
    let welcomeMessage = $('.message-title').val();
    console.log(welcomeMessage,'3');
    $.ajax({
      url:'http://localhost:3001/userinfo',
      type:'POST',
      data:{genderSex,email,welcomeMessage,registerEmail,avator},
      dataType:'jsonp',
      jsonp: "callback",
      jsonpCallback:"flightHandler",
      success:function(data) {
        console.log(data,'pppppp');
        if(data.code ===200){
          identification.showSureMask();
          location.reload()
        }else{
          console.log(data)
        }
      },
      error:function(err){
        console.log(err)
      }
    })
  },
  btnCancel:function(){
    $('.authentication-context').remove();
  },
  olderrRemove:function(){
    $('.old-error').remove();
  },
  newerrRemove:function(){
    $('.new-error').remove();
  },
  conErrRemove:function(){
    $('.con-error').remove();
  },
  showSecondMask:function(){
    let html = `
      <div class="certificate-container-two">
        <div class="container-close"></div>
        <div class="certificate-member">
          <h2 class="certificate-title">修改密码
            <img src="src/img/icon.png">
          </h2>
          <p class="certificate-desc">Please modify the password
          </p>
        </div>
        <div class="certificate-message-four">
          <div class="certificate-binding">
            <p class="status">修改注册密码：</p>
            <div class="tables-box">
              <table class="login-lf-box tables">
                <tbody>
                  <tr>
                    <td class="red-hou">
                      原登陆密码
                      <span class="red-xiang">*</span>
                    </td>
                    <td>
                        <input class="bg-user password-add old-password" type="password" name="">
                        <label class="js-hide-add old-error">请输入原密码</label>
                        <label class="hide old-hide">原密码不正确</label>
                    </td>
                  </tr>
                  <tr>
                    <td class="red-hou">
                      新登陆密码
                      <span class="red-xiang">*</span>
                    </td>
                    <td class="box-js">
                      <input class="bg-user password-add-add new-password" type="password" name="" value="">
                      <label class="js-hide-add new-error">6~16个字符，区分大小写</label>
                      <label class="hide">格式不正确</label>
                    </td>
                  </tr>
                  <tr>
                    <td class="red-hou">
                      确认新密码
                      <span class="red-xiang">*</span>
                    </td>
                    <td>
                      <input class="bg-user password-add js-affirm con-password" type="password" name="">
                      <label class="js-hide-add con-error">请输入确认密码</label>
                      <!-- <label class="hide show-js-jiaoyao js-tishi-add-red">两次输入不一致</label> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="certificate-btn">
            <button class="btn-preve">确定</button>
            <button class="btn-cance">取消</button>
          </div>
        </div>
      </div>   
    `
    $('.authentication-container').html(html);
  },
  showPreMask:function(){
     $('.authentication-context').remove();
    // console.log('123');
    // identification.showMaskoneHtml();
    // $('.certificate-container-two').css('display','none');
  },
  btnSave:function(e){
    let isOk = identification.data.isOk;
    if ($('.password-add').val() == '') {
      $('.js-hide-add').css('color', 'red');
    }
    //原密码
    if ($('.old-password').val() == '') {
      $('.old-error').remove();
      $('.old-password').after('<label class="js-hide-add old-error"> 请输入原密码</label>');
      $('.old-error').css('color', 'red');
      isOk = false;
    };
    let oldPassword = identification.data.userInfo.password;
    if($('.old-password').val() !== '' && $('.old-password').val() != oldPassword) {
      $('old-error').remove();
      $('.old-password').after('<label class="js-hide-add old-error">原密码不正确</label>');
      $('.old-error').css('color', 'red');
      isOk = false;
    }
    //新密码
    if ($('.new-password').val() == '') {
      $('.new-error').remove();
      $('.new-password').after('<label class="js-hide-add new-error"> 6~16个字符，区分大小写</label>');
      $('.new-error').css('color', 'red');
      isOk = false;
    };

    var val = $('.new-password').val();
    //不等于val ；；截取两边的空格
    if (!/^[0-9a-zA-Z_]{6,15}$/.test(val) && $.trim(val) != '') {
      $('.new-error').remove();
      $('.new-password').after('<label class="js-hide-add new-error"> 格式不正确</label>');
      $('.new-error').css('color', 'red');
      isOk = false;
    };
    //确认密码（未填写）
    if ($('.con-password').val() == '') {
      $('.con-error').remove();
      $('.con-password').after('<label class="js-hide-add con-error"> 请再次填写密码</label>');
      $('.con-error').css('color', 'red');
      isOk = false;
    };
    //确认密码(不等于新密码)
    if ($.trim($('.con-password').val()) != '' && $('.con-password').val() != $('.new-password').val()) {
      $('.con-error').remove();
      $('.con-password').after('<label class="js-hide-add con-error"> 两次密码不一致</label>');
      $('.con-error').css('color', 'red');
      isOk = false;
    }
    if(isOk){
      let registerEmail = identification.data.userInfo.registerEmail;
      let password =$('.new-password').val();
      // console.log(massage,'kokokodo');
      console.log(password,registerEmail,'momomomomo')
      $.ajax({
        url:'http://localhost:3001/pass',
        data:{password,registerEmail},
        type:'POST',
        dataType:'jsonp',
        jsonp: "callback",
        jsonpCallback:"flightHandler",
        success:function(data) {
          if(data.code===200){
            identification.showSureMask()
            // console.log('修改成功！')
          }else{
            console.log(data)
          }
        },
        error:function(err){
          console.log(err)
        }
      })
    }
  },
  showSureMask:function(){
    let html =  `
      <div class="certificate-container-three">
        <div class="container-close"></div>
        <div class="certificate">
          <div class="certificate-success">
            <div class="user-pic">
              <img class="user-photo" src="${identification.data.pic}">
              <img class="user-icno" src="src/img/nember.png">
            </div>
            <p class="success-name">${identification.data.userInfo.email}</p>
            <h4 class="success-title">修改成功</h4>
            <p class="success-watch">modify successfully</p>
            <p class="success-studing">
              <a href="javascript:;">去关闭>></a>
            </p>
          </div>
        </div>
      </div> 
      `
    $('.authentication-container').html(html);
  }
  // getObjectURL:function(file) {
  //   console.log(file,'pp');
  //   var url = null;
  //   url = window.webkitURL.createObjectURL(file);
  //   return url;
  //   if (window.createObjectURL != undefined) {
  //     //basic
  //     url = window.createObjectURL(file);
  //   }else if(window.URL != undefined){
  //     //mozilla(firefox)
  //     url = window.URL.createObjectURL(file);
  //   }else if (window.webkitURL !=undefined){
  //     //webkit or chrome
  //   }
  //   return url
  // },
  // uploadingChang:function(){
  //   var objUrl = identification.getObjectURL(this.files[0]);
  //   console.log(objUrl);
  //   if(objUrl) {
  //     $("#img").attr("src",objUrl);
  //   }
  // }
}
identification.init();
