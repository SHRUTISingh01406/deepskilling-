//package Sorting_Customer_Orders;

class Order {
    int orderID;
    String customerName;
    int totalPrice;

    public Order(int id, String name, int price) {
        this.orderID = id;
        this.customerName = name;
        this.totalPrice = price;
    }

    @Override
    public String toString() {
        return "{ "+"Order ID : "+orderID + ", "+
                "Customer Name : "+ customerName + ", " +
                "Total Price : "+totalPrice + " }" ;
    }
}
