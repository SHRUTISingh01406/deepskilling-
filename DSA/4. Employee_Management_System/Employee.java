
public class Employee {
    int empID;
    String empName;
    private String position;
    private int salary;

    public Employee(int id, String name, String position, int salary) {
        this.empID = id;
        this.empName = name;
        this.position = position;
        this.salary = salary;
    }

    public int getSalary() {
        return this.salary;
    }

    public int setSalary(int salary) {
        this.salary = salary;
        return this.salary;
    }

    public String getPosition() {
        return this.position;
    }

    public String setPosition(int salary) {
        this.position = position;
        return this.position;
    }

    @Override
    public String toString() {
        return "ID : "+empID + " " + 
                "Name : "+ empName + " "+ 
                "Position : "+position + " "+ 
                "Salary : "+salary;
    }
}
