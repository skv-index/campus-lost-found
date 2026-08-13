import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// DNS fix for Windows SRV resolution
try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    // Ignore DNS warning if already configured
}

import mongoose from 'mongoose';
import Item from './models/Item.js';

export const SEED_ITEMS = [
    {
        trackingCode: "TRK-9042",
        title: "Sony WH-1000XM4 Noise-Canceling Headphones",
        type: "Lost",
        category: "Electronics",
        location: "Central Library",
        specificLocation: "2nd Floor Quiet Study Area, Desk #14",
        date: new Date("2026-08-09"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Matte black over-ear noise-canceling headphones left in a dark gray protective case near desk #14.",
        features: ["Carabiner clip attached", "Minor scratch on right ear cup", "Includes USB-C charging cable"],
        reporterName: "Alex Morgan",
        reporterContact: "+1 555-019-2831",
        reporterEmail: "alex.m@univ.edu"
    },
    {
        trackingCode: "TRK-8821",
        title: "Leather Bi-Fold Wallet (Brown)",
        type: "Found",
        category: "Wallet",
        location: "Main Cafeteria",
        date: new Date("2026-08-08"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        description: "Genuine brown leather bi-fold wallet containing student ID card and bus pass. Turned in to security desk.",
        features: ["Initial 'R.K.' embossed on corner", "Contains Campus Metro Transit card"],
        reporterName: "Cafeteria Staff - David",
        reporterContact: "+1 555-014-9982",
        reporterEmail: "cafeteria.safety@univ.edu"
    },
    {
        trackingCode: "TRK-7612",
        title: "Official Student ID Card — Naveen K.",
        type: "Found",
        category: "ID Card",
        location: "Tech Lab Block 3",
        date: new Date("2026-08-08"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
        description: "Green lanyard with blue university badge holder containing Student ID card for Computer Science department.",
        features: ["NFC Access Chip integrated", "Green woven lanyard"],
        reporterName: "Tech Lab Security",
        reporterContact: "+1 555-012-3344",
        reporterEmail: "techlab.desk@univ.edu"
    },
    {
        trackingCode: "TRK-6540",
        title: "North Face Backpack (Black, 30L)",
        type: "Lost",
        category: "Bag",
        location: "Sports Complex",
        date: new Date("2026-08-07"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        description: "Black water-resistant backpack containing engineering notebooks, scientific calculator, and water bottle.",
        features: ["Reflective stripe on front", "TI-84 Plus Calculator inside front pocket"],
        reporterName: "Samantha Chen",
        reporterContact: "+1 555-018-7721",
        reporterEmail: "schen@univ.edu"
    },
    {
        trackingCode: "TRK-5419",
        title: "Calculus & Linear Algebra Hardcover Textbook",
        type: "Found",
        category: "Books",
        location: "Academic Quad",
        date: new Date("2026-08-06"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        description: "9th Edition Mathematics textbook with yellow sticky notes highlighting Chapter 4.",
        features: ["Yellow tab markers", "Name written on inside cover"],
        reporterName: "Library Volunteer",
        reporterContact: "+1 555-011-4001",
        reporterEmail: "library.vol@univ.edu"
    },
    {
        trackingCode: "TRK-4311",
        title: "Toyota Car Key Fob with University Lanyard",
        type: "Found",
        category: "Keys",
        location: "Student Hostel A",
        date: new Date("2026-08-05"),
        status: "Resolved / Claimed",
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
        description: "Black 4-button Toyota smart key attached to a red varsity key ring.",
        features: ["Red metal ring", "Miniature flashlight attachment"],
        reporterName: "Hostel Warden Office",
        reporterContact: "+1 555-019-8800",
        reporterEmail: "hostelA@univ.edu"
    },
    {
        trackingCode: "TRK-3290",
        title: "Vintage Denim Jacket (Size L)",
        type: "Lost",
        category: "Clothing",
        location: "Main Cafeteria",
        date: new Date("2026-08-04"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
        description: "Blue light-wash denim jacket left on chair in the outdoor seating gallery.",
        features: ["NASA enamel pin on collar", "Bronze button snaps"],
        reporterName: "Jordan Miller",
        reporterContact: "+1 555-013-6622",
        reporterEmail: "jmiller@univ.edu"
    },
    {
        trackingCode: "TRK-2104",
        title: "Apple iPad Pro 11-inch (Space Gray)",
        type: "Lost",
        category: "Electronics",
        location: "Central Library",
        date: new Date("2026-08-03"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
        description: "Space gray iPad Pro inside a navy blue folio cover with Apple Pencil 2 magnetically attached.",
        features: ["Navy magnetic smart cover", "Apple Pencil attached", "Paperlike screen protector"],
        reporterName: "Priya Sharma",
        reporterContact: "+1 555-017-9911",
        reporterEmail: "psharma@univ.edu"
    },
    {
        trackingCode: "TRK-1982",
        title: "Hydro Flask Insulated Stainless Water Bottle (32oz)",
        type: "Found",
        category: "Other",
        location: "Sports Complex",
        date: new Date("2026-08-02"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        description: "Pacific blue powder-coated water bottle with silicone boot sleeve on bottom.",
        features: ["Custom vinyl stickers", "Straw lid"],
        reporterName: "Gym Assistant Chris",
        reporterContact: "+1 555-016-4422",
        reporterEmail: "sports.desk@univ.edu"
    },
    {
        trackingCode: "TRK-1045",
        title: "Ray-Ban Aviator Sunglasses (Gold Frame)",
        type: "Found",
        category: "Clothing",
        location: "Academic Quad",
        date: new Date("2026-08-01"),
        status: "Active / Unclaimed",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
        description: "Classic gold-framed Ray-Ban aviators in a brown leather protective casing.",
        features: ["Polarized G-15 green lenses", "Brown snap case included"],
        reporterName: "Campus Grounds Security",
        reporterContact: "+1 555-010-8833",
        reporterEmail: "security.grounds@univ.edu"
    }
];

export const seedDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
            console.log('⚠️  Skipping database seed: MONGODB_URI not configured.');
            return;
        }

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(uri);
        }

        // Delete existing items and re-seed
        await Item.deleteMany({});
        const createdItems = await Item.insertMany(SEED_ITEMS);
        console.log(`✅ Seeded ${createdItems.length} items into MongoDB Atlas successfully!`);
    } catch (error) {
        console.error('❌ Error seeding items database:', error.message);
    }
};

// Run this file directly: node server/seed.js
// This block only runs if executed directly, not when imported.
const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('server/seed.js');
if (isMain) {
    seedDB().then(() => {
        console.log('🎉 Seeding complete. Closing database connection.');
        mongoose.connection.close();
        process.exit(0);
    });
}
