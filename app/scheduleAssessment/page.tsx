"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import WidgetContainer from "../components/Widget/WidgetContainer";
import { z } from "zod";
import { US_STATES } from "../utils/constants";
const formSchema = z.object({
  date: z.string().min(1, { message: "Please select a date" }),
  timezone: z.string().min(1, { message: "Please select a timezone" }),
  timeSlot: z.string().min(1, { message: "Please select a time slot" }),
  notes: z.string().optional(),
  address: z.object({
    street: z.string().min(1, { message: "Street address is required" }),
    addressLine2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipCode: z
      .string()
      .min(5, { message: "Zip code must be at least 5 characters" })
      .max(10, { message: "Zip code must be less than 10 characters" })
      .regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid zip code" }),
  }),
});

function page() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showForm, setShowForm] = useState(false);
  const currentMonth = "October 2024";
  const [formData, setFormData] = useState({
    date: "",
    timezone: "",
    timeSlot: "",
    notes: "",
    address: {
      street: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Calendar data
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // Highlighted dates (5th and 17th of the month)
  const highlightedDates = [5, 17];

  // Time slots
  const timeSlots = ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateSelect = (day) => {
    const dateStr = `${currentMonth} ${day}`;
    setSelectedDate(dateStr);
    setFormData({
      ...formData,
      date: dateStr,
    });
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    setFormData({
      ...formData,
      timeSlot: slot,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      //const validatedData = formSchema.parse(formData);
      //console.log("Form data validated successfully:", validatedData);
      router.push("/scheduleAssessment/assessmentConfirmed");
      // Here you would typically send the data to your backend
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errorMessages[path] = err.message;
        });
        setErrors(errorMessages);
        console.error("Validation errors:", errorMessages);
      }
    }
  };

  return (
    <div className="flex max-w-md min-h-screen flex-col bg-gray-50 text-black">
      <header className="flex items-center justify-between px-4 py-4 shadow-sm bg-white">
        <Image src="/images/logo.png" alt="Logo" width={80} height={50} />
        <button className="text-3xl">☰</button>
      </header>

      {showForm ? (
        <div className="flex flex-col  rounded-lg  w-full max-w-lg mx-auto">
          {/* Main Content Area */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">
              Schedule your Energy Assessment
            </h1>
            <p className=" mb-4">
              Book your energy assessment now, and our trusted experts will
              visit your address to ensure a thorough and personalized
              evaluation—putting you on the path to energy efficiency.
            </p>
            <div className="flex items-center justify-center w-[390px] h-[252px]  rounded-3xl bg-white  shadow-md  ">
              <Image
                src="/images/illustrations/time_slot.png"
                width={244}
                height={188}
                alt="illustration"
              />
            </div>
          </div>

          {/* What to Expect */}
          <div className="px-6 pb-4">
            <h2 className="font-bold text-lg mb-2">Here's what to expect:</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Choose a convenient time slot.</li>
              <li>Meet with a professional at your home for an assessment</li>
              <li>Review your personalized report</li>
              <li>Discover incentives tailored to your home</li>
              <li>Schedule your upgrades with confidence</li>
            </ol>

            <p className="mt-4 text-sm">
              Questions? Contact support at <br></br>
              <a href="mailto:Rose@dreamlineai.org" className="text-blue-500">
                Rose@dreamlineai.org
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            {/* Date Selection */}
            <div className="flex items-center justify-between mb-2">
              <button type="button" className="text-gray-400">
                &lt;
              </button>
              <span className="font-medium">{currentMonth}</span>
              <button type="button" className="text-gray-400">
                &gt;
              </button>
            </div>

            {/* Calendar */}
            <div className="border border-gray-200 pt-2">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day, index) => (
                  <div
                    key={`weekday-${index}`}
                    className="text-center text-sm py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the 1st */}
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={`empty-${index}`} className="p-2"></div>
                ))}

                {/* Days of the month */}
                {days.map((day) => (
                  <button
                    type="button"
                    key={`day-${day}`}
                    className={`
        w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm
        ${highlightedDates.includes(day) ? "bg-blue-500 text-white" : ""}
        ${
          selectedDate === `${currentMonth} ${day}`
            ? "ring-2 ring-blue-500"
            : ""
        }
        hover:bg-blue-100
      `}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            {errors["date"] && (
              <p className="text-red-500 text-sm mt-1">{errors["date"]}</p>
            )}

            {/* Timezone Selection */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Select Timezone:</h3>
              <select
                name="timezone"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleInputChange}
                value={formData.timezone}
              >
                <option value="">Select Time Zone</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
              </select>
              {errors["timezone"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["timezone"]}
                </p>
              )}
            </div>

            {/* Time Slot Selection */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Select a Time Slot:</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`
                    p-2 border rounded-full text-center
                    ${
                      selectedTimeSlot === slot
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors["timeSlot"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["timeSlot"]}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Notes: (optional)</h3>
              <textarea
                name="notes"
                className="w-full p-3 border border-gray-300 rounded-md min-h-20"
                placeholder="Add any additional information"
                onChange={handleInputChange}
                value={formData.notes}
              ></textarea>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Address:</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Street address"
                    onChange={handleInputChange}
                    value={formData.address.street}
                  />
                  {errors["address.street"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors["address.street"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Address 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="address.addressLine2"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Apartment, Suite, Unit"
                    onChange={handleInputChange}
                    value={formData.address.addressLine2}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    onChange={handleInputChange}
                    value={formData.address.city}
                  />
                  {errors["address.city"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors["address.city"]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      State
                    </label>
                    <select
                      name="address.state"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      onChange={handleInputChange}
                      value={formData.address.state}
                    >
                      <option value="">Select State</option>
                      {US_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                      {/* Add more states as needed */}
                    </select>
                    {errors["address.state"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.state"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="address.zipCode"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      onChange={handleInputChange}
                      value={formData.address.zipCode}
                    />
                    {errors["address.zipCode"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.zipCode"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>

              <button
                type="button"
                className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <WidgetContainer>
          <div className="flex items-center justify-center w-[342px] h-[184px] bg-white">
            <Image
              src="/images/illustrations/image.png"
              width={168}
              height={163}
              alt="Illustration"
            />
          </div>
          <h1 className="text-2xl font-bold">
            Schedule your Energy Assessment
          </h1>
          <p>
            Discover personalized home upgrades! Schedule your energy assessment
            now to unlock incentives perfectly customized to your home.
          </p>
          <button
            className="bg-[#0070E0] rounded-2xl text-white p-2 text-[18px] cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Schedule
          </button>
        </WidgetContainer>
      )}
    </div>
  );
}

export default page;
