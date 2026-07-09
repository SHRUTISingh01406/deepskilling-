//package E_Commerce_Platofrm_Search_Function;


public class Product {
    int productID;
    String productName;
    String category;

    public Product(int productID, String productName, String category) {
        this.productID = productID;
        this.productName = productName;
        this.category = category;
    }

    @Override
    public String toString() {
        return "ID: " + productID +
               ", Name: " + productName +
               ", Quantity: " + category;
    }

}