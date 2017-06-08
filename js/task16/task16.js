/**
 * Created by johnw on 6/7/2017.
 */
/**

 参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
 用户输入的城市名必须为中英文字符，空气质量指数必须为整数
 用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
 用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
 用户可以点击表格列中的“删除”按钮，删掉那一行的数据

 **/
/**
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
*    "上海": 40
* };
*/

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqi_city_data=document.getElementById("aqi-city-input").value.trim();
    console.log(aqi_city_data)
    var aqi_value_data=document.getElementById("aqi-value-input").value.trim();
    if(!aqi_city_data.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("Just only allow chinese and english!");
        return;
    }
    if(!aqi_value_data.match(/^[0-9]+$/)){
        alert('Just allowe number!');
        return ;
    }
    aqiData[aqi_city_data]=aqi_value_data;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqi_table=document.getElementById("aqi-table");
    aqi_table.innerHTML=""
    for(var city in aqiData){
        if(aqi_table.children.length==0){
            aqi_table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        }
        var tr=document.createElement('tr');
        var td1=document.createElement('td');
        td1.innerText=city;
        tr.appendChild(td1);
        var td2=document.createElement('td');
        td2.innerText=aqiData[city];
        tr.appendChild(td2);
        var td3=document.createElement('td');
        td3.innerHTML="<button class='del'>Delete</button>";
        tr.appendChild(td3);
        aqi_table.appendChild(tr);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr = target.parentElement.parentElement; //第一个td
    var strCity = tr.children[0].innerText;//第一个td
    delete aqiData[strCity];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd=document.getElementById('add-btn');
    btnAdd.addEventListener('click',addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var arrBtnDel = table.getElementsByClassName("del-btn");

    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}
init();