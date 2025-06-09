import React, { useEffect } from "react";
import { useDealerStore } from "../store/useDealerStore";
import { Calendar, ClockFading, MapPinHouse } from "lucide-react";

const ScrapRequest = () => {
  const { fetchPendingRequests, pickupRequests, isFetching } = useDealerStore();

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📦 Scrap Pickup Requests</h1>

      {isFetching ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="space-y-4">
          {pickupRequests.length > 0 ? (
            pickupRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
              >

            
                <p className="mt-1 text-sm text-gray-700">
                <MapPinHouse className="inline"/> Location: {request.address}
                </p>
                <p className="text-sm text-gray-700">
                  <Calendar className="inline"/> Date: {new Date(request.pickupDate).toLocaleDateString("en-IN")}
                </p>
                <p className="text-sm  text-gray-700">
                  <ClockFading className="inline"/> Time: {new Date(request.pickupTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {request.status.toUpperCase()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No pending requests.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScrapRequest;
