// package Employee_Management_System;

public class EmployeeManager {
    Employee[] employees;
    int curr = 0;

    public EmployeeManager() {
        employees = new Employee[10];
    }

    public EmployeeManager(int size) {
        employees = new Employee[size];
    }

    public void add(Employee emp) {
        if(curr >= employees.length) {
            System.out.println("Array is full");
            return;
        }
        employees[curr++] = emp;
    }

    public Employee find(int id) {
        for(Employee emp : employees) {
            if(id == emp.empID) return emp;
        }
        
        return null;
    }

    public void display() {
        for(int i = 0; i < curr;i++) System.out.println(employees[i]);
    }

    public boolean delete(int id) {
        int index = -1;

        for(int i = 0; i < curr;i++) {
            if(employees[i].empID == id) {
                index = i;
                break;
            }
        }

        if(index == -1) return false;

        for(int i = index;i < curr-1;i++) {
            employees[i] = employees[i+1];
        }

        employees[curr-1] = null;
        curr--;

        return true;
    }
}
