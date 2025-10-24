"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Settings, HelpCircle, Save, X, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { addCarousel, fetchCarousal } from "@/redux/slices/storefrontSlice";
import Spinner from "../loader/Spinner";

interface Slide {
  id: number;
  heading: string;
  text: string;
  buttonText: string;
  link: string;
  imageUrl: string;
  altText: string;
}

const initialSlides: Slide[] = [];

const defaultNewSlide: Slide = {
  id: 0,
  heading: "",
  text: "",
  buttonText: "",
  link: "",
  imageUrl:
    "https://via.placeholder.com/800x400/CCCCCC/666666?text=Add+your+first+image",
  altText: "",
};

const Carousel = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlideId, setActiveSlideId] = useState<number>(0);
  const [settings, setSettings] = useState({ swapInterval: 5 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { carouselData, loading } =
    useAppSelector((state: any) => state.storefront) || {};
  const logo = carouselData?.data;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Slide>({
    mode: "onChange",
    defaultValues: defaultNewSlide,
  });

  useEffect(() => {
    dispatch(fetchCarousal());
  }, [dispatch]);

  // Memoize carousel slides
  const memoizedSlides = useMemo(() => {
    if (!carouselData?.slides) return [];
    return carouselData.slides.map((s: any) => ({
      id: s.id,
      heading: s.heading || "",
      text: s.text || "",
      buttonText: s.buttonText || "",
      link: s.link || "#",
      imageUrl:
        s.image ||
        "https://via.placeholder.com/800x400/CCCCCC/666666?text=Add+Image",
      altText: s.altText || "",
    }));
  }, [carouselData]);
  console.log("dddddddddddddddd", memoizedSlides);

  useEffect(() => {
    if (memoizedSlides.length > 0) {
      setSlides((prevSlides) => {
        const existingIds = prevSlides.map((s) => s.id);
        const newSlides = memoizedSlides.filter(
          (s: any) => !existingIds.includes(s.id)
        );
        return [...prevSlides, ...newSlides];
      });

      setActiveSlideId((prev) => (prev === 0 ? memoizedSlides[0].id : prev));
    }
  }, [memoizedSlides]);

  const activeSlide =
    slides.find((slide) => slide.id === activeSlideId) || defaultNewSlide;

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: parseInt(e.target.value) || 0,
    });
  };

  const handleAddSlide = () => {
    const newId =
      slides.length > 0 ? Math.max(...slides.map((s) => s.id), 0) + 1 : 1;
    const newSlide: Slide = {
      id: newId,
      heading: "",
      text: "",
      buttonText: "",
      link: "#",
      imageUrl: `https://via.placeholder.com/800x400/333333/EEEEEE?text=Slide+${newId}+Upload+Image`,
      altText: `Slide ${newId}`,
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
    setActiveSlideId(newId);
  };

  const handleDeleteSlide = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (slides.length <= 1) {
      alert("Aap aakhri slide delete nahi kar sakte.");
      return;
    }

    const remainingSlides = slides.filter((slide) => slide.id !== id);
    setSlides(remainingSlides);
    setActiveSlideId(remainingSlides[0].id);
  };

  const triggerImageUpload = () => {
    if (activeSlideId > 0) {
      fileInputRef.current?.click();
    } else {
      alert('Pehle "Add Slide" button se ek nayi slide banayein.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeSlideId > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === activeSlideId
              ? { ...slide, imageUrl: base64Image }
              : slide
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    if (slides.length === 0) {
      alert("Please add at least one slide to save the carousel.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "settings[swapInterval]",
        settings.swapInterval.toString()
      );

      slides.forEach((slide, index) => {
        formData.append(`slides[${index}][id]`, slide.id.toString());
        formData.append(`slides[${index}][heading]`, slide.heading);
        formData.append(`slides[${index}][text]`, slide.text);
        formData.append(`slides[${index}][buttonText]`, slide.buttonText);
        formData.append(`slides[${index}][link]`, slide.link);
        formData.append(`slides[${index}][altText]`, slide.altText);

        if (slide.imageUrl.startsWith("data:image")) {
          const byteString = atob(slide.imageUrl.split(",")[1]);
          const mimeString = slide.imageUrl
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formData.append(
            `slides[${index}][image]`,
            blob,
            `slide-${slide.id}.png`
          );
        } else {
          formData.append(`slides[${index}][imageUrl]`, slide.imageUrl);
        }
      });

      const response = await dispatch(addCarousel({ data: formData }));
      if (addCarousel.fulfilled.match(response)) {
        console.log("✅ Carousel added successfully");
      } else {
        console.log("❌ Failed adding carousel");
      }

      setSlides(initialSlides);
      setActiveSlideId(0);
      setSettings({ swapInterval: 5 });
    } catch (err) {
      console.error("❌ Error saving carousel:", err);
      alert("⚠️ Failed to save carousel data.");
    }
  };

  const handleAltTextChange = (index: number, value: string) => {
    const updatedSlides = [...slides];
    updatedSlides[index].altText = value;
    setSlides(updatedSlides);
  };
  const renderSlideAltTexts = () => {
    if (!slides || slides.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        {slides.map((slide, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Alt Text for Slide {index + 1}
            </label>
            <input
              type="text"
              value={slide.altText || ""}
              onChange={(e) => handleAltTextChange(index, e.target.value)}
              className="mt-1 p-2 border rounded-md"
              placeholder="Enter alt text for accessibility..."
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <Spinner />
          </div>
        )}
      </div>
      <div className="pb-20">
        <div className="flex justify-between items-center p-6">
          <h1 className="!font-semibold">Homepage carousel</h1>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Learn more about using the Carousel builder
          </a>
        </div>

        <div className="p-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {/* Active Slide Fields */}

          <div
            className={`flex flex-wrap gap-4 ${
              errors.heading || errors.text || errors.buttonText || errors.link
                ? "items-center"
                : "items-end"
            }
 mb-6 bg-white p-4 rounded-lg shadow-sm border ${
   activeSlideId === 0 ? "opacity-60 pointer-events-none" : ""
 }`}
          >
            {/* HEADING FIELD */}
            <div className="flex-1 max-w-[200px] flex flex-col mr-5">
              <Label className="w-24">Heading</Label>
              <input
                {...register("heading", { required: "Heading is required" })}
                value={activeSlide.heading}
                onChange={(e) => {
                  const val = e.target.value;
                  setSlides((prev) =>
                    prev.map((s) =>
                      s.id === activeSlideId ? { ...s, heading: val } : s
                    )
                  );
                }}
                className={`p-2 border rounded w-full min-h-[38px] ${
                  errors.heading ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.heading && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.heading.message}
                </p>
              )}
            </div>

            {/* TEXT FIELD */}
            <div className="flex-1 max-w-[200px] flex flex-col">
              <Label className="w-24">Text</Label>
              <input
                {...register("text", { required: "Text is required" })}
                value={activeSlide.text}
                onChange={(e) => {
                  const val = e.target.value;
                  setSlides((prev) =>
                    prev.map((s) =>
                      s.id === activeSlideId ? { ...s, text: val } : s
                    )
                  );
                }}
                className={`p-2 border rounded w-full min-h-[38px] ${
                  errors.text ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.text && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.text.message}
                </p>
              )}
            </div>

            {/* BUTTON TEXT FIELD */}
            <div className="flex-1 max-w-[220px] flex flex-col">
              <Label className="w-24 whitespace-nowrap">Button Text</Label>
              <input
                {...register("buttonText", {
                  required: "Button text is required",
                })}
                value={activeSlide.buttonText}
                onChange={(e) => {
                  const val = e.target.value;
                  setSlides((prev) =>
                    prev.map((s) =>
                      s.id === activeSlideId ? { ...s, buttonText: val } : s
                    )
                  );
                }}
                className={`p-2 border rounded w-full min-h-[38px] ${
                  errors.buttonText ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.buttonText && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.buttonText.message}
                </p>
              )}
            </div>

            {/* LINK FIELD */}
            <div className="flex-1 max-w-[200px] flex flex-col">
              <Label className="w-24">Link</Label>
              <input
                {...register("link", {
                  required: "Link is required",
                  pattern: {
                    value: /^https?:\/\//,
                    message: "Link must start with http or https",
                  },
                })}
                value={activeSlide.link}
                onChange={(e) => {
                  const val = e.target.value;
                  setSlides((prev) =>
                    prev.map((s) =>
                      s.id === activeSlideId ? { ...s, link: val } : s
                    )
                  );
                }}
                placeholder="Enter destination link"
                className={`p-2 border rounded w-full min-h-[38px] ${
                  errors.link ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.link && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.link.message}
                </p>
              )}
            </div>

            {/* BROWSE IMAGE BUTTON */}
            <div className="flex-1 justify-center items-center">
              <button
                type="button"
                onClick={triggerImageUpload}
                className="h-[42px] px-4 py-2 bg-gray-100 border border-gray-300 text-blue-600 rounded hover:bg-gray-200 transition self-end font-medium"
                disabled={activeSlideId === 0}
              >
                Browse Image
              </button>
            </div>
          </div>

          {/* --- Main Content: Preview & Settings --- */}
          <div className="flex gap-6">
            <div className="flex-3 w-3/4">
              {/* Preview Container */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 relative">
                {slides.length === 0 ? (
                  // Jab koi slide na ho toh yeh dikhao
                  <div className="w-full h-96 flex items-center justify-center text-gray-500 text-xl font-medium bg-gray-100 rounded-t-lg">
                    <p>To create a carousel, click on + Add Slide.</p>
                  </div>
                ) : (
                  // Jab slide ho toh preview dikhao
                  <div
                    className="relative w-full h-96  bg-black flex flex-col items-center justify-center   text-white p-6 rounded-t-lg overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeSlide.imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-black opacity-40"></div>

                    <div className="relative z-10 text-center">
                      {/* Heading sirf tab dikhao jab value ho */}
                      {activeSlide.heading && (
                        <h2 className="text-5xl font-extrabold tracking-tight uppercase mb-4">
                          {activeSlide.heading}
                        </h2>
                      )}
                      {activeSlide.text && (
                        <p className="text-xl mb-6">{activeSlide.text}</p>
                      )}
                      {activeSlide.buttonText && activeSlide.link && (
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition">
                          {activeSlide.buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {activeSlideId > 0 && (
                  <div className="absolute top-2 right-2 p-2 bg-black/50 text-white text-xs rounded">
                    Active Slide: {activeSlideId}
                  </div>
                )}
              </div>

              {/* --- Slide Management Thumbnails --- */}
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-end text-base text-gray-500 italic mb-2">
                  Click a slide to edit. Drag to reorder (Drag functionality is
                  visual only in this mock).
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      onClick={() => setActiveSlideId(slide.id)}
                      className={`relative min-w-[100px] h-[70px] border-2 cursor-pointer transition duration-150 ease-in-out ${
                        slide.id === activeSlideId
                          ? "border-blue-600 ring-4 ring-blue-100"
                          : "border-gray-300 hover:border-blue-400"
                      } bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-700 overflow-hidden`}
                      style={{
                        backgroundImage: `url(${slide.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40"></div>

                      <span className="absolute top-1 left-2 font-semibold text-white z-10">
                        Slide {index + 1}
                      </span>

                      {/* Delete Button */}
                      {slides.length > 1 && (
                        <X
                          size={14}
                          className="text-red-300 hover:text-red-500 absolute top-1 right-1 cursor-pointer z-20"
                          onClick={(e) => handleDeleteSlide(e, slide.id)}
                        />
                      )}
                    </div>
                  ))}

                  {/* Add New Slide Button */}
                  <button
                    onClick={handleAddSlide}
                    className="w-[100px] h-[70px] border-2 border-dashed border-gray-400 text-gray-500 rounded-md flex items-center justify-center hover:bg-gray-100 transition flex-col"
                  >
                    <Plus size={20} />
                    <span className="text-xs mt-1">Add Slide</span>
                  </button>
                </div>

                {/* Alt Text Inputs */}
                {renderSlideAltTexts()}
              </div>
            </div>

            {/* --- Right Panel: Settings --- */}
            <div className="flex-1 w-1/4 bg-white p-6 rounded-lg shadow-md border h-fit">
              <a
                href="#"
                className="text-blue-600 text-sm flex items-center mb-4 hover:underline"
              >
                Why does this preview look different to my storefront?{" "}
                <HelpCircle size={14} className="ml-1" />
              </a>
              <hr className="mb-4" />
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-700">
                Settings
              </h3>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="swapInterval"
                  className="text-sm whitespace-nowrap"
                >
                  Swap Every:
                </label>
                <input
                  id="swapInterval"
                  name="swapInterval"
                  type="number"
                  min="1"
                  value={settings.swapInterval}
                  onChange={handleSettingsChange}
                  className="w-16 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-center"
                />
                <span className="text-sm">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
        <button type="button" className="btn-outline-primary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default Carousel;
