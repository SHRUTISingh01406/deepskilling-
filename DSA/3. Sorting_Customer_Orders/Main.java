//package Sorting_Customer_Orders;

public class Main {
    public static void main(String[] args) {
        int[] IDs = {5,4,7,8,9,1,2,6,3,10,15,18,12,11,19,13,20};
        String[] names = {"Ashu","Nitesh","Hello","Aman","Rohit","Virat","Rahul","Devid","Kevin","Devesh","Vikhyat","Anurag","Love","Abrahim","Elon","Bill","Sundar"};
        int[] totalPrice = {549,456,432,1000,3200,3204,2300,4000,4300,345,543,100,99,4311,4700,3600,2500};
        
        Order[] orders = new Order[names.length];
        for(int i = 0; i < orders.length;i++) {
            orders[i] = new Order(IDs[i],names[i],totalPrice[i]);
        }

        //bubbleSort(orders);
        quickSort(orders);

        for(Order od : orders) System.out.println(od);
    }

    public static void bubbleSort(Order[] orders) {
        int n = orders.length;
        for(int i = 0; i < n;i++) {
            boolean swapped = false;
            for(int j = 0; j < n-1-i;j++){
                if(orders[j].totalPrice > orders[j+1].totalPrice) {
                    Order temp = orders[j];
                    orders[j] = orders[j+1];
                    orders[j+1] = temp;
                    swapped = true;
                }
            }

            if(!swapped) break;
        }
    }

    public static void quickSort(Order[] orders) {
    quickSort(orders, 0, orders.length - 1);
}

private static void quickSort(Order[] orders, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(orders, low, high);

        quickSort(orders, low, pivotIndex - 1);
        quickSort(orders, pivotIndex + 1, high);
    }
}

private static int partition(Order[] orders, int low, int high) {
    Order pivot = orders[high];

    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (orders[j].totalPrice <= pivot.totalPrice) {
            i++;

            Order temp = orders[i];
            orders[i] = orders[j];
            orders[j] = temp;
        }
    }

    Order temp = orders[i + 1];
    orders[i + 1] = orders[high];
    orders[high] = temp;

    return i + 1;
}
}
