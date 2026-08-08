import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

const AvatarUpload = ({ user, onUpload, isLoading }) => {
  const [preview, setPreview] = useState(user?.avatar || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-4"
          style={{ borderColor: "#C4954A" }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: "#EDE8DE" }}
            >
              <span className="text-4xl font-bold" style={{ color: "#C4954A" }}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            border: "2px solid #F5F0E8",
          }}
          disabled={isLoading}
        >
          <Camera size={14} />
        </button>

        {preview && (
          <button
            onClick={handleRemove}
            className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <p
        className="text-xs"
        style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
      >
        Click the camera icon to upload a photo
      </p>
    </div>
  );
};

export default AvatarUpload;
