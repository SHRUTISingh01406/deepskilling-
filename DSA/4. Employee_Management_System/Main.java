
public class Main {
    public static void main(String[] args) {
        EmployeeManager manager = new EmployeeManager();
        //add function.
        manager.add(new Employee(12,"Devansh Bansal","Senior Software Engineer",2_00_000));
        manager.add(new Employee(2,"Praveen Kumar","Senior Software Engineer",15_00_000));
        manager.add(new Employee(1,"Rahul Bansal","Testing Engineer",2_00_000));
        manager.add(new Employee(3,"Devesh Chaudhary","CEO",20_00_000));
        manager.add(new Employee(7,"Nitesh","Senior Software Engineer",2_00_000));
        manager.add(new Employee(6,"Aasu Jaiswal","Full Stack Engineer",1_00_000));
        manager.add(new Employee(8,"Mohit","Software Engineer",70_000));
        manager.add(new Employee(9,"Abhi Sharma","Design Engineer",80_000));
        manager.add(new Employee(5,"Abhishek Agrawal","Design Engineer",50_000));
        manager.add(new Employee(4,"Rohit Sharma","Intern",40_000));

        //traverse function.
        manager.display();
        manager.add(new Employee(4,"Rohit Sharma","Intern",40_000));

        //delete function.
        manager.delete(9);
        manager.add(new Employee(4,"Rohit Sharma","Intern",40_000));
        manager.display();

        //search function.
        System.out.println(manager.find(3));
    }
}
