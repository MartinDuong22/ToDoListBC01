import { TaskService } from "../services/TaskService.js";
import {Task} from "../models/task.js"; 

//Khai báo đối tượng service

const taskSV = new TaskService();

// Hiển thị lên giao diện

const getAllTask = async () => {
  // const promise = taskSV.getAllTask();

  //Nếu thành công sẽ có kết quả trả về
  // promise.then(result => {
  //     console.log('result',result);
  // })

  try {
    // Bước 2:
    // dùng service để gọi API từ backend lấy dữ liệu về
    const result = await taskSV.getAllTask();

    // Bước 3:
    // Từ dữ liệu lấy về tách ra 2 mảng => render dữ liệu lên giao diện
    // TaskToDo
    let taskToDo = result.data.filter((task) => task.status === false);

    // Gọi hàm hiển thị lên giao diện
    rederTaskTodo(taskToDo);

    let taskComplete = result.data.filter((task) => task.status !== false);
    // Gọi hàm hiển thị lên giao diện
    rederTaskDone(taskComplete);
  } catch (error) {}
};

const rederTaskTodo = (taskToDo) => {
  const contentTaskTodo = taskToDo.reduce((content, item, index) => {
    content += `<li>
        <span style="cursor:pointer">${item.taskName}</span>
            <span style="cursor:pointer" onclick="delTask('${item.taskName}')">
                <i class="fa fa-trash"></i>
            </span >
            <span style="cursor:pointer" onclick="doTask('${item.taskName}')">
                <i class="fa fa-check"></i>
            </span>
        </li>`;
    return content;
  },"");
  document.getElementById("todo").innerHTML = contentTaskTodo;
};

const rederTaskDone = (taskComplete) => {
  const contentTaskComplete = taskComplete.reduce((content, item, index) => {
    content += `<li>
        <span style="cursor:pointer">${item.taskName}</span>
            <span style="cursor:pointer" onclick="delTask('${item.taskName}')">
                <i class="fa fa-trash"></i>
            </span>
            <span style="cursor:pointer" onclick="reTask('${item.taskName}')">
                <i class="fa fa-check" ></i>
            </span>
        </li>`;
    return content;
  },"");
  document.getElementById("completed").innerHTML = contentTaskComplete;
};

//Tìm ra task muốn xóa dựa trên taskName
window.delTask = async (taskName)=>{

  //Xuất hiện hộp thoại muốn xóa
  let cfm = confirm("bạn có muốn xóa task ?");
  if(cfm){
      try {
        //Gọi API mỗi lần người dùng bấm nút xóa dữ liệu
        let result = await taskSV.deleteTask(taskName);

        console.log(result.data);

        //Gọi hàm get task sau khi xóa
        getAllTask();
      } catch (err) {
        console.log(err);
      }
  }
}

// 
window.doTask = async(taskName)=>{
  
  let cfm = confirm("Chuyển xuống nhá");
  if(cfm){
      try {
        let result = await taskSV.doneTask(taskName);

        console.log(result.data);

        getAllTask();
      } catch (error) {
        console.log(error);
      }
  }
}


window.reTask = async (taskName)=>{
   let cfm = confirm("Chuyển lên nhá");
   if (cfm) {
     try {
       let result = await taskSV.rejectTask(taskName);

       console.log(result.data);

       getAllTask();
     } catch (error) {
       console.log(error);
     }
   }
}
//định nghĩa và gọi hàm getALlTask()
getAllTask();

// =====================Nghiệp vụ thêm task =========================//
//B1: Định nghĩa sự kiện click cho button
document.getElementById("addItem").onclick = async (e) => {
  // e.defaultPrevented() => Chặn sự kiện hiện tại của thẻ submit hay thẻ href thẻ a
  // Lấy thông tin .target => DOM đến thẻ => đại diện cho thẻ Button đang được onclick
  
  //Lấy thông tin người dùng nhập từ giao diện

  let taskName = document.getElementById('newTask').value;
    //Tạo ra Object backend cần
    const taskModel = new Task();
    taskModel.taskName = taskName;
    //Gọi API đưa dữ liệu về server

    try {
        let result = await taskSV.addTask(taskModel);
        console.log("Kết quả thêm tas",result.data);
        //Sau khi thêm 
        getAllTask();
    } catch (err) {
        console.log(err);
    }
    // node -v
    // npm i -g surge 
    // surge
    // Nó yêu cầu nhập email và password
};
//Viết chức năng tìm kiếm 
let searchTask = (task)=>{
  console.log(task);
}

