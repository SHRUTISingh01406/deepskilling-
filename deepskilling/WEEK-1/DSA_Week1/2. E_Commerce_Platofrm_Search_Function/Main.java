//package E_Commerce_Platofrm_Search_Function;

public class Main {
    public static void main(String[] args) {
        int size = 10;
        String[] names = {"Laptop","TV","Mobile","PS5","Chess","Bottle","Table","Smart Watch","VR","Cooker"};
        String[] category = {"Electronics","Electronics","Electronics","Electronics","Board","Daily Use","Daily Use","Electronics","Electronics","Kitchen"};
        Product[] products = new Product[10];
        for(int i = 0; i < 10;i++) {
            products[i] = new Product(i+1,names[i],category[i]);
        }

        int findID = 6;

        System.out.println("Position of product with id "+ findID +" is : "+LinearSearch(products,findID));

        findID = 8;

        System.out.println("Position of product with id "+ findID +" is : "+BinarySearch(products,findID));
    }

    public static int LinearSearch(Product[] product,int productID) {

        for(int i = 0; i < product.length;i++) {
            if(productID == product[i].productID) {
                return i;
            }
        }

        return -1;
    }

    public static int BinarySearch(Product[] product,int productID) {
        int start = 0;
        int end = product.length-1;

        while(start <= end) {
            int mid = start+(end-start)/2;

            if(product[mid].productID < productID) {
                start = mid+1;
            }
            else if(product[mid].productID > productID) {
                end = mid-1;
            }
            else return mid;
        }

        return -1;
    }
}