const Guarantee = {
  data:{
    name:'katiao',//姓名
    genderSex:'女', //性别
    birthDate:'1996-01-30', //出生日期
    identityCard:'441424199601206928', //省份证号码
    address:'广东省广州市', //地址
    typeStatus:0, //选择保险项目， 1 旅游保险 2 车险  3 医疗
    toursitStatus:0,//选择旅游状态 1全球计划 2欧洲计划 3亚洲计划
    startDate:'',//起始日期
    deadline:'',//结束日期
    tourtravalDestination:'',//旅游目的地
    automoblieStatus:0,//选择车险状态 1汽车全包保险计划 2汽车第三者保险计划
    carManufacturer:'',//厂名
    carModel:'',//型号
    medicalStatus:0, //选择医疗保险的状态 1 全面医疗保险 2 普通医疗保险
    constNUm:'垫付费', //垫付费
    costType:['$0','$800','$16000'],//垫付费
    paymentType:0,// 1现金 2 自动转账 3 信用卡 
  },
  init:function(){
    this.bind()
  },
  bind:function(){
    //弹出窗口
    $('#formBtn').on('click',this.showMask);
    // $('#formBtn').on('click',this.showRemove);
    //关闭窗口
    $('body').on('click','.guarantee-close',this.removeMask);
    //点击当前状态时，高亮并显示所有的当前插入的dom
    $('body').on('click','.list-item',this.StatusItem);
    //点击旅游保险计划，高亮并显示所有的当前插入don
    $('body').on('click','.status-item',this.tourPlayItem);
    //点击汽车保险计划，高亮并显示所有的当前插入dom
    $('body').on('click','.autmoblist-item',this.autoblistPlayItem);
    //点击医疗保险计划，高亮并显示所有的当前插入dom
    $('body').on('click','.medical-item',this.medicalPlayItem);
    //点击起始日期输入框
    $('body').on('focus','#start-date',this.startInput);
    // 点击结束日期输入框
    $('body').on('focus','#end-date',this.endInput);
    //输入目的地
    $('body').on('input','#destination',this.bournInput);
    //点击费用列表下拉收起
    $('body').on('click','#constBtn',this.constClass);
    //点击费用插入到input框
    $('body').on('click','.exprese-item',this.constSelect);
    //选择费用类型
    $('body').on('click','.payment-item',this.paymentSelect);
    //取消
    $('body').on('click','.btn-cancel',this.cancelBtn)
  },
  showMask:function(){
    let show = true;
    let html = `
      <div class="popup-context">
        <div class="guarantee-mask"></div>
        <div class="popup-container">  
        </div>
      </div>`;
      $('body').append(html);
      Guarantee.showMaskoneHtml();
  },
  showMaskoneHtml:function(){
    let name = Guarantee.data.name;
    let genderSex = Guarantee.data.genderSex;
    let birthDate = Guarantee.data.birthDate;
    let identityCard = Guarantee.data.identityCard;
    let address = Guarantee.data.address;
    let typeStatus = Guarantee.data.typeStatus;
    let toursitStatus = Guarantee.data.toursitStatus;
    let automoblieStatus = Guarantee.data.automoblieStatus;
    let medicalStatus = Guarantee.data.medicalStatus;
    let constNUm = Guarantee.data.constNUm;
    let costType = Guarantee.data.costType;
    let paymentType = Guarantee.data.paymentType;
    let costTypeHTML = Guarantee.costTypeHTML();
    let html = `
      <div class="guarantee-container">
        <div class="guarantee-close"></div>
        <div class="guarantee-message">
          <h3 class="guarantee-title">保单资料表</h3>
          <div class="message-container">
            <div class="name-content">
              <span class="name-title">姓名:</span>
              <input class="name-input" value="${name}" disabled></input>
            </div>
            <div class="gander-content">
              <span class="gander-title">性别:</span>
              <input class="gander-input" value="${genderSex}" disabled></input>
            </div>
            <div class="number-message">
              <span class="date-title">出生日期：</span>
              <input class="date-input" value="1996-01-01" disabled></input>
            </div> 
            <div class="number-content">
              <span clsss="number-title">身份证号码：</span>
              <input class="number-input" value="${identityCard}" disabled></input>
            </div>
            <div class="addreen-message">
              <span class="numberAddre-title">地址:</span>
              <input class="addre-input" value="${address}" disabled></input>
            </div>
          </div>
          <h3 class="fill-title">可填写</h3>
          <div  class="message-input">
            <div class="phone-content">
              <span class="phone-title">联络电话：</span>
              <input class="phone-input"></input>
            </div>
            <div class="month-content">
              <span class="month-title">月收入:</span>
              <input class="month-input"></input>
            </div>
          </div>
          <div class="from-container">
            <p class="from-status">保险项目:</p>
            <ul class="select-list">
              <li data-value="1" class="list-item ${typeStatus == 1 ? 'active' :''} travel">旅游保险</li>
              <li data-value="2" class="list-item ${typeStatus == 2 ? 'active' :''} car">车险</li>
              <li data-value="3" class="list-item ${typeStatus == 3 ? 'active' :''} medical">医疗保险</li>
            </ul>
          </div>
          <div class="form-list">
            <div class="from-one-travel travelList" style="display:${typeStatus == 1 ? 'block' :'none'}">
              <ul class="status-select">
                <li data-value="1" class="status-item ${toursitStatus ==1 ? 'active':''}">全球计划</li>
                <li data-value ="2" class="status-item ${toursitStatus ==2 ? 'active':''}">欧洲计划</li>
                <li data-value ="3" class="status-item ${toursitStatus ==3 ? 'active':''}">亚洲计划</li>
              </ul>
            </div>

            <div class="from-two-car carList" style="display:${typeStatus == 2 ? 'block' :'none'}">
              <ul class="autmoblist-select">
                <li data-value="1" class="autmoblist-item ${automoblieStatus == 1 ? 'active' :''}">汽车全保保险计划</li>
                <li data-value ="2" class="autmoblist-item ${automoblieStatus == 2 ? 'active' :''}">汽车第三者保险计划</li>
              </ul>
            </div>

            <div class="from-two-medical medicalList" style="display:${typeStatus == 3 ? 'block' :'none'}">
              <ul class="medical-select">
                <li data-value="1" class="medical-item ${medicalStatus == 1 ? 'active' : 'none'}">全面医疗保险</li>
                <li data-value="2" class="medical-item ${medicalStatus == 2 ? 'active' : 'none'}">普通医疗保险</li>
              </ul>
            </div>
            <div class="globalList" style="display:${toursitStatus ==1 || toursitStatus ==2 || toursitStatus == 3 ? 'block' : 'none'}">
              <ul class="global-list">
                <li class="global-item">旅游起始日期：<input id="start-date" class="input-bourn" type="text" value=""/></li>
                <li class="global-item">旅游结束日期：<input id="end-date" class="input-bourn" type="text" value=""/></li>
                <li class="global-item">旅游目的地：<input id="destination" class="input-bourn" type="text" value=""/></li> 
              </ul>
            </div>
            <div class="automobileList" style="display:${automoblieStatus ==1 || automoblieStatus == 2 ? 'block' :'none'}">
              <ul class="automobile-list">
                <li class="automobile-item">厂号：<input id="item-brand" class="input-brand" type="text" value="" /></li>
                <li class="automobile-item">型号：<input id="item-type" class="input-type" type="text" value="" /></li>
              </ul>
            </div>

            <div class="const-experse" style="display:${medicalStatus == 1 || medicalStatus == 2 ? 'block'  : 'none'}">
              <a href="javascript:;" class="const-select constInput" type="text" >
                ${constNUm}
                <a class="const-btn" id ="constBtn" href="javascript:;"></a>
              </a>
              <ul class="exprese-list expressSet">
                ${costTypeHTML}
              </ul>
            </div>
          </div>
          <div class="from-two-medical">
            <p class="travel-insurance">支付方式:</p>
            <ul class="payment-select">
              <li data-value="1" class="payment-item ${paymentType == 1 ? 'active' :''}">现金</li>
              <li data-value="2" class="payment-item ${paymentType == 2 ? 'active' :''}">自动转账</li>
              <li data-value="3" class="payment-item ${paymentType == 3 ? 'active' :''}">信用卡ATM汇款</li>
            </ul>
          </div>
          <div class="from-btn">
            <button class="btn-sure" id="showTemplete">确定</button>
            <button class="btn-cancel" id="showRemone">取消</button>
          </div>
        </div>
      </div>
    `
    $('.popup-container').append(html);
  },
  removeMask:function(){
    $('.popup-context').remove();
  },
  StatusItem:function(){
    var thisValue = $(this).data('value');
    console.log(thisValue,'A');
    Guarantee.data.typeStatus = thisValue;
    $('.list-item').removeClass('active');
    $(this).addClass('active');
    if(thisValue ==1) {
      $('.travelList').show();
      $('.carList').hide();
      $('.medicalList').hide();
      $('.automobileList').hide();
      $('.const-experse').hide();
    }else if(thisValue ==2){
      $('.carList').show();
      $('.travelList').hide();
      $('.medicalList').hide();
      $('.globalList').hide();
      $('.const-experse').hide();
    }else if(thisValue == 3){
      $('.medicalList').show();
      $('.travelList').hide();
      $('.carList').hide();
      $('.automobileList').hide();
      $('.globalList').hide();
    }
  },
  startInput:function(event){
    laydate.render({
      elem:'#start-date' //指定元素
    });
    // var thisStart = $('#start-date').val();
    // console.log(thisStart,'1233333');
  },
  endInput:function(event){
    laydate.render({
      elem:'#end-date'
    });
    // var thisEnd = $('#end-date').val();
    // console.log(thisEnd,'1233333');
  },
  bournInput:function(event){
    var thisInput = $('#bournInput').val();
    console.log(thisInput,'9999');
  },
  tourPlayItem:function(){
    var thisStatus = $(this).data('value');
    console.log(thisStatus,'B');
    Guarantee.data.toursitStatus = thisStatus;
    $('.status-item').removeClass('active');
    $(this).addClass('active');
    if(thisStatus == 1) {
      $('.globalList').show();
      $('.automobileList').hide();
      $('.const-experse').hide();
    }else if(thisStatus == 2) {
      $('.globalList').show();
      $('.automobileList').hide();
      $('.const-experse').hide();
    }else if(thisStatus == 3){
      $('.globalList').show();
      $('.automobileList').hide();
      $('.const-experse').hide();
    }
  },
  autoblistPlayItem:function(){
    var thisAutomoblieStatus = $(this).data('value');
    console.log(thisAutomoblieStatus,'C');
    Guarantee.data.automoblieStatus = thisAutomoblieStatus;
    $('.autmoblist-item').removeClass('active');
    $(this).addClass('active');
    if(thisAutomoblieStatus == 1) {
      $('.automobileList').show();
      $('.globalList').hide();
      $('.const-experse').hide();
    }else if(thisAutomoblieStatus ==2){
      $('.automobileList').show();
      $('.globalList').hide();
      $('.const-experse').hide();
    }
  },
  medicalPlayItem:function(){
    var thisModicalStatus = $(this).data('value');
    console.log(thisModicalStatus,'D');
    Guarantee.data.medicalStatus = thisModicalStatus;
    $('.medical-item').removeClass('active');
    $(this).addClass('active');
    if(thisModicalStatus == 1) {
      $('.const-experse').show();
      $('.automobileList').hide();
      $('.globalList').hide();
    }else if(thisModicalStatus ==2){
      $('.const-experse').show();
      $('.automobileList').hide();
      $('.globalList').hide();
    }
  },
  constClass:function(){
    $('.expressSet').toggleClass('active');
  },
  costTypeHTML:function(){
    var costType = Guarantee.data.costType;
    let costH = costType.map((item)=>{
      return `<li value="${item}" class="exprese-item">${item}</li>`
    }).join('')
    return costH
  },
  constSelect:function(e){
    $(this).toggleClass('active');
    var thisText = $(this).text();
    Guarantee.data.constNUm = thisText;
    $('.constInput').text(thisText);
    Guarantee.constClass();
  },
  paymentSelect:function(){
    var thisPayment = $(this).data('value');
    console.log(thisPayment,'D');
    Guarantee.data.paymentType = thisPayment;
    $('.payment-item').removeClass('active');
    $(this).addClass('active');
  },
  cancelBtn:function(){
    $('.popup-context').remove();
  }
}
Guarantee.init();
