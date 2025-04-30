"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { US_STATES } from "@/app/utils/constants";
import { formSchema } from "@/app/utils/validation";

const PropertyOwnerSetup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    selfDescription: "",
    email: "",
    address: {
      street: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    renewableTech: {
      windows: false,
      heating: false,
      water: false,
      lighting: false,
      solar: false,
      ev: false,
      notSure: false,
    },
    sector: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    if (name.startsWith("address.")) {
      const [parent, child] = name.split(".") as [
        "address",
        keyof typeof formData.address
      ];
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name.startsWith("renewableTech.")) {
      const tech = name.split(".")[1] as keyof typeof formData.renewableTech;
      setFormData((prev) => ({
        ...prev,
        renewableTech: {
          ...prev.renewableTech,
          [tech]: checked,
        },
      }));
    } else {
      const key = name as keyof typeof formData;
      setFormData((prev) => ({
        ...prev,
        [key]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      // uncomment this when ready
      //const validatedData = formSchema.parse(formData);
      //console.log("Form validated and submitted:", validatedData);
      router.push("/scheduleAssessment");
      // Navigate to next page or handle success
    } catch (error: any) {
      console.log("Validation errors:", error.errors);
      // Handle validation errors
    }
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    router.back();
  };

  return (
    <div className="flex max-w-md min-h-screen flex-col bg-gray-50 text-black">
      <header className="flex items-center justify-between px-4 py-4 shadow-sm bg-white">
        <Image src="/images/logo.png" alt="Logo" width={80} height={50} />
        <button className="text-3xl">☰</button>
      </header>

      <div className="p-4 flex-col">
        <h1 className="text-2xl text-black font-bold">Complete your profile</h1>
        <p className="text-sm text-gray-600">
          Tell us a little bit about yourself.
        </p>
      </div>

      <div className="flex-1 px-4 pb-4">
        <form onSubmit={handleSubmit}>
          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              1. What's your date of birth?
            </label>
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
              placeholder="mm/dd/yyyy"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              2. What's your gender?
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="nonBinary"
                  name="gender"
                  value="Non-Binary"
                  checked={formData.gender === "Non-Binary"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="nonBinary">Non-Binary</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="selfDescribe"
                  name="gender"
                  value="Self-Describe"
                  checked={formData.gender === "Self-Describe"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="selfDescribe">Prefer to self-describe:</label>
                {formData.gender === "Self-Describe" && (
                  <input
                    type="text"
                    name="selfDescription"
                    value={formData.selfDescription}
                    onChange={handleChange}
                    className=" border border-gray-300 rounded-md  p-1 w-40"
                  />
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="preferNotToSay"
                  name="gender"
                  value="Prefer not to say"
                  checked={formData.gender === "Prefer not to say"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="preferNotToSay">Prefer not to say</label>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              E-mail Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              3. What's your address?
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Address 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address.address2"
                  value={formData.address.address2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
                  placeholder="Apartment, Suite, Unit"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    State
                  </label>
                  <select
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full border  border-gray-300 bg-white rounded-md p-3 text-gray-700"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white rounded-md p-3 text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Renewable Technology */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              4. Which type of renewable technology are you interested in for
              your organization or property?
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Click all that apply, don't worry you can change your answers
              later.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="windows"
                  name="renewableTech.windows"
                  checked={formData.renewableTech.windows}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="windows">Windows & Insulation</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="heating"
                  name="renewableTech.heating"
                  checked={formData.renewableTech.heating}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="heating">Heating & Cooling</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="water"
                  name="renewableTech.water"
                  checked={formData.renewableTech.water}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="water">Water Efficiency</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lighting"
                  name="renewableTech.lighting"
                  checked={formData.renewableTech.lighting}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="lighting">Lighting & Appliances</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="solar"
                  name="renewableTech.solar"
                  checked={formData.renewableTech.solar}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="solar">Solar Energy</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ev"
                  name="renewableTech.ev"
                  checked={formData.renewableTech.ev}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="ev">Electric Vehicle Charging</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notSure"
                  name="renewableTech.notSure"
                  checked={formData.renewableTech.notSure}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="notSure">Not sure</label>
              </div>
            </div>
          </div>

          {/* Sector */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-1">
              5. Which sector best describes your organization or property?
              Please select the sector that best describes your situation:
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="residential"
                  name="sector"
                  value="Residential"
                  checked={formData.sector === "Residential"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="residential">Residential</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="commercial"
                  name="sector"
                  value="Commercial"
                  checked={formData.sector === "Commercial"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="commercial">Commercial</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="government"
                  name="sector"
                  value="Government"
                  checked={formData.sector === "Government"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="government">Government</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="nonProfit"
                  name="sector"
                  value="Non-Profit"
                  checked={formData.sector === "Non-Profit"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="nonProfit">Non-Profit</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="sector"
                  value="Other"
                  checked={formData.sector === "Other"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-full py-3 font-medium hover:bg-blue-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full border border-gray-300 text-black rounded-full py-3 font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOwnerSetup;
