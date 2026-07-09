//package Inventory_Management_System;

public class Product {
    private int productID;
    private String productName;
    private int quantity;
    private double price;

    public Product(int productID, String productName, int quantity,int price) {
        this.productID = productID;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductName(String name) {
        this.productName = name;
    }

    public void setProducQuantity(int qty) {
        this.quantity = qty;
    }

    public void setProductPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "ID: " + productID +
               ", Name: " + productName +
               ", Quantity: " + quantity +
               ", Price: " + price;
    }

}