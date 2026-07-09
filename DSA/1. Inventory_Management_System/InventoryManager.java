//package Inventory_Management_System;

import java.util.HashMap;
public class InventoryManager {

    private HashMap<Integer,Product> inventory;

    public InventoryManager() {
        inventory = new HashMap<>();
    }

    public void addProduct(Product product) {
        inventory.put(product.getProductID(),product);
        System.out.println("Product Added");
    }

    public void updateProduct(int id, String name, int qty, double price) {
        
        Product product = inventory.get(id);

        if(product != null) {
            product.setProductName(name);
            product.setProducQuantity(qty);
            product.setProductPrice(price);
            System.out.println("Product Updated");
        }
        else {
            System.out.println("Product not found");
        }
    }

    public void displayProduct(int id) {
        Product product = inventory.get(id);
        System.out.println(product);
    }

    public void deleteProduct(int id) {
        if(inventory.remove(id) != null) {
            System.out.println("Product deleted");
        }
        else {
            System.out.println("Product not found");
        }
    }

    public void displayInventory() {
        for(Product product : inventory.values()) {
            System.out.println(product);
        }
    }

}
