window.INITIAL_MESSES = [
  {
    id: "mess-1",
    name: "Royal Campus Feast",
    tagline: "Unlimited Premium North Indian & Continental Thali",
    category: "Veg & Non-Veg",
    isPureVeg: false,
    hasJain: true,
    rating: 4.8,
    reviewCount: 342,
    distanceKm: 0.3,
    distanceText: "300m from Main Gate (4 min walk)",
    image: "assets/royal_thali.png",
    pricePerMeal: 90,
    monthlyPassPrice: 2400,
    capacity: 75,
    occupiedSeats: 42,
    hygieneRating: "4.9 / 5 (FSSAI Verified)",
    timing: {
      breakfast: "7:30 AM - 10:00 AM",
      lunch: "12:00 PM - 3:00 PM",
      snacks: "5:00 PM - 6:30 PM",
      dinner: "7:30 PM - 10:30 PM"
    },
    todayMenu: {
      breakfast: { title: "Aloo Paratha & Masala Chai", dishes: ["Aloo Paratha (2 pcs)", "Fresh Curd", "Green Chutney", "Special Ginger Tea"], price: 50, isSpecial: false },
      lunch: { title: "Royal Special Thali", dishes: ["Paneer Butter Masala", "Dal Makhani", "Jeera Rice", "Butter Roti (4 pcs)", "Gulab Jamun"], price: 90, isSpecial: true },
      snacks: { title: "Samosa & Cold Coffee", dishes: ["Crispy Samosa (2 pcs)", "Chana Chaat", "Cold Coffee / Tea"], price: 40, isSpecial: false },
      dinner: { title: "Chicken Tikka / Malai Kofta Feast", dishes: ["Butter Chicken OR Malai Kofta", "Yellow Dal Tadka", "Steamed Basmati Rice", "Tandoori Roti", "Kheer"], price: 110, isSpecial: true }
    },
    weeklySchedule: {
      Monday: { breakfast: "Puri Bhaji & Tea", lunch: "Shahi Paneer, Dal Fry, Rice, Chapati", dinner: "Egg Curry / Kadai Veg, Rice, Chapati" },
      Tuesday: { breakfast: "Idli Sambar & Chutney", lunch: "Chole Bhature, Boondi Raita, Rice", dinner: "Paneer Do Pyaza, Mix Dal, Rice, Chapati" },
      Wednesday: { breakfast: "Poha & Jalebi + Tea", lunch: "Rajma Masala, Jeera Rice, Chapati", dinner: "Chicken Curry / Paneer Pasanda, Rice" },
      Thursday: { breakfast: "Aloo Paratha & Curd", lunch: "Kadhi Pakoda, Veg Pulao, Chapati", dinner: "Matar Paneer, Dal Tadka, Rice, Chapati" },
      Friday: { breakfast: "Uttapam & Sambhar", lunch: "Royal Thali (Paneer Butter Masala & Sweets)", dinner: "Chicken Biryani / Veg Dum Biryani" },
      Saturday: { breakfast: "Upma & Coffee", lunch: "Dal Makhani, Rice, Naan", dinner: "Veg Kolhapuri, Dal Fry, Rice, Chapati" },
      Sunday: { breakfast: "Chole Kulche & Lassi", lunch: "Sunday Special Feast & Ice Cream", dinner: "Butter Paneer / Chicken Tikka, Rice" }
    },
    announcement: "🔥 Friday Special: Complimentary Ice Cream with any Unlimited Thali!",
    ownerName: "Rajesh Sharma",
    phone: "+91 98765 43210",
    reviews: [
      { id: "r1", student: "Aarav Mehta (CS 3rd Year)", rating: 5, date: "Yesterday", comment: "Best Paneer Butter Masala on campus! Super hygienic and fast service." },
      { id: "r2", student: "Priya Nair (ECE 2nd Year)", rating: 4.5, date: "3 days ago", comment: "Clean dining space and live seat count feature saved me from waiting in long lunch queues!" }
    ]
  },
  {
    id: "mess-2",
    name: "Annapurna Shuddha Shakahar",
    tagline: "100% Pure Veg Home-Style Meals & Jain Special",
    category: "Pure Veg",
    isPureVeg: true,
    hasJain: true,
    rating: 4.9,
    reviewCount: 418,
    distanceKm: 0.5,
    distanceText: "500m near Boys Hostel 3 (6 min walk)",
    image: "assets/annapurna.png",
    pricePerMeal: 75,
    monthlyPassPrice: 2100,
    capacity: 60,
    occupiedSeats: 54,
    hygieneRating: "5.0 / 5 (Grade A+)",
    timing: {
      breakfast: "7:00 AM - 9:30 AM",
      lunch: "12:00 PM - 2:30 PM",
      snacks: "4:30 PM - 6:00 PM",
      dinner: "7:00 PM - 10:00 PM"
    },
    todayMenu: {
      breakfast: { title: "Indori Poha & Sev Jalebi", dishes: ["Indori Poha with Ratlami Sev", "Hot Jalebi (2 pcs)", "Masala Chai"], price: 40, isSpecial: false },
      lunch: { title: "Ghar Jaisa Veg Thali", dishes: ["Sev Tamatar Sabzi", "Panchratna Dal", "Phulka Roti with Desi Ghee", "Plain Rice", "Salad & Papad"], price: 75, isSpecial: true },
      snacks: { title: "Kachori & Adrak Tea", dishes: ["Pyaaz Kachori (2 pcs)", "Mint Chutney", "Special Adrak Tea"], price: 35, isSpecial: false },
      dinner: { title: "Desi Ghee Khichdi & Paneer", dishes: ["Moong Dal Khichdi with Ghee", "Paneer Bhurji", "Phulka Roti", "Fruit Custard"], price: 80, isSpecial: false }
    },
    weeklySchedule: {
      Monday: { breakfast: "Poha Sev & Tea", lunch: "Sev Tamatar, Yellow Dal, Phulka", dinner: "Aloo Gobi, Dal Fry, Rice, Phulka" },
      Tuesday: { breakfast: "Upma & Coconut Chutney", lunch: "Kadhi Pakoda, Rice, Phulka", dinner: "Paneer Butter Masala, Dal, Rice" },
      Wednesday: { breakfast: "Methi Paratha & Curd", lunch: "Chole Masala, Rice, Phulka", dinner: "Mix Veg, Moong Dal, Phulka" },
      Thursday: { breakfast: "Idli Sambar", lunch: "Baingan Bharta, Dal Tadka, Phulka", dinner: "Paneer Pasanda, Jeera Rice, Phulka" },
      Friday: { breakfast: "Aloo Puri & Halwa", lunch: "Special Rajasthani Dal Baati Churma", dinner: "Kaju Curry, Veg Pulao, Phulka" },
      Saturday: { breakfast: "Sabudana Khichdi", lunch: "Rajma Chawal, Chapati", dinner: "Malai Kofta, Dal, Rice, Phulka" },
      Sunday: { breakfast: "Masala Dosa", lunch: "Unlimited Special Thali & Sweet", dinner: "Dal Khichdi & Desi Ghee" }
    },
    announcement: "🌿 Special Jain Food counter active for lunch & dinner with no onion/garlic.",
    ownerName: "Sunita Jain",
    phone: "+91 98123 76543",
    reviews: [
      { id: "r3", student: "Rohan Gupta (Mech 4th Year)", rating: 5, date: "2 days ago", comment: "Tastes like mom's cooking! Desi ghee phulkas are incredible." },
      { id: "r4", student: "Sneha Patel (Civil 1st Year)", rating: 5, date: "1 week ago", comment: "Best Jain options around campus. Very affordable monthly pass." }
    ]
  },
  {
    id: "mess-3",
    name: "South Spice Express",
    tagline: "Crispy Dosa, Fluffy Idlis & Authentic Chettinad Meals",
    category: "South Indian",
    isPureVeg: false,
    hasJain: false,
    rating: 4.7,
    reviewCount: 289,
    distanceKm: 0.8,
    distanceText: "800m near Science Block (10 min walk)",
    image: "assets/south_spice.png",
    pricePerMeal: 80,
    monthlyPassPrice: 2250,
    capacity: 50,
    occupiedSeats: 18,
    hygieneRating: "4.8 / 5",
    timing: {
      breakfast: "7:00 AM - 10:30 AM",
      lunch: "12:30 PM - 3:30 PM",
      snacks: "4:30 PM - 7:00 PM",
      dinner: "7:30 PM - 10:30 PM"
    },
    todayMenu: {
      breakfast: { title: "Ghee Podi Masala Dosa", dishes: ["Podi Masala Dosa", "Vada (1 pc)", "Sambar & 3 Chutneys", "Filter Coffee"], price: 60, isSpecial: true },
      lunch: { title: "Authentic South Meals Thali", dishes: ["Rice", "Parrpu & Ghee", "Drumstick Sambar", "Rasam", "Poriyal", "Appalam", "Curd & Payasam"], price: 80, isSpecial: false },
      snacks: { title: "Medu Vada & Filter Coffee", dishes: ["Medu Vada (2 pcs)", "Coconut Chutney", "Degree Filter Coffee"], price: 45, isSpecial: false },
      dinner: { title: "Chettinad Meal / Uttapam Feast", dishes: ["Onion Tomato Uttapam OR Chettinad Chicken/Paneer Curry", "Rice / Parotta", "Rasam", "Banana Halwa"], price: 90, isSpecial: true }
    },
    weeklySchedule: {
      Monday: { breakfast: "Ghee Roast Dosa", lunch: "South Meals with Sambar & Rasam", dinner: "Kothu Parotta / Paneer Parotta" },
      Tuesday: { breakfast: "Mini Idli (14 pcs) in Sambar", lunch: "Vatthal Kuzhambu, Curd Rice, Potato Poriyal", dinner: "Onion Rava Dosa & Coconut Chutney" },
      Wednesday: { breakfast: "Podi Idli & Vada", lunch: "Chettinad Chicken / Paneer Meals", dinner: "Malabar Parotta & Kurma" },
      Thursday: { breakfast: "Set Dosa & Vadacurry", lunch: "Lemon Rice, Potato Roast, Sambar", dinner: "Paper Masala Dosa & Sambar" },
      Friday: { breakfast: "Pooja Special Pongal & Vada", lunch: "Special Meals with Payasam & Appalam", dinner: "Chicken Sukka / Paneer 65 with Rice" },
      Saturday: { breakfast: "Appam with Coconut Milk", lunch: "Bisibelebath with Boondi Raita", dinner: "Ghee Mysore Masala Dosa" },
      Sunday: { breakfast: "Double Vada Combo", lunch: "Sunday Special Biryani & Raita", dinner: "Parotta & Egg/Veg Curry" }
    },
    announcement: "☕ Fresh Kumbakonam Degree Filter Coffee brewed every 30 minutes!",
    ownerName: "Murugan Swamy",
    phone: "+91 97890 12345",
    reviews: [
      { id: "r5", student: "Karthik Subramanian (M.Tech)", rating: 5, date: "3 days ago", comment: "Authentic filter coffee and crispy Podi Dosa. Must visit!" }
    ]
  },
  {
    id: "mess-4",
    name: "Student Hub Lounge & Mess",
    tagline: "Modern Fusion Mess with Live Sports, Burgers & Thalis",
    category: "Veg & Non-Veg",
    isPureVeg: false,
    hasJain: false,
    rating: 4.6,
    reviewCount: 512,
    distanceKm: 1.1,
    distanceText: "1.1 km near Sports Complex (15 min walk / 3 min bike)",
    image: "assets/student_hub.png",
    pricePerMeal: 100,
    monthlyPassPrice: 2700,
    capacity: 90,
    occupiedSeats: 35,
    hygieneRating: "4.7 / 5",
    timing: {
      breakfast: "8:00 AM - 11:00 AM",
      lunch: "12:30 PM - 3:30 PM",
      snacks: "5:00 PM - 7:30 PM",
      dinner: "8:00 PM - 11:30 PM"
    },
    todayMenu: {
      breakfast: { title: "Club Sandwich & Omelette Combo", dishes: ["Cheese Grilled Sandwich OR Masala Omelette", "Hashbrowns", "Iced Tea / Coffee"], price: 70, isSpecial: false },
      lunch: { title: "Fusion Combo Thali", dishes: ["Paneer Makhani OR Butter Chicken", "Dal Makhani", "Garlic Butter Naan (2 pcs)", "Jeera Rice", "Brownie Bite"], price: 100, isSpecial: true },
      snacks: { title: "Peri Peri Fries & Shake", dishes: ["Peri Peri French Fries", "Oreo Thickshake / Mango Smoothie"], price: 65, isSpecial: false },
      dinner: { title: "Late Night Pasta & Pizza Night", dishes: ["Alfredo Pasta / Loaded Pizza Slice", "Garlic Bread", "Cooler Drink", "Ice Cream Sundae"], price: 120, isSpecial: true }
    },
    weeklySchedule: {
      Monday: { breakfast: "Pancakes & Coffee", lunch: "Paneer Lababdar, Rice, Naan", dinner: "Italian Loaded Pasta & Garlic Bread" },
      Tuesday: { breakfast: "Stuffed Paratha", lunch: "Rajma Makhani, Jeera Rice", dinner: "Szechuan Noodles & Manchurian" },
      Wednesday: { breakfast: "Egg Toast / Cheese Toast", lunch: "Chicken Curry / Paneer Kadai", dinner: "Burgers & Loaded Fries Feast" },
      Thursday: { breakfast: "Waffles & Milkshake", lunch: "Chole Bhature Special", dinner: "Mexican Rice Bowl & Salsa" },
      Friday: { breakfast: "Omelette & Toast", lunch: "Hyderabadi Biryani Feast", dinner: "Tandoori Platter & Naan" },
      Saturday: { breakfast: "French Toast", lunch: "Dal Makhani & Shahi Paneer", dinner: "Thin Crust Pizza & Mocktails" },
      Sunday: { breakfast: "Brunch Special", lunch: "Chef's Weekend Grill Thali", dinner: "Sizzler & Brownie with Ice Cream" }
    },
    announcement: "⚽ Live Premier League match screening during dinner hours today!",
    ownerName: "Vikram Malhotra",
    phone: "+91 99887 76655",
    reviews: [
      { id: "r6", student: "Devansh Rai (MBA)", rating: 4.8, date: "Yesterday", comment: "Great vibe, fast WiFi, and amazing Biryani on Fridays!" }
    ]
  }
];

window.PROMO_CODES = {
  "CAMPUS20": { discountPercent: 20, description: "20% off for verified campus students" },
  "MESSFIRST": { discountPercent: 15, description: "15% discount on your first monthly pass" },
  "FREEMEAL": { discountAmount: 50, description: "Flat ₹50 off on meal pass" }
};
