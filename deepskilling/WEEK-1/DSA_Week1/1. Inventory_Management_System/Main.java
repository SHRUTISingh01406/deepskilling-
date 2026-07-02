//package Inventory_Management_System;

public class Main {
    public static void main(String[] args) {

        InventoryManager manager = new InventoryManager();

        manager.addProduct(new Product(1,"PS5",48,50_000));
        manager.addProduct(new Product(3,"Laptop",23,80_000));
        manager.addProduct(new Product(2,"Home Database",12,40_000));
        manager.addProduct(new Product(9,"Samsung Galaxy S27 Ultra",6,1_50_000));

        manager.displayInventory();

        manager.updateProduct(1,"PS5",37,55_000);
        manager.deleteProduct(2);
        manager.addProduct(new Product(5,"IPAD",3,70_000));
        //manager.displayProduct(3);

        manager.displayInventory();
    }
}
