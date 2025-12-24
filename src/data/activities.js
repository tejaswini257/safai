/**
 * Activity Logs Dataset
 * Images mapped to: public/images/CleanerActivity/
 */
export const activities = [
    {
        id: "1",
        cleanerName: "Ramesh Kumar",
        location: "Nagpur Urban",
        finishedAt: "10:30 AM",
        // Mapped to files 1-5 in your directory
        images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
    },
    {
        id: "2",
        cleanerName: "Suresh Mane",
        location: "Dharampeth Zone",
        finishedAt: "11:15 AM",
        // Mapped to files 6-8
        images: ["6.webp", "7.webp", "8.webp"]
    },
    {
        id: "3",
        cleanerName: "Raju Choudhary",
        location: "Nehru Nagar Zone",
        finishedAt: "12:45 PM",
        // Mapped to files 9-10
        images: ["9.webp", "10.webp"]
    },
    {
        id: "4",
        cleanerName: "Ankit Choudhary",
        location: "Manish Nagar Zone",
        finishedAt: "01:20 PM",
        // Mapped to remaining files
        images: ["11.webp", "12.webp"]
    },
    {
        id: "5",
        cleanerName: "Sunita Bai",
        location: "Sadar Zone",
        finishedAt: "02:10 PM",
        // Reusing some logs for additional activity entries
        images: ["3.webp", "7.webp", "12.webp"]
    },
    {
        id: "6",
        cleanerName: "Omkar Saaf",
        location: "Nagpur East",
        finishedAt: "03:45 PM",
        images: ["1.webp", "4.webp", "9.webp"]
    }
];