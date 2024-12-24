import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactInfo: {
        phone: { type: String,  },
        email: { type: String,  },
        address: { type: String, },
    },
    governmentIdProof: { type: String, required: true }, // e.g., passport, license
    verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

// module.exports = mongoose.model('Owner', OwnerSchema);

const Owner = mongoose.model("Owner", OwnerSchema);
export default Owner;