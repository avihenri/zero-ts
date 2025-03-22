import { Form } from "radix-ui";
import Input from "../../Common/Input";
import { useState } from "react";

const userData = {
    id: "1",
    first_name: "Test",
    last_name: "McTesterson",
    email: "test@test.com",
    username: "test",
}

type UserType = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
}

const UserDetailsForm = () => {
    const [formData, setFormData] = useState<UserType>(userData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (key: string, value: string|null) => {
        setFormData({
            ...formData,
            [key]: value,
        });
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[key];
            return newErrors;
        });
    };

    return (
        <Form.Root>
            <div data-testid="user-account-form">
                <div className="pl-2 w-full">
                    <div className="mb-4">
                        <Input
                            name="first_name"
                            label="First name"
                            type="text"
                            isRequired
                            placeholder="Enter full business name"
                            value={formData?.first_name}
                            setInputValue={(value: string|null) => handleInputChange("name", value)}
                            className={errors.name ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="last_name"
                            label="Last name"
                            type="text"
                            isRequired
                            placeholder="Enter full business name"
                            value={formData?.last_name}
                            setInputValue={(value: string|null) => handleInputChange("name", value)}
                            className={errors.name ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="username"
                            label="Username"
                            type="text"
                            isRequired
                            placeholder="Enter username"
                            value={formData?.username}
                            setInputValue={(value: string|null) => handleInputChange("username", value)}
                            className={errors.username ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            isRequired
                            placeholder="Enter email address"
                            value={formData?.email}
                            setInputValue={(value: string|null) => handleInputChange("email", value)}
                            className={errors.email ? "border-red-500 bg-red-50" : ""}
                        />
                    </div>
                </div>
            </div>
        </Form.Root>
    );
};

export default UserDetailsForm;