import { lazy, Suspense } from "react";

const Explore = lazy(() => import("../components/ExplorePage/ExplorePage"));

export default function Development() {

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            {/* Explore Section */}
            <Suspense fallback={<div>Loading...</div>}>
                <Explore />
            </Suspense>
        </div>
    )
}
