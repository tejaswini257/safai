"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiPlayCircle,
  FiImage,
} from "react-icons/fi";

const TASKS = [
  {
    id: 1,
    cleaner: "Anil Saafai User",
    location: "Ramnagar Chowk, Nagpur",
    status: "completed",
    score: 9.7,
    duration: "4m",
    start: "12:11 PM",
    end: "12:16 PM",
    comments: ["Initial Comment", "सफाई शुरू हुआ है"],
    photos: ["/img1.jpg", "/img2.jpg"],
  },
  {
    id: 2,
    cleaner: "Chitrali Hiwale",
    location: "Kachipura Chowk, Nagpur",
    status: "ongoing",
    score: 7.5,
    duration: "18m",
    start: "12:06 PM",
    end: null,
    comments: ["Work in progress"],
    photos: ["/img3.jpg"],
  },
  {
    id: 3,
    cleaner: "No Photo Cleaner",
    location: "Mahal Road, Nagpur",
    status: "delayed",
    score: 4.2,
    duration: "1m",
    start: "11:50 AM",
    end: null,
    comments: ["Delayed due to access issues"],
    photos: [],
  },
  {
    id: 4,
    cleaner: "Rajesh Sahani",
    location: "Narendra Square, Nagpur",
    status: "ongoing",
    score: 8.1,
    duration: "1h 5m",
    start: "3:44 PM",
    end: null,
    comments: ["Work in progress"],
    photos: ["/img4.jpg", "/img5.jpg"],
  },
  {
    id: 5,
    cleaner: "Pooja Gaikwad",
    location: "Sitabuldi Market, Nagpur",
    status: "completed",
    score: 9.2,
    duration: "12m",
    start: "2:10 PM",
    end: "2:22 PM",
    comments: ["Completed with photos"],
    photos: ["/img6.jpg"],
  },
  {
    id: 6,
    cleaner: "Amit Deshmukh",
    location: "Ambazari Lake, Nagpur",
    status: "delayed",
    score: 5.1,
    duration: "35m",
    start: "1:30 PM",
    end: null,
    comments: ["Delayed due to heavy crowd"],
    photos: [],
  },
];

export default function CleanerDocumentPage() {
  const { id: idParam } = useParams();
  const id = Number(idParam);
  const task = useMemo(() => TASKS.find((t) => t.id === id), [id]);

  if (!task) {
    return (
      <div className="p-6 space-y-4">
        <Link href="/dashboard/cleaner-activity" className="inline-flex items-center gap-2 text-blue-600">
          <FiArrowLeft /> Back to Cleaner Activity
        </Link>
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-red-600 font-semibold">Task not found.</p>
        </div>
      </div>
    );
  }

  const statusStyles = {
    completed: "bg-green-50 text-green-800 border border-green-200",
    ongoing: "bg-amber-50 text-amber-800 border border-amber-200",
    delayed: "bg-red-50 text-red-800 border border-red-200",
  }[task.status];

  return (
    <div className="p-6 space-y-6">
      <Link href="/dashboard/cleaner-activity" className="inline-flex items-center gap-2 text-blue-600">
        <FiArrowLeft /> Back to Cleaner Activity
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              Cleaning Review - {task.cleaner} - {task.location}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <FiMapPin className="text-gray-400" />
              {task.location}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusStyles}`}>
            {task.status}
          </span>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
          <section className="rounded-xl border border-gray-100 p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <FiClock /> Timeline
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Started:</span> 12/9/2025, {task.start}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <FiPlayCircle className="text-amber-500" />
              Running for {task.duration}
            </p>
          </section>

          <section className="rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <FiAlertCircle /> Task Details
            </div>
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold mb-1">Work in Progress</p>
              <p>The cleaner is currently working on this location. Tasks are yet to be completed.</p>
              <div className="mt-3 flex items-center gap-2 text-amber-800">
                <FiClock /> Duration: <span className="font-semibold">{task.duration}</span>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-gray-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <FiCheckCircle /> Comments
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
            <p className="text-sm font-semibold text-blue-800">Initial Comment</p>
            <p className="text-sm text-blue-900 mt-1">सफाई शुरू हुआ है</p>
          </div>
          {task.comments
            ?.filter((c) => c !== "Initial Comment" && c !== "सफाई शुरू हुआ है")
            .map((c, idx) => (
              <div key={idx} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
                {c}
              </div>
            ))}
        </section>

        <section className="rounded-xl border border-gray-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <FiImage /> Photos ({task.photos?.length ?? 0})
          </div>
          {task.photos?.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {task.photos.map((src, idx) => (
                <div
                  key={idx}
                  className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500"
                >
                  Placeholder for {src}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No photos uploaded.</p>
          )}
        </section>
      </div>
    </div>
  );
}

