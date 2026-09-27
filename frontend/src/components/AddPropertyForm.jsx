import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "/api";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

export default function AddPropertyForm() {
  const [form, setForm] = useState({
    propertyName: "", address: "", size: "", propertyType: "Residential", owner: "",
  });
  const [owners, setOwners] = useState([]);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/owner/getOwners`)
      .then((response) => setOwners(Array.isArray(response.data) ? response.data : []))
      .catch(() => setOwners([]));
  }, []);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const chooseDocument = (event) => {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return setDocument(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      event.target.value = "";
      return setError("Select a PDF, JPEG, PNG, or WebP document.");
    }
    if (file.size > MAX_FILE_SIZE) {
      event.target.value = "";
      return setError("Documents must be 10 MB or smaller.");
    }
    setDocument(file);
  };

  const uploadDocument = async () => {
    if (!document) return null;
    const { data } = await axios.post(`${API}/uploads/presign`, {
      filename: document.name,
      contentType: document.type,
      category: "property",
    });
    await axios.put(data.uploadUrl, document, {
      headers: { "Content-Type": document.type },
      onUploadProgress: (event) => {
        if (event.total) setUploadProgress(Math.round((event.loaded * 100) / event.total));
      },
    });
    return data.documentUrl;
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const documentUrl = await uploadDocument();
      await axios.post(`${API}/property/addProperty`, {
        ...form,
        status: "Pending",
        documents: documentUrl ? [documentUrl] : [],
      });
      navigate("/property");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The application or document could not be submitted.");
    } finally {
      setLoading(false);
    }
  };

  return <div className="form-shell">
    <div className="page-heading"><div><h2>Register a property</h2><p>Create an application for review by a registry officer.</p></div></div>
    {error && <div className="form-error">{error}</div>}
    <form className="form-card" onSubmit={submit}>
      <section className="form-section">
        <h3>Property details</h3><p>Enter the property identity and physical location.</p>
        <div className="form-grid">
          <div className="field"><label>Property name</label><input className="form-control" name="propertyName" value={form.propertyName} onChange={change} required /></div>
          <div className="field"><label>Property type</label><select className="form-control" name="propertyType" value={form.propertyType} onChange={change}><option>Residential</option><option>Commercial</option><option>Agricultural</option><option>Industrial</option></select></div>
          <div className="field full"><label>Street address / legal location</label><input className="form-control" name="address" value={form.address} onChange={change} required /></div>
          <div className="field"><label>Area / size</label><input className="form-control" name="size" value={form.size} onChange={change} placeholder="e.g. 2,450 sq ft" required /></div>
          <div className="field"><label>Registered owner</label><select className="form-control" name="owner" value={form.owner} onChange={change} required><option value="">Select verified owner</option>{owners.map((owner) => <option key={owner._id} value={owner._id}>{owner.fullName} - {owner.verificationStatus}</option>)}</select></div>
        </div>
      </section>
      <section className="form-section">
        <h3>Supporting document</h3><p>Upload a deed, lease, tax record, or other ownership evidence to secure Cloudflare R2 storage.</p>
        <div className="field"><label>Ownership document</label><input className="form-control" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={chooseDocument} /><small>PDF or image, up to 10 MB. {document ? `Selected: ${document.name}` : "No document selected."}</small></div>
        {loading && document && <div className="upload-progress"><span style={{ width: `${uploadProgress}%` }} /></div>}
      </section>
      <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => navigate("/property")}>Cancel</button><button className="primary-btn" disabled={loading}>{loading ? (uploadProgress < 100 && document ? `Uploading ${uploadProgress}%` : "Submitting...") : "Submit for review"}</button></div>
    </form>
  </div>;
}
