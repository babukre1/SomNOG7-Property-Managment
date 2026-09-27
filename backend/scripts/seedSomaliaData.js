import "dotenv/config";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import mongoose from "mongoose";
import { Dbconnect } from "../config/connect.js";
import User from "../models/user.model.js";
import Owner from "../models/owner.model.js";
import Property from "../models/property.model.js";

const owners = [
  ["Aamina Xasan Cali", "+252 61 000 1001", "aamina.sample@example.com", "Hodan, Muqdisho", "DEMO-BN-001", "Verified"],
  ["Cabdiraxmaan Maxamed Nuur", "+252 61 000 1002", "cabdiraxmaan.sample@example.com", "Wadajir, Muqdisho", "DEMO-BN-002", "Verified"],
  ["Fadumo Axmed Warsame", "+252 61 000 1003", "fadumo.sample@example.com", "Waaberi, Muqdisho", "DEMO-BN-003", "Verified"],
  ["Maxamuud Cabdi Guuleed", "+252 61 000 1004", "maxamuud.sample@example.com", "Kaaraan, Muqdisho", "DEMO-BN-004", "Pending"],
  ["Hodan Yuusuf Ibraahim", "+252 61 000 1005", "hodan.sample@example.com", "Xamar Weyne, Muqdisho", "DEMO-BN-005", "Verified"],
  ["Saciid Cali Barre", "+252 61 000 1006", "saciid.sample@example.com", "Yaaqshiid, Muqdisho", "DEMO-BN-006", "Pending"],
  ["Nasteexo Cumar Xasan", "+252 61 000 1007", "nasteexo.sample@example.com", "Dharkeenley, Muqdisho", "DEMO-BN-007", "Verified"],
  ["Bashiir Sheekh Axmed", "+252 61 000 1008", "bashiir.sample@example.com", "Boondheere, Muqdisho", "DEMO-BN-008", "Verified"],
].map(([fullName, phone, email, address, governmentIdProof, verificationStatus]) => ({
  fullName,
  contactInfo: { phone, email, address },
  governmentIdProof,
  verificationStatus,
  isSample: true,
}));

const propertyTemplates = [
  ["Guriga Taleex", "Wadada Taleex, Hodan, Muqdisho", "420 m²", "Residential", "aamina.sample@example.com", "Approved"],
  ["Xarunta Bakaaraha", "Suuqa Bakaaraha, Howlwadaag, Muqdisho", "780 m²", "Commercial", "cabdiraxmaan.sample@example.com", "Approved"],
  ["Guri Buulo Xuubey", "Buulo Xuubey, Wadajir, Muqdisho", "360 m²", "Residential", "fadumo.sample@example.com", "Pending"],
  ["Bakhaar Kaaraan", "Wadada Warshadaha, Kaaraan, Muqdisho", "1,250 m²", "Industrial", "maxamuud.sample@example.com", "Pending"],
  ["Dhisme Xamar Weyne", "Via Roma, Xamar Weyne, Muqdisho", "640 m²", "Commercial", "hodan.sample@example.com", "Approved"],
  ["Beer Dayniile", "Deegaanka Garasbaaley, Dayniile, Muqdisho", "3.5 hectares", "Agricultural", "saciid.sample@example.com", "Pending"],
  ["Guriga Dharkeenley", "Suuqa Xoolaha Road, Dharkeenley, Muqdisho", "500 m²", "Residential", "nasteexo.sample@example.com", "Approved"],
  ["Xafiisyada Boondheere", "Wadada Soddonka, Boondheere, Muqdisho", "910 m²", "Commercial", "bashiir.sample@example.com", "Approved"],
  ["Guri Waaberi", "Wadada Maka Al-Mukarama, Waaberi, Muqdisho", "300 m²", "Residential", "fadumo.sample@example.com", "Rejected"],
  ["Bakhaar Yaaqshiid", "Jidka Balcad, Yaaqshiid, Muqdisho", "1,100 m²", "Industrial", "saciid.sample@example.com", "Pending"],
];

async function seed() {
  await Dbconnect();

  // Sample accounts are directory data only; use a non-recoverable random login password.
  const password = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 12);
  const users = [
    { name: "Sahra Cabdi", email: "officer.hodan@example.com", role: "user", contactInformation: "+252 61 000 2001" },
    { name: "Yuusuf Maxamed", email: "officer.wadajir@example.com", role: "user", contactInformation: "+252 61 000 2002" },
    { name: "Maryan Cali", email: "officer.xamarweyne@example.com", role: "user", contactInformation: "+252 61 000 2003" },
  ];
  for (const user of users) {
    await User.findOneAndUpdate(
      { email: user.email },
      { ...user, password, isSample: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const ownerByEmail = new Map();
  for (const owner of owners) {
    const saved = await Owner.findOneAndUpdate(
      { "contactInfo.email": owner.contactInfo.email },
      owner,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    ownerByEmail.set(owner.contactInfo.email, saved._id);
  }

  for (const [propertyName, address, size, propertyType, ownerEmail, status] of propertyTemplates) {
    await Property.findOneAndUpdate(
      { propertyName, isSample: true },
      {
        propertyName,
        address,
        size,
        propertyType,
        owner: ownerByEmail.get(ownerEmail),
        documents: [`DEMO-DOC-${propertyName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`],
        status,
        isSample: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  const [userCount, ownerCount, propertyCount] = await Promise.all([
    User.countDocuments({ isSample: true }),
    Owner.countDocuments({ isSample: true }),
    Property.countDocuments({ isSample: true }),
  ]);
  console.log(JSON.stringify({ sampleUsers: userCount, sampleOwners: ownerCount, sampleProperties: propertyCount }));
}

seed()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());
