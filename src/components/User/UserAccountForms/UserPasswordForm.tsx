import { Form } from "radix-ui";
import Input from "../../Common/Input";
import { useState } from "react";

const userData = {
  id: "1",
  first_name: "Test",
  last_name: "McTesterson",
  email: "test@test.com",
  username: "test",
};

const UserPasswordForm = ({ onCancel }: { onCancel?: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePasswords = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
        // TODO: Implement proper API call
      const res = await fetch('/api/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ server: data.message || 'Failed to update password' });
      } else {
        alert("Password successfully updated.");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error(err);
      setErrors({ server: "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <div className="mb-4" data-testid="user-password-form">
        <div className="pl-2 w-full">
          <div className="mb-4">
            <Input
              name="current_password"
              label="Current password"
              type="password"
              placeholder="Enter current password"
              isRequired
              value={currentPassword}
              setInputValue={(val: string | null) => setCurrentPassword(val ?? '')}
              className={errors.currentPassword ? "border-red-500 bg-red-50" : ""}
            />
            {errors.currentPassword && <p className="text-red-600 text-sm">{errors.currentPassword}</p>}
          </div>

          <div className="mb-4">
            <Input
              name="new_password"
              label="New password"
              type="password"
              placeholder="Enter new password"
              isRequired
              value={newPassword}
              setInputValue={(val: string | null) => setNewPassword(val ?? '')}
              className={errors.newPassword ? "border-red-500 bg-red-50" : ""}
            />
            {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword}</p>}
          </div>

          <div className="mb-4">
            <Input
              name="confirm_password"
              label="Confirm password"
              type="password"
              placeholder="Confirm new password"
              isRequired
              value={confirmPassword}
              setInputValue={(val: string | null) => setConfirmPassword(val ?? '')}
              className={errors.confirmPassword ? "border-red-500 bg-red-50" : ""}
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
          </div>

          {errors.server && (
            <p className="text-red-600 text-sm mb-2">{errors.server}</p>
          )}

          <div className="flex my-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary-800 text-white font-semibold py-2 rounded-md hover:bg-primary-700 mr-1 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-grey-900 text-grey-50 font-semibold py-2 rounded-md hover:bg-grey-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Form.Root>
  );
};

export default UserPasswordForm;
