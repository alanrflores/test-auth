import { useState, useEffect } from "react";
import { Post } from "../services/api";

interface UseFormDataProps {
  initialData?: Post;
  onSubmit: (data: Omit<Post, "id"> & { id?: number | undefined }) => void;
}

const useFormData = ({ initialData, onSubmit }: UseFormDataProps) => {
  const [formData, setFormData] = useState<Omit<Post, "id"> & { id?: number }>({
    title: "",
    body: "",
    userId: 1,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", body: "", userId: 1 });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserIdChange = (increment: boolean) => {
    setFormData((prev) => ({
      ...prev,
      userId: Math.min(Math.max(prev.userId + (increment ? 1 : -1), 1), 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: "", body: "", userId: 1 });
    }
  };

  return {
    formData,
    handleChange,
    handleUserIdChange,
    handleSubmit,
  };
};

export default useFormData;
