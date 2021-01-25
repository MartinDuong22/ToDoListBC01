import { BaseService } from "./BaseService.js";

export class TaskService extends BaseService {
  constructor() {
    super(); //gọi lại phương thức constructor của class cha
  }
  //Định nghĩa phương thức getALlTask
  getAllTask = () => {
    const promise = this.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask");
    return promise;
  };

  //Định nghĩa hàm đưa dữ liệu về Backend
  addTask = (task) => {
    //Đúng định dạng backend quy định
    const promise = this.post(
      "http://svcy.myclass.vn/api/ToDoList/AddTask",
      task
    );
    return promise; //Thiếu này sẽ báo lỗi
  };

  //Định nghĩa hàm xóa dữ liệu
  deleteTask = (taskName) => {
    const promise = this.delete(
      `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`
    );
    return promise;
  };

  //Xây dựng chức năng donetask, rejectTask
  doneTask = (taskName) => {
    const promise = this.put(
      `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`
    );
    return promise;
  };

  rejectTask = (taskName) => {
    const promise = this.put(
      `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`
    );
    return promise;
  };

  //============================VIẾT HÀM MÀ KHÔNG CẦN EXTENDS=========================//
  // rejectTask = (taskName) => {
  //   const promise = axios({
  //      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
  //      method: "PUT"
  //      data: "Nếu có truyền vào data như addTask"
  //    });
  //   return promise;
  // };
}
