require("dotenv").config({ path: ".variables.env" });

const mongoose = require("mongoose");
const Client = require("../models/Client");
const Lead = require("../models/Lead");
const Product = require("../models/Product");

const today = new Date().toISOString().slice(0, 10);

const demoData = [
  {
    name: "Client",
    model: Client,
    documents: [
      {
        company: "Northwind Design",
        name: "Taylor",
        surname: "Morgan",
        phone: "+1-202-555-0101",
        email: "taylor@northwind.example",
        country: "United States",
      },
      {
        company: "Bluebird Studio",
        name: "Jordan",
        surname: "Lee",
        phone: "+1-202-555-0102",
        email: "jordan@bluebird.example",
        country: "United States",
      },
      {
        company: "Maple & Co.",
        name: "Riley",
        surname: "Patel",
        phone: "+1-202-555-0103",
        email: "riley@maple.example",
        country: "Canada",
      },
    ],
  },
  {
    name: "Lead",
    model: Lead,
    documents: [
      {
        date: today,
        client: "Northwind Design",
        phone: "+1-202-555-0101",
        email: "taylor@northwind.example",
        budget: 4500,
        request: "Website redesign",
        status: "pending",
      },
      {
        date: today,
        client: "Bluebird Studio",
        phone: "+1-202-555-0102",
        email: "jordan@bluebird.example",
        budget: 2800,
        request: "Brand identity package",
        status: "pending",
      },
      {
        date: today,
        client: "Maple & Co.",
        phone: "+1-202-555-0103",
        email: "riley@maple.example",
        budget: 6200,
        request: "E-commerce storefront",
        status: "pending",
      },
    ],
  },
  {
    name: "Product",
    model: Product,
    documents: [
      {
        productName: "Starter Website",
        description: "A responsive five-page business website.",
        price: 1200,
        status: "available",
      },
      {
        productName: "Brand Identity",
        description: "Logo and core visual identity package.",
        price: 850,
        status: "available",
      },
      {
        productName: "Online Store",
        description: "A starter e-commerce storefront setup.",
        price: 2400,
        status: "available",
      },
    ],
  },
];

async function seedDemoData() {
  if (!process.env.DATABASE) {
    throw new Error("DATABASE is not set in .variables.env.");
  }

  await mongoose.connect(process.env.DATABASE);

  for (const collection of demoData) {
    const count = await collection.model.countDocuments();
    if (count > 0) {
      console.log(
        `Skipped ${collection.name}: collection already contains ${count} document(s).`
      );
      continue;
    }

    await collection.model.insertMany(collection.documents);
    console.log(
      `Added ${collection.documents.length} demo ${collection.name.toLowerCase()} record(s).`
    );
  }
}

if (require.main === module) {
  seedDemoData()
    .catch((error) => {
      console.error(`Demo data seeding failed: ${error.message}`);
      process.exitCode = 1;
    })
    .finally(async () => {
      await mongoose.disconnect();
    });
}
