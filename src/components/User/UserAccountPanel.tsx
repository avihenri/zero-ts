import { useState } from "react";
import Divider from "../Common/Divider";
import UserDetailsForm from "./UserAccountForms/UserDetailsForm";
import UserPasswordForm from "./UserAccountForms/UserPasswordForm";
import UserDetails from "./UserDetails";
import { KeyIcon, Trash2 } from "lucide-react";
import useTagsByType from "../../hooks/useTagsByType";
import TagSelector from "../TagSelector";

const UserAccountPanel = () => {
    const isEditingDetails = false;
    const [showRestPasswordFields, setShowResetPasswordFields] = useState(false);
    const { venueTypes, dietaries, zeroDrinkTypes, zeroDrinks } = useTagsByType();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <div className="h-[92%] pb-4" data-testid="venue-details-panel">
            <div className="h-full scrollbar-always-visible pl-2">
                <div className="mr-2">
                    {isEditingDetails ? <UserDetailsForm /> : <UserDetails />}

                    <Divider classNames="my-4" />

                    <div className="flex items-center justify-between">
                        <h3 className="text-primary-400 text-lg mt-2 mb-4 font-semibold">Password Management</h3>
                    </div>
                    {showRestPasswordFields ? <UserPasswordForm onCancel={() => setShowResetPasswordFields(false)} /> :
                        <button
                            className="relative w-full flex justify-center text-sm text-secondary-400 font-semibold border border-secondary-400 p-2 mb-6 rounded-md shadow-[0_0_6px_rgba(255,111,238,0.6)] hover:shadow-[0_0_10px_rgba(255,111,238,0.6)] hover:text-white"
                            onClick={() => setShowResetPasswordFields(true)}
                        >
                            <KeyIcon className="absolute left-2 top-3" size={14} />
                            <span className="pl-5">Reset Password</span>
                        </button>
                    }

                    <Divider classNames="my-4" />

                    <div className="flex items-center justify-between">
                        <h3 className="text-primary-400 mt-2 text-lg font-semibold">Default Filters</h3>
                    </div>
                    <p className="mb-4">
                        <small>
                            Set your default filters to quickly find the venues that suit your needs. These filters will be applied by default when you visit the Find Venue page.
                        </small>
                    </p>
                    <TagSelector
                        heading="Venue type"
                        tags={venueTypes}
                        selectedTagIds={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
        
                    <Divider classNames="my-4 w-72" />
            
                    <TagSelector
                        heading="Dietary type"
                        tags={dietaries}
                        selectedTagIds={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
        
                    <Divider classNames="my-4 w-72" />

                    <TagSelector
                        heading="Non-alcoholic drink type"
                        tags={zeroDrinkTypes}
                        selectedTagIds={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
            
                    <Divider classNames="my-4 w-72" />

                    <TagSelector
                        heading="Non-alcoholic drinks"
                        tags={zeroDrinks}
                        selectedTagIds={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />

                    <button className="w-full bg-primary-800 text-white font-semibold py-2 rounded-md hover:bg-primary-700 mt-4">
                        Save Default Filters
                    </button>

                    <Divider classNames="my-4" />

                    <div className="flex items-center justify-between">
                        <h3 className="text-red-400 mt-2 mb-4 font-semibold">Danger Zone</h3>
                    </div>
                    <button
                        className="relative w-full flex justify-center text-sm text-red-400 font-semibold border border-red-400 p-2 rounded-md shadow-[0_0_8px_rgba(248,113,113,0.6)] hover:shadow-[0_0_10px_rgba(248,113,113,0.6)] hover:text-white"
                    >
                        <Trash2 className="absolute left-2 top-2" size={18} />
                        <span className="pl-5">Delete Account</span>
                    </button>
                    <p className="mb-8 mt-2">
                        <small>
                            Deleting your account will remove your personal information and access, but any data you have added will remain. Your contributions however, will be anonymised, meaning they will no longer be linked to you in any way. This ensures your privacy while preserving the integrity of shared content.
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserAccountPanel;
