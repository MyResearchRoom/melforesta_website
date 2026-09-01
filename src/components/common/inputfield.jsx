import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUpload, FaRegFile } from "react-icons/fa";
import { toast } from "react-toastify";
import { ImFilePdf } from "react-icons/im";
const placeholderMap = {
  email: "e.g., abc@gmail.com",
  mobileNumber: "e.g., 1234567890",
  address: "e.g., 123 Main Street",
  company: "e.g., Acme Corp",
  category : "New Category name"
};

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  readOnly = false,
  disabled = false,
  options = [],
  isSelect = false,
  multiple = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
  if (Array.isArray(value) && value.length > 0) {
    const previews = value.map((file) => {
      if (file instanceof File) {
        return {
          type: file.type === "application/pdf" ? "pdf" : "other",
          url: file.type === "application/pdf" ? URL.createObjectURL(file) : null,
          name: file.name
        };
      }

      const fileName = typeof file.name === "string" ? file.name : "";
      return {
        type: fileName.toLowerCase().endsWith(".pdf") ? "pdf" : "other",
        url: file.url || null,
        name: fileName
      };
    });
    setFilePreviews(previews);
  }
}, [value]);


  const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const hasImage = files.some(file => file.type.startsWith("image/"));
  if (hasImage) {
    toast.error("Image files are not allowed.");
    e.target.value = ""; 
    return;
  }

  const previews = files.map(file => {
  return {
    type: file.type.startsWith("image/") ? "image" :
          file.type === "application/pdf" ? "pdf" : "other",
    url: URL.createObjectURL(file),
    name: file.name
  };
 });
  setFilePreviews((prev) => [...prev, ...previews]);
  onChange({
    target: {
      name,
      type: "file",
      files,
    },
  });
};

 const handleFileDelete = (index) => {
  setFilePreviews((prev) => prev.filter((_, i) => i !== index));

  if (Array.isArray(value)) {
    const newValue = value.filter((_, i) => i !== index);
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  }
 };

  const handleCheckboxChange = (e) => {
    const { value: optionValue, checked } = e.target;
    let newValues = Array.isArray(value) ? [...value] : [];

    if (checked) {
      newValues.push(optionValue);
    } else {
      newValues = newValues.filter((v) => v !== optionValue);
    }

    onChange({
      target: { name, value: newValues },
    });
  };

  return (
    <div className="flex flex-col space-y-1 items-center px-3 xl:px-6">
      {label && (
        <label className="block font-medium text-sm xl:text-base text-left w-full">
          {label}
          {required && <span className="text-red-600 pl-1">*</span>}
        </label>
      )}

      <div className="flex flex-col w-full">
        {isSelect ? (
          multiple ? (
            <div className="flex flex-row gap-5 p-2">
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-4 border border-zinc-400 rounded p-2">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={Array.isArray(value) && value.includes(opt)}
                    onChange={handleCheckboxChange}
                    disabled={disabled}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <select
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={`w-full border border-zinc-400 focus:outline-none px-3 py-2 rounded mt-1 text-sm xl:text-base ${
                disabled ? "bg-gray-100 cursor-not-allowed" : ""
              } ${className}`}
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )
        ) : type === "file" ? (
          <div className="space-y-2">
            <input
              id={`file-input-${name}`}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 rounded border border-gray-500 w-full"
              onClick={() => document.getElementById(`file-input-${name}`).click()}
            >
              <FaUpload className="inline ml-1" />
              <p>Upload Document </p>
            </button>

            {filePreviews.length > 0 && (
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {filePreviews.map((file, index) => (
              <li key={index} className="flex flex-row items-center space-x-2">
                {file.type === "pdf" ? (
                  <ImFilePdf className="text-red-700 text-lg" />
                  ) : (
                  <FaRegFile className="text-blue-700 text-lg"/>
                )}
                  <span>{file.name}</span>
                {file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 underline"
                  >
                    View
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleFileDelete(index)}
                  className="ml-2 px-2 text-red-600 font-medium rounded underline hover:text-red-700"
                >
                    Delete
                </button>
              </li>
              ))}
            </ul>
            )}

        </div>
        )  : (
          <div className="relative">
            <input
              type={type === "password" && showPassword ? "text" : type}
              name={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholderMap[name] || `Enter ${name}`}
              className={`w-full border border-zinc-400 px-3 py-2 rounded mt-1 text-sm xl:text-base focus:outline-none ${
                (readOnly || disabled) ? "bg-gray-100 cursor-not-allowed" : ""
              } ${className}`}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

