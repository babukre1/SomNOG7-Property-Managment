import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Owner() {
  const [owners, setOwners] = useState([]); // Initialize as empty array
  const [currentOwner, setCurrentOwner] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    governmentIdProof: "Passport",
    verificationStatus: "Pending",
  });

  // Fetch owners from the backend
  useEffect(() => {
    axios
      .get(
        "https://property-managment-backend.onrender.com/api/owner/getOwners",
      )
      .then((response) => {
        const fetchedOwners = Array.isArray(response.data) ? response.data : [];
        setOwners(fetchedOwners);
      })
      .catch(() => toast.error("Error fetching owners"));
  }, []);

  // Handle deleting an owner
  const handleDeleteOwner = (id) => {
    axios
      .delete(`https://property-managment-backend.onrender.com/api/owner/deleteOwner/${id}`)
      .then(() => {
        toast.success("Owner deleted successfully!");
        setOwners((prevState) => prevState.filter((owner) => owner._id !== id));
      })
      .catch(() => toast.error("Error deleting owner"));
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contactInfo")) {
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission for both Add and Update
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure that contactInfo is correctly structured when submitting
    const { contactInfo, ...rest } = formData;
    console.log(contactInfo);

    const newFormData = { ...rest, contactInfo: { ...contactInfo } };

    console.log(newFormData);

    // Determine if it's an Add or Update operation
    const url = currentOwner
      ? `https://property-managment-backend.onrender.com/api/owner/updateOwner/${currentOwner._id}`
      : "https://property-managment-backend.onrender.com/api/owner/addOwner";
    const method = currentOwner ? "post" : "post";

    axios[method](url, newFormData)
      .then((response) => {
        if (currentOwner) {
          setOwners(
            owners.map((owner) =>
              owner._id === currentOwner._id ? response.data : owner,
            ),
          );
          toast.success("Owner updated successfully!");
        } else {
          setOwners([...owners, response.data]);
          toast.success("Owner added successfully!");
        }
        setShowForm(false);
      })
      .catch(() => toast.error("Error saving owner"));
  };

  // Handle edit button click
  const handleEditOwner = (owner) => {
    setCurrentOwner(owner);
    setFormData(owner); // Pre-fill form data with current owner
    setShowForm(true);
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
        sx={{ mb: 2 }}
      >
        Add Owner
      </Button>

      <TableContainer sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Verification Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners &&
              owners.map((owner) => (
                <TableRow key={owner._id}>
                  <TableCell>{owner.fullName}</TableCell>
                  {/* Add check for undefined contactInfo */}
                  <TableCell>
                    {owner.contactInfo ? owner.contactInfo.email : "N/A"}
                  </TableCell>
                  <TableCell>
                    {owner.contactInfo ? owner.contactInfo.phone : "N/A"}
                  </TableCell>
                  <TableCell>{owner.verificationStatus}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditOwner(owner)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteOwner(owner._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Form for Add/Update */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {currentOwner ? "Edit Owner" : "Add New Owner"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              variant="outlined"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              name="contactInfo.address"
              value={formData.contactInfo.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Government ID Proof</InputLabel>
              <Select
                name="governmentIdProof"
                value={formData.governmentIdProof}
                onChange={handleChange}
              >
                <MenuItem value="Passport">Passport</MenuItem>
                <MenuItem value="License">License</MenuItem>
                <MenuItem value="National ID">National ID</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Verification Status</InputLabel>
              <Select
                name="verificationStatus"
                value={formData.verificationStatus}
                onChange={handleChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              {currentOwner ? "Update Owner" : "Add Owner"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowForm(false)}
              fullWidth
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Owner;
